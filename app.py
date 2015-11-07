import os
import sys
from flask import Flask, render_template, current_app, Blueprint
import jinja2
app = Flask(__name__,
            # static_folder='build',
            # static_path=''
)

# my_loader = jinja2.ChoiceLoader([
#         app.jinja_loader,
#         jinja2.FileSystemLoader(['truckster','build'])
#     ])
# app.jinja_loader = my_loader

root_bp = Blueprint(   'root_bp', 
                        __name__,
                        static_url_path='',
                        static_folder='build',
                        template_folder='build'
)

truckster_bp = Blueprint(   'truckster_bp', 
                            __name__,
                            static_url_path='/assets',
                            static_folder='truckster',
                            template_folder='truckster'
)


# Load configuration
app.config.from_object('config.production')
if app.debug:
    app.config.from_object('config.local')

print("URL_MAP :: ", app.url_map)

# import sys
# sys.exit()

@root_bp.route('/', methods=['GET'])
def index():
    print("Hit root")
    return render_template('index.html', **get_context())

@truckster_bp.route('/', methods=['GET'])
def truckster():
    print("Hit truckster ")
    return render_template('truckster_index.html', **get_context())

@truckster_bp.route('/trucks')
def trucks():
    return render_template('trucks.html', **get_context())

@truckster_bp.route('/signin')
def signin():
    return render_template('signin.html', **get_context())

@truckster_bp.route('/profile')
def profile():
    return render_template('profile.html', **get_context())

@truckster_bp.errorhandler(404)
def not_found(error):
    return render_template('index.html', **get_context())

def get_context():
    return current_app.config


app.register_blueprint(root_bp)
app.register_blueprint(truckster_bp, url_prefix='/truckster')

if __name__ == '__main__':
    if 'debug' in sys.argv:
        app.run(debug=True, port=3002)
    else:
        port = int(os.environ.get("PORT", 5000))
        app.run(host='0.0.0.0', debug=True, port=port)
