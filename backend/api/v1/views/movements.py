from flask import request, jsonify
from api.v1.views import app_views
from api.v1.models.battery import Battery
from api.v1.models.battery_movement import BatteryMovement
from api.v1.models.swap import Swap
from sqlalchemy import and_

from api.v1.inputs.inputs import REGISTER_MOVEMENT_RULE, validate
from api.v1 import auth


@app_views.route('movements/<serial_number>', methods=['POST'], strict_slashes=False)
@auth
def update_movement(serial_number):
    '''
        Update the movement of a swapped battery
    '''
    try:
        sent_data = request.get_json()

        valid = validate(sent_data, REGISTER_MOVEMENT_RULE)

        if valid is not True:
            return jsonify(
                status='error',
                message="Please provide valid details",
                errors=valid),400

        battery_check = Battery.query.filter(
            Battery.serial_number == serial_number).first()
        if battery_check is None:
            return jsonify({'status': 'Error', 'message': 'Battery with this serial_number does not exist'}), 400  # noqa: E501

        swap_check = Swap.query.filter(
            and_(Swap.battery_id == battery_check.id, Swap.end_time == None)).first()  # noqa: E711, E501
        if swap_check is None:
            return jsonify({'status': 'Error', 'message': 'Battery has not been swapped'}), 400  # noqa: E501

        movement = BatteryMovement.save({
            'swap_id': swap_check.id,
            'lat': sent_data['lat'],
            'long': sent_data['long'],
            'battery_percentage': sent_data['battery_percentage']
        })
        if movement is None:
            return jsonify({'status': 'Error', 'message': 'Error recording battery movement'}), 400  # noqa: E501

        return jsonify({'status': 'Ok', 'message': 'Movemement updated successfully', 'data': movement.serialize_one}),  201  # noqa: E501
    except Exception as e:
        return jsonify({
            'status': "Error",
            "message": "Error updating battery movements {}".format(e)
        }), 400
