#############
## Builder ##
#############

# Builder image uses node/yarn (on debian jessie) to create production build of frontend
FROM node:10 as builder

# Yes no maybe. This is strange. Although all default shells are bash and bash has been set as the shell for yarn/npm to use,
# it still runs everything as /bin/sh for some weird reason. Let's make sure it doesn't. Naughty yarn.
RUN rm /bin/sh \
    && ln -s /bin/bash /bin/sh

# Setup /app/ with current code
WORKDIR /app

# https://github.com/nodejs/docker-node/issues/661
# Remove the version of yarn that is coming with node:10 & Install latest yarn
RUN rm -f /usr/local/bin/yarn && \
    curl -o- -L https://yarnpkg.com/install.sh | bash && \
    chmod +x ~/.yarn/bin/yarn && \
    ln -s ~/.yarn/bin/yarn /usr/local/bin/yarn

# Copy only package.json, yarn.lock and .yarnrc first to properly leverage Docker build caching for node_modules, greatly speeds up build times
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY .yarnrc /app/.yarnrc

# Install all required modules first, `--production=false` is required since the default node image sets `NODE_ENV production`,
# which causes yarn to not install any devDependencies. Node module install script will now be cached unless the package files are modified
RUN yarn install --pure-lockfile --production=false

# Copy project sources
COPY . /app/

# Define all used build-time arguments including default values, will be available as ENV variables for build command below.
# Always define the build args as late as possible since changed values will result in cache misses for every RUN command following their definition.
# Build args without a default value should be treated as required and checked for existence, aborting the build if they haven't been defined.
# Build args will be defined via gitkube remote in k8s deployment, make sure they match what's defined here! If you require additional ENV variables
# for your build, add them to this file and the gitkube remote, then re-apply the remote using `kubectl apply -f cms.remote.yaml`.
# If you need to build the Docker image elsewhere, you can specify them via `--build-arg <name>=<value>` for the `docker build` command.
# See https://docs.docker.com/engine/reference/builder/#using-arg-variables for further details
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_DEPLOYMENT_ENV
ARG REACT_APP_BASE_NAME
ARG PUBLIC_URL
ARG NODE_ENV=production

# Build project and copy to nginx folder, then clean up sources
# Re-export build args to strip double quotes from them (taken from https://stackoverflow.com/a/9733456 @ 2018-08-20)
RUN set -e \
    && cd /app \
    && test -n "${REACT_APP_API_BASE_URL}" \
    && test -n "${REACT_APP_DEPLOYMENT_ENV}" \
    && test -n "${REACT_APP_BASE_NAME}" \
    && test -n "${PUBLIC_URL}" \
    && export REACT_APP_API_BASE_URL=$(sed -e 's/^"//' -e 's/"$//' <<<"$REACT_APP_API_BASE_URL") \
    && export REACT_APP_DEPLOYMENT_ENV=$(sed -e 's/^"//' -e 's/"$//' <<<"$REACT_APP_DEPLOYMENT_ENV") \
    && export REACT_APP_BASE_NAME=$(sed -e 's/^"//' -e 's/"$//' <<<"$REACT_APP_BASE_NAME") \
    && export PUBLIC_URL=$(sed -e 's/^"//' -e 's/"$//' <<<"$PUBLIC_URL") \
    && export NODE_ENV=$(sed -e 's/^"//' -e 's/"$//' <<<"$NODE_ENV") \
    && yarn build

############
## Runner ##
############

# Runner image uses minimal nginx setup (on alpine linux) required for serving frontend
FROM nginx:alpine as runner
EXPOSE 80

# Copy default nginx config in repo
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

# Copy only minified build files f rom builder setup
COPY --from=builder /app/build /usr/share/nginx/html
