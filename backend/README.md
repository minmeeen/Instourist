#How to create image\
docker build -t instourist .
\
\
#start docker image\
docker run -p 8000:8000 instourist 
\
\
#Postgres container\
docker-compose up -d
