# FROM nginx
# RUN rm -rf /usr/share/nginx/html/*
# COPY dist /usr/share/nginx/html
# EXPOSE 80

# Stage 0, based on Node.js, to build and compile Angular
# FROM node as node
# WORKDIR /app
# COPY package.json /app/
# RUN npm install
# COPY ./ /app/
# ARG env=prod
# RUN npm run build -- --prod --environment $env

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY ./dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf