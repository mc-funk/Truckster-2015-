import os
import time

APP_CIK = os.getenv('APP_ROOT', '36af2f633abad735b5472281dbc46e8284a122d1')
API_URL = 'https://api.exohack.io'
API_KEY = os.getenv('JWTTOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJodHRwczovL2V4b2hhY2suaW8iLCJleHAiOjE0NDYwNzc5ODMsImlhdCI6MTQ0NjA3MDc4MywibmFtZSI6ImV4YW1wbGUiLCJuYmYiOjE0NDYwNzA3ODJ9.TeIrhhcx0Y-2TBPKFOJjBuF9b3IcH82u2zafTTdjHfY')
API_WEBSOCKETS_URL = 'wss://api.exohack.io/socket'
CACHE_BUSTER = int(time.time())
