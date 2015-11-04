import os
import time

APP_CIK = os.getenv('APP_ROOT', '36aa36b52277b2273b4fcf1a3fba8e1c61255702')
API_URL = 'https://api.exohack.io'
API_KEY = os.getenv('JWTTOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJodHRwczovL2V4b2hhY2suaW8iLCJleHAiOjE0NDYyMjUyMDMsImlhdCI6MTQ0NjIxODAwMywibmFtZSI6ImV4YW1wbGUiLCJuYmYiOjE0NDYyMTgwMDJ9.R8pInT-85tAkcHJ0hcdo2hA3n1pZWOID4xwMFm-5lgg')
API_WEBSOCKETS_URL = 'wss://api.exohack.io/socket'
CACHE_BUSTER = int(time.time())
