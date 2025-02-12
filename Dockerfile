# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Install wait-for-it
RUN apt-get update && apt-get install -y wait-for-it

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["sh", "-c", "wait-for-it mysql:3306 -t 60 -- npx sequelize-cli db:migrate && npm start"]
