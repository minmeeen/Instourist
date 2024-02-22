#How to create image\
docker build -t instourist_analytic_service .
\
\
#start docker image\
docker run -p 8001:8001 --name instourist_analytic_service instourist_analytic_service

