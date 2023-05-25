'''
    Our Main api routes
'''
from functools import wraps
from flask import jsonify, request


def auth(arg):
    ''' Auth middleware to check logged in user'''
    @wraps(arg)
    def wrap(*args, **kwargs):
        ''' Check if token exists in the request header'''
        if request.headers.get('Authorization'):
            return arg(*args, **kwargs)
            
        response = jsonify({
            'status': 'error',
            'message': "Unauthorized"
        })
        response.status_code = 401
        return response
    return wrap
