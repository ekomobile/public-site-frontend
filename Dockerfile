FROM node:16-alpine
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install -g @angular/cli@13.0.0 \
    npm install

COPY . /app

CMD ["ng", "build"]

EXPOSE 4200
