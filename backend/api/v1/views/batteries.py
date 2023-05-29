from flask import request, abort, jsonify
from api.v1.views import app_views
from api.v1.models.battery import Battery


@app_views.route('batteries/addbattery', methods=['POST'], strict_slashes=False)
def create_battery():
    try:
        sent_data = request.get_json()
        print(sent_data)
        resp = Battery.save({
             'battery_type': sent_data['battery_type'], 
             'manufacture_date': sent_data['manufacture_date'], 
             'serial_number': sent_data['serial_number'], 
             'station_id': sent_data['station_id']
             })
        return jsonify({'status': 'Ok',
                         'message': 'Registered new battery',
                           'data': resp.serialize_one}), 201
    except Exception as e:
        print("=>>", e)
        abort(400)


@app_views.route("/batteries", methods=["GET"], strict_slashes=False)
def get_all_batteries():
    try:
        batteries = Battery.query.all()
        return jsonify({
            "status": "Ok",
            "message": "All Batteries information",
            "data": [battery.serialize_one for battery in batteries]
        })
    except:  # noqa: E722
        abort(400)
