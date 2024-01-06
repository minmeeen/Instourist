#How to create image\
docker build -t instourist .
\
#start dicker image\
docker run -p 8000:8000 instourist 
\
#Postgres container\
docker-compose up -d