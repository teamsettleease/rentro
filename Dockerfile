# Use official Node.js LTS Alpine image
FROM node:22
# Set working directory
WORKDIR /app
# Install dependencies
COPY package*.json ./
RUN npm install
# Copy app files
COPY . .
# Skip TypeScript errors only in Docker
ENV SKIP_TS_ERRORS=true
# Build the Next.js app
RUN npm run build
# Expose port
EXPOSE 3000
# Start app
CMD ["npm", "run", "dev"]