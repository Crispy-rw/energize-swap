from flask import Flask
from flask_cors import CORS
from api.v1.models import db
from config import api_config
from api.v1.views import app_views


def create_app(config_name):
    '''
        App init function
    '''
    app = Flask(__name__, instance_relative_config=True)
    # Register blueprint
    # Register blueprints
    app.register_blueprint(app_views)

    CORS(app, resources={r"/api/v1*": {"origins": "*"}})
    app.config.from_object(api_config[config_name])
    db.init_app(app)

    return app
