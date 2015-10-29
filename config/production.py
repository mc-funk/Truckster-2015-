import os
import time

APP_CIK = os.getenv('APP_ROOT', '36aa36b52277b2273b4fcf1a3fba8e1c61255702')
API_URL = 'https://api.exohack.io'
API_KEY = os.getenv('JWTTOKEN', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiZXhhbXBsZSIsImRvbWFpbiI6Imh0dHBzOi8vZXhvaGFjay5pbyJ9.LdvbgB5-_kRbLCtYBlIxcbiX-N7UBAGvK5NfQclk_58')
API_WEBSOCKETS_URL = 'wss://api.exohack.io/socket'
CACHE_BUSTER = int(time.time())
