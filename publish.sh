#!/bin/bash

ANGULAR_PROJECT_PATH=/home/stelylan/AngularProjects
REPOSITORY_URL=www.lanmuyan.xin:5000
SSH_URL=www.lanmuyan.xin
DOCKER=stelylan/task-manager

cd $ANGULAR_PROJECT_PATH/task-manager
echo 开始编译Angular项目!
ng build -prod
echo 创建Docker镜像!
docker build -t $DOCKER $ANGULAR_PROJECT_PATH/task-manager
echo 设置上传仓储镜像Tag
docker tag $DOCKER $REPOSITORY_URL/$DOCKER
echo 上传镜像到仓储
docker push $REPOSITORY_URL/$DOCKER
echo 清除临时镜像
docker rmi -f $REPOSITORY_URL/$DOCKER
docker rmi -f $DOCKER
echo 开始SSH连接远程服务器
sudo ssh -l root $SSH_URL << remotessh
docker stop spring_docker_ui
docker rm spring_docker_ui
docker rmi -f $DOCKER
docker pull 127.0.0.1:5000/$DOCKER
docker tag 127.0.0.1:5000/$DOCKER $DOCKER
docker run -d -p 4200:4200 --name spring_docker_ui --link spring_docker_api:spring_docker_api -it $DOCKER
docker rmi -f 127.0.0.1:5000/$DOCKER
exit
remotessh
echo Angular项目Docker镜像发布成功!
