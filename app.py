import os
import sys
from flask import Flask, render_template, current_app
import jinja2
app = Flask(__name__,
            # template_folder='truckster_web/templates',
            static_folder='build',
            static_path=''
)

BYPASSING_ANGULAR_FRONT_END = True

# Override default location of templates
if BYPASSING_ANGULAR_FRONT_END:
    my_loader = jinja2.ChoiceLoader([
            app.jinja_loader,
            jinja2.FileSystemLoader(['app'])
        ])
    app.jinja_loader = my_loader
else:
    my_loader = jinja2.ChoiceLoader([
            app.jinja_loader,
            jinja2.FileSystemLoader(['build'])
        ])
    app.jinja_loader = my_loader

# Load configuration
app.config.from_object('config.production')
if app.debug:
    app.config.from_object('config.local')

@app.route('/')
def index():
    return render_template('index.html', **get_context())

@app.route('/truckster')
def truckster():
    return render_template('truckster_web/templates/index.html', **get_context())

@app.route('/trucks')
def trucks():
    return render_template('truckster_web/templates/trucks.html', **get_context())

@app.route('/signin')
def signin():
    return render_template('truckster_web/templates/signin.html', **get_context())

@app.route('/profile')
def profile():
    return render_template('truckster_web/templates/profile.html', **get_context())

@app.errorhandler(404)
def not_found(error):
    return render_template('index.html', **get_context())

def get_context():
    return current_app.config


if __name__ == '__main__':
    if 'debug' in sys.argv:
        app.run(debug=True, port=3002)
    else:
        port = int(os.environ.get("PORT", 5000))
        app.run(host='0.0.0.0', debug=True, port=port)
