#!/usr/bin/python3
"""
Drivies File
"""


from flask import jsonify, request, abort
from api.v1.helpers import get_token
from api.v1.views import app_views
from api.v1.models.driver import Driver
from api.v1 import auth
from sqlalchemy import desc, func


creds = {
    "admin@example.com": {
        "name": "Administation",
        "email": "admin@example.com",
        "password": "password1",
        "role": "admin",
    },
    "manager@example.com": {
        "name": "Manager",
        "email": "manager@example.com",
        "password": "password2",
        "role": "manager",
        "station_id": 2,
    },
}


@app_views.route("/login", methods=["POST"], strict_slashes=False)
def login():
    sent_data = request.get_json()
    email = sent_data["email"]
    password = sent_data["password"]
    station_id = sent_data.get("station_id", None)

    if email in creds and password == creds[email]["password"]:

        # check if he is an admin
        if station_id is None and creds[email]["role"] == "admin":
            # Generate JWT token
            token = get_token(creds[email])

            # Return the token as a JSON response
            return jsonify({"email": email, "token": token})

        # check if a user is a manager
        elif station_id is not None and creds[email]["role"] == "manager":
            # append the station_id to the user obj
            creds[email]["station_id"] = station_id

            # Generate JWT token
            token = get_token(creds[email])

            # Return the token as a JSON response
            return jsonify({"email": email, "token": token})

    # Invalid credentials
    return jsonify({"error": "Invalid email or password"}), 401


@auth
@app_views.route("drivers/addriver", methods=["POST"], strict_slashes=False)
def create_driver():
    try:
        sent_data = request.get_json()
        data = {
            "name": sent_data.get("name"),
            "email": sent_data.get("email"),
            "phone": sent_data.get("phone"),
            "address": sent_data.get("address", ""),
            "license_number": sent_data.get("license_number", ""),
            "license_expiry": sent_data.get("license_expiry", ""),
            "motocycle_make": sent_data.get("motocycle_make", ""),
            "motocycle_model": sent_data.get("motocycle_model", ""),
            "motocycle_year": sent_data.get("motocycle_year", 0)
        }

        if (
            Driver.query.order_by(desc(Driver.created_at))
            .filter(func.lower(Driver.email) == func.lower(sent_data.get("email")))
            .first()
            is not None
        ):
            return jsonify({
                "status": "error",
                "message":(
                    "You have already " "registered driver with the same name"),
            }), 400

        resp = Driver.save(data)
        return jsonify({
            "status": "Ok", "message": "Driver has been registered", "data": resp.serialize_one  # noqa: E501
        })

    except Exception as e:
        print(e)
        abort(400)


@auth
@app_views.route("/drivers", methods=["GET"], strict_slashes=False)
def get_drivers():
    try:
        return jsonify(
            {
                "status": "Ok",
                "message": "All Drivers informations",
                "data": [driver.serialize_one for driver in Driver.query.all()],
            }
        )
    except Exception as e:
        print("==>", e)
        abort(400)
