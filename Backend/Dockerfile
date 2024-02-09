# Use the official Node.js image as the base image
FROM node:21.2.0-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN prisma generate

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 5556

# Command to run your application
CMD ["npm", "run", "start:prod"]
