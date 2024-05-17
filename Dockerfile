FROM node:18.18-slim AS builder

WORKDIR /builder
COPY package.json .
RUN npm install -g @angular/cli
RUN npm install

COPY . .
RUN ng build



FROM nginxinc/nginx-unprivileged:1.24-alpine-slim
COPY --from=builder --chmod=775 --chown=nginx:nginx /builder/dist/guestbook /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
