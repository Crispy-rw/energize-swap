from api.v1.models import db
from datetime import datetime



class Station(db.Model):
    __tablename__ = 'stations'

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(50))
    name = db.Column(db.String(60), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # swaps = db.relationship("Swap", back_populates="stations")
    # pickups = db.relationship("Swap", back_populates="pickup_station")
    # deposits = db.relationship("Swap", back_populates="deposit_station")
    # pickups = db.relationship("Swap", back_populates="pickup_stations")
    # deposits = db.relationship("Swap", back_populates="deposit_stations")

    battery = db.relationship('Battery', backref='station')

    @classmethod
    def save(cls, data):
        station = cls(
                location = data['location'],
                name = data['name']
                )
        db.session.add(station)
        db.session.commit()
        return station


    @property
    def serialize_one(self):
        ''' Serialize model object array (Convert into a list) '''
        obj = {
            'id': self.id,
            'location': self.location,
            'name': self.name,
            'created_at': self.created_at
        }
        return obj
