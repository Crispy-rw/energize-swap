from api.v1.models import db
from api.v1.models.battery_movement import BatteryMovement


class Payment(db.Model):
    """
    The Payment model represents the payment information associated with a battery swap transaction.
    """  # noqa: E501

    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    swap_id = db.Column(db.Integer, db.ForeignKey('swaps.id'), nullable=False)
    driver_id = db.Column(db.Integer, db.ForeignKey('drivers.id'), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    paid_amount = db.Column(db.Float, nullable=False)
    refund_amount = db.Column(db.Float, nullable=True)
    used_battery_percentage = db.Column(db.Integer,  nullable=True)

    swap = db.relationship("Swap", back_populates="payments")
    driver = db.relationship("Driver", back_populates="payments")

    def __repr__(self):
        return f'Payment(id={self.id}, swap_id={self.swap_id}, driver_id={self.driver_id}, total_amount={self.total_amount}, paid_amount={self.paid_amount}, refund_amount={self.refund_amount}, used_battery_percentage={self.used_battery_percentage})'  # noqa: E501
    
    @classmethod
    def create_payment(cls,swap_id,driver_id ,total_amount, paid_amount):
        """
        Create a new payment record for the swap.
        
        Args:
            total_amount (float): The total amount of the payment.
            paid_amount (float): The amount that has been paid.
            swap_id (float): The id of new a created swap record.
            driver_id (int): The id of a driver record.
        """
        payment = cls(
            swap_id=swap_id,
            driver_id=driver_id,
            total_amount=total_amount,
            paid_amount=paid_amount,
            refund_amount=None,
            used_battery_percentage=None
        )
        
        db.session.add(payment)
        db.session.commit()

    @property
    def serialize_one(self):
        """
        Serialize the Payment object into a JSON format.
        """
        json_payment = {
            'id': self.id,
            # 'swap_id': self.swap_id,
            # 'driver': {
            #     'id': self.driver.id,
            #     'name': self.driver.name,
            #     # Include other relevant driver attributes
            # },
            'swap': self.swap.serialize_one,
            'driver': self.driver.serialize_one,
            'total_amount': self.total_amount,
            'paid_amount': self.paid_amount,
            'refund_amount': self.refund_amount,
            'used_battery_percentage': self.used_battery_percentage
        }
        return json_payment
        
    @classmethod
    def update_refund_amount(cls, swap_id):
        """
        Update the refund amount for a payment based on the remaining battery percentage.

        Args:
            swap_id (int): The ID of the swap associated with the payment.
        """
        payment = cls.query.filter_by(swap_id=swap_id).first()

        if payment:
            remaining_battery_percentage = Payment.calculate_remaining_battery_percentage(swap_id)  # noqa: E501
            used_battery_percentage = 100 - remaining_battery_percentage

            refund_amount = payment.paid_amount - ((used_battery_percentage / 100) * payment.paid_amount)  # noqa: E501
            payment.used_battery_percentage = used_battery_percentage
            payment.refund_amount = refund_amount

            db.session.add(payment)
            db.session.commit()

    @staticmethod
    def calculate_remaining_battery_percentage(swap_id):
        """
        Calculate the remaining battery percentage for a swap based on the battery movements.

        Args:
            swap_id (int): The ID of the swap.

        Returns:
            float: The remaining battery percentage.
        """  # noqa: E501
        last_movement = BatteryMovement.query.filter_by(swap_id=swap_id) \
                                        .order_by(BatteryMovement.timestamp.desc()).first()
        
        if last_movement:
            return last_movement.battery_percentage

        return 100