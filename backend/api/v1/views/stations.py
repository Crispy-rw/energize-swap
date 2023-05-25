from flask import jsonify, request, make_response, abort
from api.v1.helpers import token_info
from api.v1.models.battery import Battery
from api.v1.models.station import Station
from api.v1.views import app_views



@app_views.route('stations/addstation', methods=['POST'], strict_slashes=False)
def create_station():
    try:
        sent_data = request.get_json()
        resp =  Station.save({'name': sent_data['name'], 'location': sent_data['location']})
        return make_response({'status': 'Ok', 'message': 'New Station registered', 'data': resp.serialize_one})
    except Exception as e:
        print("==>>",e, "<<==")
        abort(400)


@app_views.route("/stations", methods=["GET"], strict_slashes=False)
def get_stations():
    try:
        batteries = Station.query.all()
        return make_response({
            'status': "Ok",
            'message': "All Stations informations",
            'data': [ battery.serialize_one for battery in batteries]
        })
    except:  # noqa: E722
        abort(400)

@app_views.route("/stations/batteries", methods=["GET"], strict_slashes=False)
def get_batteries_per_station():
    try:
        user_info = token_info(request.headers.get("Authorization"))

        if user_info["station_id"]:

            station_batteries = Battery.query.filter(Battery.station_id == int(user_info["station_id"])).all()  # noqa: E501

            return make_response({
                "status": "Ok",
                "message": "Batteries fetched successfully",
                "data": [battery.serialize_one for battery in station_batteries]
            })
        
        response = jsonify({
            'status': "Error",
            "message": "You need to be a station manager"
        })
        response.status_code = 401
        return response

    except Exception as e:
        response = jsonify({
            'status': "Error",
            "message": "Error fetching batteries {}".format(e)
        })
        response.status_code = 401
        return response