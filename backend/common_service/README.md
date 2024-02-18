#How to create image\
docker build -t instourist_common_service .
\
\
#start docker image\
docker run -p 8000:8000 instourist_common_service
