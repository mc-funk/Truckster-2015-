# pylint: disable=W0312
import os
import sys
from flask import Flask, render_template, current_app, Blueprint, request,\
                    flash, Markup
import requests, json
try:
    from urllib.parse import quote_plus
except:
    from urllib import quote_plus
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
                            # static_url_path='/assets',
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
FB_URL = "https://exo-foodtruck.firebaseio.com/trucks"
@root_bp.route('/', methods=['GET'])
def index():
    print("Hit root")
    return render_template('index.html', **get_context())

@truckster_bp.route('/', methods=['GET', 'POST'])
def truckster():
    print("FORM :: ", request.form)
    if request.method == 'POST':
        linkurl = 'https://maps.googleapis.com/maps/api/geocode/json?address={0}&sensor=false'.format(
            quote_plus(
                request.form.get('address')
            )
        )
        linkblob = requests.get(linkurl).json()
        latlong = linkblob['results'][0]['geometry']['location']
        subscriber_info = { request.form.get('contact'): {
                                "name": request.form.get('name'),
                                "contact_method": request.form.get('contact_method'),
                                "addresses": [
                                    {
                                        "address_string": latlong,
                                        "geofence_data": 1 # 1 mile radius
                                    }
                                ]
                            }
        }
        Subscribe_URL = FB_URL+'/'+request.form.get('rid')+'/subscribers/.json'
        print("Posting to URL: ", Subscribe_URL)
        # use email as subscriber key
        new_subscription = { request.form.get('contact').replace('.','-'): {
                                    "name": request.form.get('name'),
                                    "contact_method": request.form.get('contact_method'),
                                    "addresses": [
                                        {
                                            "address_string": latlong,
                                            "geofence_data": 1 # 1 mile radius
                                        }
                                    ]
                                }
        }
        print(new_subscription)
        response = requests.post(Subscribe_URL,json=new_subscription)
        print("Subscribe response: ", response)
        print("Subscribe response: ", response.text)
        print("Subscribe response: ", response.reason)


        flash("Successfully subscribed {0} to truck {1}".format(
            request.form.get('contact_info'), request.form.get('truck_name')))
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
# set the secret key.  keep this really secret:
app.secret_key = 'TrUcKSTeR'
if __name__ == '__main__':
    if 'debug' in sys.argv:
        app.run(debug=True, port=3002)
    else:
        port = int(os.environ.get("PORT", 5000))
        app.run(host='0.0.0.0', port=port)
