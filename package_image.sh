#!/usr/bin/env bash

echo "building cukes-results-app"

ng build --prod

docker build -t suirtech/cukes-app:latest .

docker push suirtech/cukes-app
