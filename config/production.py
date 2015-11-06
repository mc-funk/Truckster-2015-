import os
import time

APP_CIK = os.getenv('APP_ROOT', '830fee687e5099bc2295085836c1a9371b671f27')
API_URL = 'https://api.exohack.io'
API_KEY = os.getenv('JWTTOKEN', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidHJ1Y2tzdGVyIiwiZG9tYWluIjoiaHR0cHM6Ly9leG9oYWNrLmlvIn0.rXWJKdtE0RXuHtrF2taeKRNl0SGQQ4zSKq5-2rEakyM')
API_WEBSOCKETS_URL = 'wss://api.exohack.io/socket'
CACHE_BUSTER = int(time.time())
