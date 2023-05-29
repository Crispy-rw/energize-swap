from api.v1.models import db


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
    refund_amount = db.Column(db.Float)
    used_battery_percentage = db.Column(db.Integer, nullable=False)

    swap = db.relationship("Swap", back_populates="payments")
    driver = db.relationship("Driver", back_populates="payments")

    def __repr__(self):
        return f'Payment(id={self.id}, swap_id={self.swap_id}, driver_id={self.driver_id}, total_amount={self.total_amount}, paid_amount={self.paid_amount}, refund_amount={self.refund_amount}, used_battery_percentage={self.used_battery_percentage})'  # noqa: E501
