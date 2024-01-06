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
\
\
#To start FastAPI Local\ 
install fastAPI\
python -m pip install fastapi uvicorn[standard] 
\ 
python -m uvicorn src.main:app --reload
