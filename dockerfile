# Use the official Node.js image as the base image
# FROM node:23.11.0
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies for Prisma and openssl
RUN apk add --no-cache openssl openssl-dev libc6-compat

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN yarn install --froze-lockfile
RUN yarn prisma generate

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN yarn build

# Expose the application port
EXPOSE 3000

# Command to run the application
# CMD ["node", "dist/main"]
RUN yarn build
CMD ["yarn", "start:prod"]