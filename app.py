import os
import sys
from flask import Flask, render_template, current_app
import jinja2
app = Flask(__name__, static_folder='build', static_path='')

# Override default location of templates
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

def get_context():
    context = {}
    context['APP_CIK'] = current_app.config['APP_CIK']
    context['API_URL'] = current_app.config['API_URL']
    return context


if __name__ == '__main__':
    if 'debug' in sys.argv:
        app.run(debug=True, port=3002)
    else:
        port = int(os.environ.get("PORT", 5000))
        app.run(debug=False, port=port)
