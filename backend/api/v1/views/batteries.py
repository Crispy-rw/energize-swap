from flask import request, jsonify
from api.v1.views import app_views
from api.v1.models.battery import Battery
from api.v1.inputs.inputs import REGISTER_BATTERY_RULES, validate
from api.v1 import auth


@app_views.route('batteries/addbattery', methods=['POST'], strict_slashes=False)
@auth
def create_battery():
    '''
        Create a new battery
    '''
    try:
        sent_data = request.get_json()

        valid = validate(sent_data, REGISTER_BATTERY_RULES)

        if valid is not True:
            return jsonify(
            status='error',
            message="Please provide valid details",
            errors=valid),400

        resp = Battery.save({
             'battery_type': sent_data['battery_type'], 
             'manufacture_date': sent_data['manufacture_date'], 
             'serial_number': sent_data['serial_number'], 
             'station_id': sent_data['station']
             })
        return jsonify({'status': 'Ok',
                         'message': 'Registered new battery',
                           'data': resp.serialize_one}), 201
    except Exception as e:
        return jsonify({
            'status': "Error",
            "message": "Error adding a battery: {}".format(e)
        }), 400


@app_views.route("/batteries", methods=["GET"], strict_slashes=False)
@auth
def get_all_batteries():
    '''
        Get all batteries with their information
    '''
    try:
        batteries = Battery.query.all()
        return jsonify({
            "status": "Ok",
            "message": "All Batteries information",
            "data": [battery.serialize_one for battery in batteries]
        })
    except Exception as e:
        return jsonify({
            'status': "Error",
            "message": "Error fetching batteries {}".format(e)
        }), 400
