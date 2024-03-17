# How to start frontend local
1. $npm install
2. $npm install --force mapbox-gl @urbica/react-map-gl
3. $npm run build
4. $docker build -t instourist_frontend .
5. $docker run -p 80:80 --name instourist_frontend instourist_frontend

Dashboard will get CORS issues due to the security settings configured on the backend server.

## Conf file
.env and nginx.conf must be in frontend/instourist folder
