# #!/usr/bin/python3
"""
Packages management
"""

from flask import Blueprint


app_views = Blueprint('app_views', __name__, url_prefix='/api/v1/')

from api.v1.views.drivers import *
from api.v1.views.batteries import *
from api.v1.views.stations import *
from api.v1.views.swaps import *
from api.v1.views.movements import *
