from datetime import datetime
from sqlalchemy.orm import relationship, backref
from api.v1.models import db


class Driver(db.Model):
    __tablename__ = 'drivers'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True)
    phone = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    license_number = db.Column(db.String(50), nullable=True)
    license_expiry = db.Column(db.String(50), nullable=True)
    motocycle_make = db.Column(db.String(100), nullable=True)
    motocycle_model = db.Column(db.String(100), nullable=True)
    motocycle_year = db.Column(db.String(100), nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    swaps = db.relationship('Swap', back_populates='drivers')



    @classmethod
    def save(cls, data):
        try:
            driver =cls(
            name = data["name"],
            email = data["email"],
            phone = data["phone"],
            address = data["address"],
            license_number = data["license_number"],
            license_expiry = data["license_expiry"],
            motocycle_make = data["motocycle_make"],
            motocycle_model = data["motocycle_model"],
            motocycle_year = data["motocycle_year"]
            )
            db.session.add(driver)
            db.session.commit()
            return driver
        except Exception as e:
            print(e)

    @property
    def serialize_one(self):
        ''' Serialize model object array (Convert into a list) '''
        obj = {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone' : self.phone,
            'address' : self.address,
            'license_number' : self.license_number,
            'license_expiry' : self.license_expiry,
            'motocycle_make' : self.motocycle_make,
            'motocycle_model' : self.motocycle_model,
            'motocycle_year' : self.motocycle_year,
            'created_at': self.created_at
        }
        return obj
