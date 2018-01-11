@echo off
docker run -d -p 4200:4200 --name spring_docker_ui --link spring_docker_api:spring_docker_api -it stelylan/task-manager
popd


