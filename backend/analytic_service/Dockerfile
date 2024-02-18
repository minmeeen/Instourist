# base python image for custom image
FROM python:3.9.13-slim-buster

# create working directory and install pip dependencies
WORKDIR /backend
COPY ./requirements.txt /backend/analytic_service/requirements.txt
RUN pip3 install --no-cache-dir --upgrade -r /backend/analytic_service/requirements.txt

# copy python project files from local to /hello-py image working directory
COPY . .

# run the fastAPI server  
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]