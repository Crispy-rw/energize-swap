import math
import time
import jwt as JWT
from authlib.jose import jwt
from authlib.jose.errors import ExpiredTokenError

RADIUS = 6371 

# Assuming RADIUS is a global constant
def toRad(degrees):
  # Converts degrees to radians
  return degrees * math.pi / 180

def getDistance(from_, to):
  # Calculates the distance between two points on a sphere
  fromLat = from_[0]
  fromLon = from_[1]
  toLat = to[0]
  toLon = to[1]

  dLat = toRad(toLat - fromLat)
  dLon = toRad(toLon - fromLon)
  fromLat = toRad(fromLat)
  toLat = toRad(toLat)

  a = math.sin(dLat / 2) ** 2 + math.sin(dLon / 2) ** 2 * math.cos(fromLat) * math.cos(toLat)
  c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

  return RADIUS * c

def measurePath(points):
  # Measures the total distance of a path given by a list of points
  lastPoint = None
  distance = 0
  for point in points:
    if lastPoint is not None:
      distance += getDistance(lastPoint, point)
    lastPoint = point
  return distance


def token_info(token):
    '''
        Check token if token is valid this returns ID aapended to it
    '''
    try:
        
        claims = jwt.decode(token.split(' ')[1], 'test')
        claims.validate()
    except ExpiredTokenError as e:
        print("=>", e)
        return False
    except Exception as e:  # noqa: E722
        print("===>", e)
        return False
    return claims

def get_token(data, expires_in=3600*24):
    '''
        Generate token helper function
    '''

    data['exp'] = int(time.time() + expires_in)

    token = JWT.encode(data, 'test', algorithm='HS256')
  
    return token