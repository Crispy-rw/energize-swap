from flask import request, make_response, abort, jsonify
from api.v1.views import app_views
from api.v1.models.battery import Battery
from api.v1.models.battery_movement import BatteryMovement
from api.v1.models.swap import Swap
from sqlalchemy import and_



@app_views.route('movements/<serial_number>', methods=['POST'], strict_slashes=False)
def update_movement(serial_number):
    try:
        sent_data = request.get_json()
        battery_check = Battery.query.filter(Battery.serial_number ==serial_number).first()
        if battery_check is None:
            return make_response({'status': 'Error', 'message': 'Battery with this serial_number does not exist'})

        swap_check = Swap.query.filter(and_(Swap.battery_id == battery_check.id, Swap.end_time == None)).first()
        if swap_check is None:
            return make_response({'status': 'Error', 'message': 'Battery has not been swapped'}, 400)

        movement = BatteryMovement.save({
            'swap_id': swap_check.id,
            'lat': sent_data['lat'],
            'long': sent_data['long'],
            'battery_percentage': sent_data['battery_percentage']
        })
        if movement is None:
            return make_response({'status': 'Error', 'message': 'Error recording battery movement'})

        return make_response({'status': 'Ok', 'message': 'Movememtn updated successfully', 'data': movement.serialize_one}, 201)
    except Exception as e:
        print("==>>>", e)
        abort(400)

@app_views.route('movements', methods=['GET'], strict_slashes=False)
def movement():
    try:
        # TODO returned movement of a specific battery swap
        swaps = Swap.query.filter(Swap.end_time == None).all()
        response = jsonify(
            status = "Ok",
            message = "Battery in movement returned",
            data = []
        )
        response.status_code = 200
        return response
    except:
        abort(400)
