#Postgres container\
docker-compose up -d
\
\
#To start FastAPI Local\ 
install fastAPI\
python -m pip install fastapi uvicorn[standard] 
\
python -m uvicorn src.main:app --reload