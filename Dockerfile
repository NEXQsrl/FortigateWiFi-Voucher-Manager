# Stage 1: Build stage
FROM ubuntu:24.04 AS installer

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    ca-certificates \
    build-essential \
    xz-utils && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js v22.13.1 (download directly from Node.js website)
RUN curl -fsSL https://nodejs.org/dist/v22.13.1/node-v22.13.1-linux-x64.tar.xz -o node-v22.13.1-linux-x64.tar.xz && \
    tar -xJf node-v22.13.1-linux-x64.tar.xz -C /usr/local --strip-components=1 && \
    rm node-v22.13.1-linux-x64.tar.xz

# Verify Node.js and npm installation
RUN node -v && npm -v

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Bypass Certificate Errors
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false

# Install npm dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Expose the port that the frontend will listen on
EXPOSE 5173


ENV VITE_CLIENT_ID="e03381ce-8ca1-467d-81d4-adcb2a38ffeb"
ENV VITE_TENANT_ID="a62a799d-0556-44ca-afc3-237b336510b7"
ENV VITE_REDIRECT_URI="/"
ENV VITE_API_HOST="https://nqpffort01.nexq.it:7444/api"
ENV VITE_API_URL="/api/v2/cmdb/user/group/Guests%20Portale/guest?vdom=root"
ENV VITE_API_TOKEN="ns037p6gkszqbr9njgcmbf5fmmGNjs"
ENV VITE_WIFI_SSID="NEXQ-Guest"
ENV VITE_API_PREFIX="NQ"
ENV VITE_PHONE_COUNTRY="IT"


# Command to start the server
CMD ["npm", "run", "dev"]
