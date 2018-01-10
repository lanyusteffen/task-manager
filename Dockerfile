FROM nginx:1.13.8-alpine

COPY ./nginx.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY /dist /usr/share/nginx/html

RUN chmod -R 777 /usr/share/nginx/html/*

CMD ["nginx", "-g", "daemon off;"]