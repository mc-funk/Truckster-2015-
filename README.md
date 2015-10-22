# ExoHack Example Application

## Requirements

- Python
- Node

## Setup

1. Clone this repository
2. `npm install -g bower` (only if you don't have Bower installed)
3. `npm install && bower install`
4. `python virtualenv.py venv`
5. `venv/bin/pip install -r requirements.txt`
6. `grunt build` (make sure you `npm install -g grunt-cli` if you don't have grunt on PATH)

## Run Locally

- `venv/bin/gunicorn heroku:app`

## Run on Heroku/Dokku

1. Create your app on Heroku/Dokku
2. Add the remote to your git repo
3. `git push heroku master`
