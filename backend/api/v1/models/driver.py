from datetime import datetime
from sqlalchemy.orm import relationship, backref
from api.v1.models import db


class Driver(db.Model):
    __tablename__ = 'drivers'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    swaps = db.relationship('Swap', back_populates='drivers')



    @classmethod
    def save(cls, data):
        driver =cls(
            name = data["name"],
            email = data["email"]
            )
        db.session.add(driver)
        db.session.commit()
        return driver

    @property
    def serialize_one(self):
        ''' Serialize model object array (Convert into a list) '''
        obj = {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at
        }
        return obj
