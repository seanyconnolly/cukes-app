#!/usr/bin/env bash

echo "building cukes-results-app"

ng build --prod

docker build -t suirtech/cukes-app:latest .

#docker push suirtech/cukes-app


#ssh -i ~/.ssh/macbook17 ubuntu@app.suirtech.com "cd /opt/docker-projects/cukes-docker;sudo docker-compose pull;sudo docker-compose up -d"
