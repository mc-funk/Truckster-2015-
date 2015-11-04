#!/bin/bash

NODE="$(which node)"
NPM="$(which npm)"
PYTHON="$(which python)"
SCRIPT_DIR="$(dirname "$0")"

if [ -z "$NODE" ]; then
  echo "You must have node.js installed, version 4.1.1 or later is recommended."
  exit 1
elif [ -z "$NPM" ]; then
  echo "You have node.js installed, but npm is not available, please make sure it is installed."
  exit 1
elif [ -z "$PYTHON" ]; then
  echo "You must have python installed, version 2.7 is recommended."
  exit 1
else
  echo "NODE: $NODE"
  echo "NPM:  $NPM"
fi

# `npm install -g gulp`
install_gulp() {
  echo "Installing gulp..."
  "$NPM" install -g gulp > /dev/null
  exit_status=$?
  if [ "$exit_status" -ne 0 ]; then
    echo "Failed to install gulp!"
    exit $exit_status
  fi
}

# `npm install`
install_npm_deps() {
  echo "Installing npm dependencies (this may take awhile)..."
  pushd "$SCRIPT_DIR" > /dev/null
  "$NPM" install >/dev/null 2>/dev/null
  exit_status=$?
  if [ "$exit_status" -ne 0 ]; then
    popd >/dev/null
    echo "Failed to install npm dependencies! Run `npm install` to see what failed."
    exit $exit_status
  fi
}

# `python virtualenv.py venv`
setup_virtualenv() {
  echo "Installing Python virtualenv to: $SCRIPT_DIR/venv..."
  "$PYTHON" "$SCRIPT_DIR/virtualenv.py" "$SCRIPT_DIR/venv" > /dev/null 2>/dev/null
  exit_status=$?
  if [ "$exit_status" -ne 0 ]; then
    echo "Failed to install virtualenv!"
    exit $exit_status
  fi
}

# `venv/bin/pip install -r requirements.txt`
init_virtualenv() {
  echo "Fetching Python dependencies..."
  "$SCRIPT_DIR/venv/bin/pip" install -r "$SCRIPT_DIR/requirements.txt" >/dev/null 2>/dev/null
  exit_status=$?
  if [ "$exit_status" -ne 0 ]; then
    echo "Failed to fetch Python dependencies!"
    exit $exit_status
  fi
}

# `gulp dev`
gulp_dev() {
  echo "Environment is ready, starting the application..."
  GULP="$(which gulp)"
  if [ -z "$GULP" ]; then
    echo "Something went wrong, gulp is not on your PATH"
    exit 1
  else
    "$GULP" dev
  fi
}

read_env() {
  echo "Fetching your app token from dokku..."
  OIFS="$IFS"
  IFS=$'\n'
  env=$(ssh dokku@exohack.io -- config $1)
  read -rd '' -a config_vars <<< "$env"
  jwt_token=$(echo ${config_vars[5]} | awk '{print $2}')
  sed -i '' "s/os\.getenv('JWTTOKEN', '.*')/os.\getenv('JWTTOKEN', '$jwt_token')/g" config/production.py
  echo "Token set!"
}

case "$1" in
  help)
    echo "This script sets up your environment for working with this application."
    echo "It installs gulp, a python virtualenv, all dependencies, and boots the app for the first time."
    ;;
  *)
    if [ -n "$1" ]; then
      echo "Setting up your environment..."
      install_gulp
      setup_virtualenv
      init_virtualenv
      install_npm_deps
      read_env $1
      gulp_dev
    else
      echo "You need to provide your app name as an argument, i.e. './init.sh my_app'"
      exit 1
    fi
    ;;
esac
