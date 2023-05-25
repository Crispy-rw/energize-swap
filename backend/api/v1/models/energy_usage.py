from api.v1.models import db


class EnergyUsage(db.Model):
    __tablename__ = 'energy_usages'

    id = db.Column(db.Integer, primary_key=True)
    swap_id = db.Column(db.Integer, db.ForeignKey('swaps.id'))
    energy_used = db.Column(db.Integer)
    price = db.Column(db.Integer)
    battery = db.relationship("Battery", back_populates="energy_usages")
    driver = db.relationship("Driver", back_populates="energy_usages")
    swap = db.relationship("Swap", back_populates="energy_usage")
