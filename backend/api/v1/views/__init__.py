# #!/usr/bin/python3
"""
Packages management
"""

from flask import Blueprint


app_views = Blueprint('app_views', __name__, url_prefix='/api/v1/')

from api.v1.views.drivers import * # noqa: F403, E402
from api.v1.views.batteries import * # noqa: F403, E402
from api.v1.views.stations import * # noqa: F403, E402
from api.v1.views.swaps import * # noqa: F403, E402
from api.v1.views.movements import *  # noqa: F403, E402
from api.v1.views.payments import * # noqa: F403, E402
