# Stage 1: Build the React application
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /frontend/instourist

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code to the working directory
COPY . .

# # Build the React app for production
# RUN npm run build

# Stage 2: Serve the built React app with NGINX
FROM nginx:alpine

# Copy the built app from the previous stage to NGINX's HTML directory
COPY --from=build /frontend/instourist/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
# Expose port 80 to the outside world
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
