from flask import jsonify
from api.v1.views import app_views
from api.v1.models.payment import Payment
from api.v1.models.swap import Swap
from api.v1 import auth





@app_views.route('payments/<pickup_station_id>', methods=['GET'])
@auth
def get_payments_by_station(pickup_station_id):
    # Retrieve payments from the specified station
    payments = Payment.query.join(Swap).filter(Swap.pickup_station_id == pickup_station_id).all()
    
    # Serialize the payments data
    serialized_payments = [payment.serialize_one for payment in payments]
    
    return  jsonify({
                "status": "Ok",
                "message": "Station Payment returned successfully",
                "data": serialized_payments
            }), 200

@app_views.route('payments', methods=['GET'])
def get_all_payments():

    # Fetch all payments from the database
    payments = Payment.query.all()

    # Convert payments to JSON
    payments_json = [payment.serialize_one for payment in payments]

    return  jsonify({
                "status": "Ok",
                "message": "Payment returned successfully",
                "data": payments_json
            }), 200