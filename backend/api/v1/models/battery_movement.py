from api.v1.models import db
from datetime import datetime


class BatteryMovement(db.Model):
    __tablename__ = 'battery_movements'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    swap_id = db.Column(db.Integer, db.ForeignKey('swaps.id'), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    long = db.Column(db.Float, nullable=False)
    battery_percentage = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    swaps = db.relationship('Swap', back_populates='battery_movements')

    @classmethod
    def save(cls, data):
        movement = cls(
            swap_id=data['swap_id'],
            lat=data['lat'],
            long=data['long'],
            battery_percentage=data['battery_percentage'],
            timestamp=datetime.now()
        )
        db.session.add(movement)
        db.session.commit()
        return movement

    @property
    def serialize_one(self):
        ''' Serialize model object array (Convert into a list) '''
        obj = {
            'id': self.id,
            'swap_id': self.swap_id,
            'lat': self.lat,
            'long': self.long,
            'battery_percentage': self.battery_percentage,
            'timestamp': self.timestamp,
            'created_at': self.created_at,
        }
        return obj
