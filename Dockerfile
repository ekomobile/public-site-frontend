FROM node:16-alpine AS builder
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install -g @npm \
    npm install -g @angular/cli@13.0.0 \
    npm install

COPY . /app

CMD ["npm", "run", "build", "--watch", "--configuration production"]

EXPOSE 4200
