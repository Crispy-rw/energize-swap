from flask import request, make_response, abort
from api.v1.views import app_views
from api.v1.models.battery import Battery

@app_views.route('batteries/addbattery', methods=['POST'], strict_slashes=False)
def create_battery():
    try:
        sent_data = request.get_json()
        print(sent_data)
        resp = Battery.save({'name': sent_data['name'], 'identication_mark': sent_data['identication_mark'], 'station_id': sent_data['station_id']})
        return make_response({'status': 'Ok', 'message':'Registered new battery', 'data': resp.serialize_one}, 201)
    except Exception as e:
        print("=>>",e)
        abort(400)


@app_views.route("/batteries", methods=["GET"], strict_slashes=False)
def get_all_batteries():
    try:
        batteries = Battery.query.all();
        return make_response({
            "status": "Ok",
            "message": "All Batteries information",
            "data": [ battery.serialize_one for battery in batteries]
        })
    except:  # noqa: E722
        abort(400)




