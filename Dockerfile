# Note that this is used as build environment for the stack project, not an actual running project
FROM node:10

# Lerna uses git for its diffing and publishing operations
RUN apt-get update \
    && apt-get install -y git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Yes no maybe. This is strange. Although all default shells are bash and bash has been set as the shell for yarn/npm to use, 
# it still runs everything as /bin/sh for some weird reason. Let's make sure it doesn't. Naughty yarn. 
RUN rm /bin/sh \ 
    && ln -s /bin/bash /bin/sh 

# https://github.com/nodejs/docker-node/issues/661
# Remove the version of yarn that is coming with node:8 & Install latest yarn
RUN rm -f /usr/local/bin/yarn && \
    curl -o- -L https://yarnpkg.com/install.sh | bash && \
    chmod +x ~/.yarn/bin/yarn && \
    ln -s ~/.yarn/bin/yarn /usr/local/bin/yarn

RUN yarn global add lerna@v2.6.0 
