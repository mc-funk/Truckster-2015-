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

RUN wget http://nodejs.org/dist/v4.2.1/node-v4.2.1-linux-x64.tar.gz
RUN tar -C /usr/local --strip-components 1 -xzf node-v4.2.1-linux-x64.tar.gz
RUN printf '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc

# Set environment variables.
ENV HOME /root

RUN npm install -g gulp
ADD virtualenv.py /tmp/virtualenv.py
ADD requirements.txt /tmp/requirements.txt
RUN cd /tmp && python /tmp/virtualenv.py venv && \
    /tmp/venv/bin/pip install -r /tmp/requirements.txt && \
    mkdir -p /opt/proj && cp -a /tmp/venv /opt/proj
ADD package.json /tmp/package.json
RUN cd /tmp && npm install && \
    mkdir -p /opt/proj && cp -a /tmp/node_modules /opt/proj

COPY . /opt/proj/
WORKDIR /opt/proj

RUN gulp prod

EXPOSE 5000

RUN adduser --disabled-password --gecos '' proj
RUN chown proj:proj /opt/proj

CMD ["./venv/bin/gunicorn", "app:app"]
