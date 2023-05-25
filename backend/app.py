from flask import Flask, jsonify, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
# import config
from api import create_app
from api.v1.models import db
from api.v1.models.battery import Battery


APP = create_app('production')

def migrate():
    with APP.app_context():
      try:
        db.create_all()
        print("TABLES MIGRATEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
      except:
        pass

@APP.teardown_appcontext
def teardown_db(exception):
    """closes the storage on teardown"""
    print(exception)

@APP.errorhandler(404)
def not_found(error):
    """ Return an 'error: not found' JSON response """
    return make_response(jsonify({'error': 'Not found'}), 404)

@APP.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': error.description}), 400)

if __name__ == '__main__':
    migrate()
    APP.run(debug=True, host='0.0.0.0', port=5000)
