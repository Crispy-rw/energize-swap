from api.v1.models import db
from datetime import datetime
from api.v1.models.station import Station

class Battery(db.Model):
    __tablename__ = 'batteries'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    identication_mark= db.Column(db.String(60), nullable=False)
    station_id =  db.Column(db.Integer, db.ForeignKey('stations.id'), nullable=False)
    status =  db.Column(db.String(50), nullable=False, default="Available")

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    swaps = db.relationship("Swap", backref="battery")
    swaps = db.relationship('Swap', back_populates='batteries')



    @classmethod
    def save(cls, data):
        battery = cls(
                name = data['name'],
                identication_mark = data["identication_mark"],
                station_id = data['station_id']
                )
        db.session.add(battery)
        db.session.commit()
        return battery
    
    @property
    def serialize_one(self):
        ''' Serialize model object array (Convert into a list) '''
        obj = {
            'id': self.id,
            'name': self.name,
            'identication_mark': self.identication_mark,
            'station': Station.query.filter(Station.id == self.station_id).first().serialize_one,
            'status': self.status,
            'created_at': self.created_at
        }
        return obj
