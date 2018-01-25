#!/bin/bash

ANGULAR_PROJECT_PATH=/home/stelylan/AngularProjects
REPOSITORY_URL=www.lanmuyan.xin:5000

cd $ANGULAR_PROJECT_PATH/task-manager
echo 开始编译Angular项目!
ng build -prod
echo 创建Docker镜像!
docker build -t stelylan/task-manager $ANGULAR_PROJECT_PATH/task-manager
echo 设置上传仓储镜像Tag
docker tag stelylan/task-manager $REPOSITORY_URL/stelylan/task-manager
echo 上传镜像到仓储
docker push $REPOSITORY_URL/stelylan/task-manager
echo 清除临时镜像
docker rmi -f $REPOSITORY_URL/stelylan/task-manager
docker rmi -f stelylan/task-manager
echo Angular项目Docker镜像发布成功!
