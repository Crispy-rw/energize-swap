from api.v1.models import db
from api.v1.models.battery import Battery
from datetime import datetime

from api.v1.models.driver import Driver
from api.v1.models.station import Station


class Swap(db.Model):
    """Model representing a battery swap transaction in the battery swap network."""

    __tablename__ = "swaps"

    id = db.Column(db.Integer, primary_key=True)
    battery_id = db.Column(db.Integer, db.ForeignKey("batteries.id"))
    driver_id = db.Column(db.Integer, db.ForeignKey("drivers.id"))
    pickup_station_id = db.Column(db.Integer, db.ForeignKey("stations.id"))
    deposit_station_id = db.Column(
        db.Integer, db.ForeignKey("stations.id"), nullable=True, default=None
    )
    start_time = db.Column(db.DateTime, nullable=False, default=datetime.now)
    end_time = db.Column(db.DateTime, nullable=True, default=None)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    battery_movements = db.relationship("BatteryMovement", back_populates="swaps")
    drivers = db.relationship("Driver", back_populates="swaps")
    batteries = db.relationship("Battery", back_populates="swaps")
    # stations = db.relationship('Station', back_populates='swaps')
    pickup_station = db.relationship(
        "Station", foreign_keys=[pickup_station_id], backref="pickups"
    )
    deposit_station = db.relationship(
        "Station", foreign_keys=[deposit_station_id], backref="deposits"
    )

    @property
    def serialize_one(self):
        """Serialize model object array (Convert into a list)"""
        obj = {
            "id": self.id,
            "battery": Battery.query.filter(Battery.id == self.battery_id)
            .first()
            .serialize_one,
            "driver": Driver.query.filter(Driver.id == self.driver_id)
            .first()
            .serialize_one,
            "pickup_station": Station.query.filter(Station.id == self.pickup_station_id)
            .first()
            .serialize_one,
            "deposit_station": Station.query.filter(
                Station.id == self.deposit_station_id
            )
            .first()
            .serialize_one
            if self.deposit_station_id is not None
            else None,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "created_at": self.created_at,
        }
        return obj

    @classmethod
    def save(cls, data):
        battery = Battery.query.filter(Battery.id == data["battery_id"]).first()
        battery.status = "In Movement"

        swap = cls(
            battery_id=data["battery_id"],
            driver_id=data["driver_id"],
            pickup_station_id=data["station_id"],
        )
        db.session.add(swap)
        db.session.commit()

        db.session.add(battery)
        db.session.commit()
        return swap

    @classmethod
    def stop_swap(cls, swap_id, station_id):
        try:
            swap = cls.query.filter(Swap.id == swap_id).first()
            swap.end_time = datetime.now()
            swap.deposit_station_id = station_id

            battery = Battery.query.filter(Battery.id == swap.battery_id).first()
            battery.station_id = station_id
            battery.status = "Available"

            db.session.add(swap)
            db.session.commit()

            db.session.add(battery)
            db.session.commit()
            return swap
        except Exception:
            pass
