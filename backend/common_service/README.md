# How to create image
$docker build -t instourist_common_service .

# start docker image
$docker run -p 8000:8000 --name instourist_common_service instourist_common_service

## Conf file
.env file must be in backend/common_service folder
