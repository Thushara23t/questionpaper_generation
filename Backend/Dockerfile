# Use Node.js official image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose backend port (change if your backend uses a different one)
EXPOSE 5000

# Start the backend
CMD ["npm", "start"]
