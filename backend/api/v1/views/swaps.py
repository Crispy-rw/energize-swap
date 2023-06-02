from flask import request, jsonify
from api.v1.models.swap import Swap
from api.v1.views import app_views
from api.v1.helpers import measurePath, token_info
from api.v1.inputs.inputs import REGISTER_SWAP_RULE, validate


@app_views.route("swaps/addswap", methods=["POST"], strict_slashes=False)
def create_battery_swap():
    try:
        sent_data = request.get_json()

        valid = validate(sent_data, REGISTER_SWAP_RULE)

        if valid is not True:
            return jsonify(
                status='error',
                message="Please provide valid details",
                errors=valid),400

        user_info = token_info(request.headers.get("Authorization"))
        check_battery = (
            Swap.query
            .filter(Swap.battery_id == sent_data["battery"])
            .filter(Swap.end_time == None)
            .first()
        )
        if check_battery is not None:
            return jsonify({
                    "status": "ok",
                    "message": "Battery in movement",
                }), 400

        check_driver = (
            Swap.query
            .filter(Swap.driver_id == sent_data.get("driver_id"))
            .filter(Swap.end_time == None)
            .first()
        )

        if check_driver is not None:
            return jsonify({
                "status": "ok",
                "message": "Driver in movement",
            }), 400

        swap = Swap.save( {
                "battery_id": sent_data["battery"],
                "driver_id": sent_data["driver"],
                "station_id": user_info["station_id"],
            })

        return jsonify({
                "status": "Ok",
                "message": "New battery Swap Created",
                "data": swap.serialize_one,
            }), 201
    
    except Exception:
        return jsonify({"status": "Error",
                        "message": "Error creating a new battery swap",
                        }),400


@app_views.route("swaps", methods=["GET"], strict_slashes=False)
def get_ongoing_swaps():
    try:
        swaps = Swap.query.filter(Swap.end_time == None).all()

        return jsonify(
            {
                "status": "ok",
                "message": "Battery in movement",
                "data": [swap.serialize_one for swap in swaps],
            }
        ), 200
    except Exception as e:
        return jsonify({
            'status': "Error",
            "message": "Error fetching swaps {}".format(e)
        }), 400


@app_views.route("swaps/stopswap/<swap_id>", methods=["PUT"], strict_slashes=False)
def stop_battery_swap(swap_id):
    try:
        user_info = token_info(request.headers.get("Authorization"))
        if user_info["station_id"]:
            swap = Swap.stop_swap(swap_id, user_info["station_id"])

            if swap.end_time is not None:
                return jsonify(
                    {
                        "status": "Ok",
                        "message": "Battery returned successfully",
                        "data": swap.serialize_one,
                    }), 200
            else:
                return jsonify({"status": "Error", 
                                "message": "Battery has already been returned"}), 400
        return jsonify(
            {"status": "Error", "message": "Station_id not available"}), 400
    
    except Exception as e:
        return jsonify({
            'status': "Error",
            "message": "Error stopping a swap {}".format(e)
        }), 400


@app_views.route("swaps/totalswappedbattery", methods=["GET"], strict_slashes=False)
def get_finished_swaps():
    try:
        user_info = token_info(request.headers.get("Authorization"))

        if user_info is False:
            return jsonify({
            'status': "Error",
            "message": "Invalid Token"
            }), 400

        station_id = user_info.get("station_id", None)

        total_swaps = Swap.query.filter(Swap.end_time != None)

        # check if station_id is from a manager
        if station_id is not None:

            # filter swaps from a specific station
            total_swaps = total_swaps.filter(
                Swap.pickup_station_id == station_id)

        data = []
        for sw in total_swaps.all():  # noqa: E711
            json = sw.serialize_one
            json["distance"] = round(
                measurePath([[mv.lat, mv.long]
                            for mv in sw.battery_movements]), 4
            )
            data.append(json)

        return jsonify(
            {"status": "Ok", "message": "All swaps information", "data": data}
        ), 200
    except Exception as e:
        return jsonify({
            'status': "Error",
            "message": "Error fetching data {}".format(e)
        }), 400


@app_views.route("swaps/<swap_id>", methods=["GET"], strict_slashes=False)
def get_swap_information(swap_id):
    try:
        swap = Swap.query.filter(Swap.id == swap_id).first()
        distance = round(
            measurePath([[mv.lat, mv.long]
                        for mv in swap.battery_movements]), 4
        )

        data = swap.serialize_one
        data["distance"] = distance
        response = jsonify(
            {"status": "Ok", "message": "Swap information returned", "data": data}
        )
        response.status_code = 200
        return response
    except Exception as e:
        return jsonify({
            'status': "Error",
            "message": "Error fetching swap info {}".format(e)
        }), 400
