FROM node:14

# Set the working directory inside the container
WORKDIR /myapp

COPY package.json ./

COPY .env ./

# Install the application dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port that your Node.js application listens on
EXPOSE 3000

# Define the command to run your Node.js application
CMD [ "npm", "start" ]
