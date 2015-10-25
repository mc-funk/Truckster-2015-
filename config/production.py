import os
import time

APP_CIK = os.getenv('APP_ROOT', '36af2f633abad735b5472281dbc46e8284a122d1')
API_URL = 'https://api.exohack.io'
CACHE_BUSTER = int(time.time())
