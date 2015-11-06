# Pull base image.
FROM ubuntu:14.04

# Install.
RUN \
  sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
  apt-get update && \
  apt-get -y upgrade && \
  apt-get install -y build-essential && \
  apt-get install -y software-properties-common && \
  apt-get install -y byobu curl git htop man unzip vim wget && \
  apt-get install -y nginx python python-dev python-pip python-virtualenv && \
  rm -rf /var/lib/apt/lists/*

# Add files.
ADD docker/.bashrc /root/.bashrc
ADD docker/.gitconfig /root/.gitconfig

# Set environment variables.
ENV HOME /root

ADD virtualenv.py /tmp/virtualenv.py
ADD requirements.txt /tmp/requirements.txt
RUN cd /tmp && python /tmp/virtualenv.py venv && \
    /tmp/venv/bin/pip install -r /tmp/requirements.txt && \
    mkdir -p /opt/proj && cp -a /tmp/venv /opt/proj
ADD package.json /tmp/package.json
#RUN cd /tmp && npm install && \
#    mkdir -p /opt/proj && cp -a /tmp/node_modules /opt/proj
#ADD gulp /tmp/gulp
#ADD gulpfile.js /tmp/gulpfile.js
ADD app /opt/proj/app

#RUN cd /tmp && gulp prod && cp -a /tmp/build /opt/proj

WORKDIR /opt/proj
ADD app.py /opt/proj/app.py
ADD config /opt/proj/config

EXPOSE 5000

RUN adduser --disabled-password --gecos '' proj
RUN chown proj:proj /opt/proj

CMD ["./venv/bin/python", "app.py"]
