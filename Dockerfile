FROM dockerfile/ubuntu

COPY . /opt/proj/

RUN apt-get update && \
    apt-get install -y nginx python python-dev python-pip python-virtualenv && \
    rm -rf /var/lib/apt/lists/*

RUN \
  cd /tmp && \
  wget http://nodejs.org/dist/node-latest.tar.gz && \
  tar xvzf node-latest.tar.gz && \
  rm -f node-latest.tar.gz && \
  cd node-v* && \
  ./configure && \
  CXX="g++ -Wno-unused-local-typedefs" make && \
  CXX="g++ -Wno-unused-local-typedefs" make install && \
  cd /tmp && \
  rm -rf /tmp/node-v* && \
  npm install -g npm && \
  printf '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc

WORKDIR /opt/proj

RUN npm install -g bower grunt-cli
RUN npm install && bower install
RUN python ./virtualenv.py venv
RUN ./venv/bin/pip install -r requirements.txt
RUN grunt build

EXPOSE 5000

RUN adduser --disabled-password --gecos '' proj
RUN chown proj:proj /opt/proj

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["./venv/bin/gunicorn", "heroku:app"]
