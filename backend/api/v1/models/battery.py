from api.v1.models import db
from datetime import datetime
from api.v1.models.station import Station


class Battery(db.Model):
    __tablename__ = 'batteries'
    id = db.Column(db.Integer, primary_key=True)
    station_id = db.Column(db.Integer, db.ForeignKey(
        'stations.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Available")
    serial_number = db.Column(db.String(50), unique=True, nullable=False)
    battery_type = db.Column(db.String(50))
    manufacture_date = db.Column(db.String(50), nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    swaps = db.relationship("Swap", backref="battery")
    swaps = db.relationship('Swap', back_populates='batteries')

    @classmethod
    def save(cls, data):
        battery = cls(
            battery_type=data['battery_type'],
            serial_number=data["serial_number"],
            station_id=data['station_id'],
            manufacture_date=data['manufacture_date']
        )
        db.session.add(battery)
        db.session.commit()
        return battery

    @property
    def serialize_one(self):
        ''' Serialize model object array (Convert into a list) '''
        obj = {
            'id': self.id,
            'battery_type': self.battery_type,
            'serial_number': self.serial_number,
            'manufacture_date': self.manufacture_date,
            'station': Station.query.filter(Station.id == self.station_id).first().serialize_one,
            'status': self.status,
            'created_at': self.created_at
        }
        return obj
