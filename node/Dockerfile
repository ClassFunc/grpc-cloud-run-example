FROM node:22-slim

WORKDIR /srv/grpc

COPY server.js *.proto package.json ./

RUN npm install

EXPOSE 8443
ENV PORT=8443
ENV HOST=0.0.0.0
CMD ["node", "server.js"]