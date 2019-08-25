FROM nginx:stable

COPY ./frontend/build/ /var/www
COPY ./docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf
