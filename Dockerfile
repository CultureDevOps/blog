FROM jitesoft/node-yarn:19

ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
ENV YARN_VERSION 3.6.1

RUN yarn policies set-version $YARN_VERSION

WORKDIR /app
ADD . /app

RUN yarn

EXPOSE 3000

CMD ["yarn","dev"]
