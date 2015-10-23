from flask import render_template
from flask import current_app
from flask.views import View
import time


class RenderTemplateMixin(object):
    template_name = None
    def dispatch_request(self):
        assert self.template_name
        return render_template(self.template_name)


class GetContextMixin(object):
    def get_context(self, **kwargs):
        return {}


class BaseView(RenderTemplateMixin, GetContextMixin, View):
    def dispatch_request(self):
        return render_template(self.template_name, **self.get_context())


class HomePageView(BaseView):
    template_name = 'index.html'

    def get_context(self, **kwargs):
        context = super(HomePageView, self).get_context(**kwargs)
        context['baseName'] = 'ExoHack Example'
        context['appName'] = 'ExoHack'
        context['APP_CIK'] = current_app.config['APP_CIK']
        context['API_URL'] = current_app.config['API_URL']
        context['cacheBuster'] = current_app.config['CACHE_BUSTER']
        return context
