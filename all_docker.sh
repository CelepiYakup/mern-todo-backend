#!/bin/bash

#!/bin/bash

# Define the Docker image name
IMAGE_NAME="todo-backend"

# Build the Docker image from the current directory
docker build -t $IMAGE_NAME .

# Check if a container with the same name is already running
if [ "$(docker ps -q -f name=backend)" ]; then
    # Stop the running container
    docker stop backend
fi

# Remove the existing container (if any)
docker rm -f backend

# Run a new container using the newly built image
docker run -d --name backend -p 8080:8080 $IMAGE_NAME
