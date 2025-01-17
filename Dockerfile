# Use an official Node.js image as the base image for the container
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Set environment variables
ENV NEXT_PUBLIC_BASE_URL='https://rabitoenglish.com/api'
ENV PROXY_BACKEND='https://backend.helenspeaking.com/api/v1'

# Copy the rest of the application code
COPY . .

RUN yarn install

# Build the application
RUN yarn build

# Expose the port the app will run on
EXPOSE 3000

# Command to start the application
CMD [ "yarn", "start" ]
