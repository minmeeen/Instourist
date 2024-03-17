# How to start frontend local
1. $npm install
2. $npm run build
3. $docker build -t instourist_frontend .
4. $docker run -p 80:80 --name instourist_frontend instourist_frontend

If there are library conflict please follow this step
1. remove "@urbica/react-map-gl": "^1.16.2", from package.json
2. $npm install
3. $npm install --force mapbox-gl @urbica/react-map-gl
and proceed to follow step 2-4 from above

Dashboard will get CORS issues due to the security settings configured on the backend server. (security for the public host)

## Conf file
.env and nginx.conf must be in frontend/instourist folder
