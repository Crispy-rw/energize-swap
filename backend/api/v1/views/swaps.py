from flask import request, abort, make_response, jsonify
from api.v1.models.swap import Swap
from api.v1.models.driver import Driver
from api.v1.views import app_views
from api.v1.helpers import measurePath, token_info


@app_views.route("swaps/addswap", methods=["POST"], strict_slashes=False)
def create_battery_swap():
    try:
        sent_data = request.get_json()
        user_info = token_info(request.headers.get("Authorization"))
        check_battery = (
            Swap.query.filter(Swap.battery_id == sent_data["battery_id"])
            .filter(Swap.end_time == None)
            .first()
        )
        if check_battery is not None:
            response = jsonify(
                {
                    "status": "ok",
                    "message": "Battery in movement",
                }
            )
            response.status_code = 400
            return response

        swap = Swap.save(
            {
                "battery_id": sent_data["battery_id"],
                "driver_id": sent_data["driver_id"],
                "station_id": user_info["station_id"],
            }
        )
        response = jsonify(
            {
                "status": "Ok",
                "message": "New battery Swap Created",
                "data": swap.serialize_one,
            }
        )
        response.status_code = 201
        return response
    except Exception as e:
        response = jsonify(
            {
                "status": "Error",
                "message": "Error creating a new battery swap",
            }
        )
        response.status_code = 400
        return response


@app_views.route("swaps", methods=["GET"], strict_slashes=False)
def get_ongoing_swaps():
    try:
        swaps = Swap.query.filter(Swap.end_time == None).all()

        print("=============>>>>>>>>>>>>", len(swaps))

        response = jsonify(
            {
                "status": "ok",
                "message": "Battery in movement",
                "data": [swap.serialize_one for swap in swaps],
            }
        )
        response.status_code = 200
        return response
    except Exception as e:
        print(e)
        abort(400)


@app_views.route("swaps/stopswap/<swap_id>", methods=["PUT"], strict_slashes=False)
def stop_battery_swap(swap_id):
    try:
        user_info = token_info(request.headers.get("Authorization"))
        if user_info["station_id"]:
            swap = Swap.stop_swap(swap_id, user_info["station_id"])

            if swap.end_time is not None:
                return make_response(
                    {
                        "status": "Ok",
                        "message": "Battery returned successfully",
                        "data": swap.serialize_one,
                    },
                    200,
                )
            else:
                return make_response(
                    {"status": "Error", "message": "Battery has already been returned"},
                    400,
                )
        return make_response(
            {"status": "Error", "message": "Station_id not available"}, 400
        )
    except Exception as e:
        abort(400)


@app_views.route("swaps/totalswappedbattery", methods=["GET"], strict_slashes=False)
def get_finished_swaps():
    try:
        user_info = token_info(request.headers.get("Authorization"))

        if user_info is False:
            abort(400)

        station_id = user_info.get("station_id", None)

        total_swaps = Swap.query.filter(Swap.end_time != None)

        # check if station_id is from a manager
        if station_id is not None:

            # filter swaps from a specific station
            total_swaps = total_swaps.filter(Swap.pickup_station_id == station_id)

        data = []
        for sw in total_swaps.all():  # noqa: E711
            json = sw.serialize_one
            json["distance"] = round(
                measurePath([[mv.lat, mv.long] for mv in sw.battery_movements]), 4
            )
            data.append(json)

        response = jsonify(
            {"status": "Ok", "message": "All swaps information", "data": data}
        )
        response.status_code = 200
        return response
    except Exception as e:
        print("=========>>", e)
        abort(400)


@app_views.route("swaps/<swap_id>", methods=["GET"], strict_slashes=False)
def get_swap_information(swap_id):
    try:
        swap = Swap.query.filter(Swap.id == swap_id).first()
        distance = round(
            measurePath([[mv.lat, mv.long] for mv in swap.battery_movements]), 4
        )

        data = swap.serialize_one
        data["distance"] = distance
        response = jsonify(
            {"status": "Ok", "message": "Swap information returned", "data": data}
        )
        response.status_code = 200
        return response
    except Exception as e:
        print("==>", e)
        abort(400)
