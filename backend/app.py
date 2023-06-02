from flask import jsonify
from waitress import serve
from api import create_app
from api.v1.models import db


APP = create_app('production')

def migrate():
    with APP.app_context():
      try:
        db.create_all()
      except Exception as e:
        pass

@APP.teardown_appcontext
def teardown_db(exception):
    """closes the storage on teardown"""
    pass

@APP.errorhandler(404)
def not_found(error):
    """ Return an 'error: not found' JSON response """
    return jsonify({'error': 'Not found'}), 404

@APP.errorhandler(400)
def bad_request(error):
    return jsonify({'error': error.description}), 400

@APP.route("/")
def index():
   return jsonify({'message': 'welcome'}), 200

if __name__ == '__main__':
    # migrate()
    APP.run(debug=True, host='0.0.0.0', port=5000)
    # serve(APP, host='0.0.0.0', port=5000, threads=1)
