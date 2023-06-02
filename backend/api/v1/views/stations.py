from flask import jsonify, request
from api.v1.helpers import token_info
from api.v1.models.battery import Battery
from api.v1.models.station import Station
from api.v1.views import app_views
from api.v1.models.swap import Swap
from api.v1.inputs.inputs import REGISTER_STATION, validate
from api.v1 import auth




@app_views.route('stations/addstation', methods=['POST'], strict_slashes=False)
@auth
def create_station():
    '''
        Create a new station
    '''
    try:
        sent_data = request.get_json(force=True)

        valid = validate(sent_data, REGISTER_STATION)

        if valid is not True:
            response = jsonify(
                status='error',
                message="Please provide valid details",
                errors=valid)
            response.status_code = 400
            return response


        resp =  Station.save({'name': sent_data['name'], 'location': sent_data['location']})
        return jsonify({'status': 'Ok', 
                        'message': 'New Station registered', 
                        'data': resp.serialize_one})
    except Exception as e:
        return jsonify(
            status = "Error",
            message = "Error creating a station:  {}".format(e)
        ), 400




@app_views.route("/stations", methods=["GET"], strict_slashes=False)
def get_stations():
    '''
        Get all stations
    '''
    try:
        data = []
        for station  in Station.query.all():
            json = station.serialize_one
            json["total_swaps"] = len(Swap.query.filter(Swap.pickup_station_id == station.id).all())
            data.append(json)

        return jsonify({
            'status': "Ok",
            'message': "All Stations informations",
            'data': data
        })
    except Exception as e:  # noqa: E722
        return jsonify({
            'status': "Error",
            'message': "Erro" + e,
        }), 400


@app_views.route("/stations/batteries", methods=["GET"], strict_slashes=False)
@auth
def get_batteries_per_station():
    '''
        Get all batteries of a specific station
    '''
    try:
        user_info = token_info(request.headers.get("Authorization"))

        if user_info["station_id"]:

            station_batteries = Battery.query.filter(Battery.station_id == int(user_info["station_id"])).all()  # noqa: E501

            return jsonify({
                "status": "Ok",
                "message": "Batteries fetched successfully",
                "data": [battery.serialize_one for battery in station_batteries]
            })
        
        return jsonify({
            'status': "Error",
            "message": "You need to be a station manager"
        }), 400

    except Exception as e:
        return jsonify({
            'status': "Error",
            "message": "Error fetching batteries {}".format(e)
        }), 400