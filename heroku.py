import os
import sys

dirname = os.path.dirname(os.path.dirname(__file__))
sys.path.insert(0, dirname)

from src import create_app

app = create_app()
