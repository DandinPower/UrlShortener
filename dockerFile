FROM node:lts

WORKDIR /UrlShortener

ADD . /UrlShortener

RUN cd /UrlShortener && npm install

EXPOSE 80

CMD [ "node", "app.js" ]