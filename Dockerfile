from node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent 
RUN npm install react-scripts@3.0.1 -g --silent

COPY ./ ./

# Build for production.
RUN npm run build --production

# Tell Docker about the port we'll run on.
EXPOSE 5000
# Install `serve` to run the application.
RUN npm install -g serve
CMD ["serve","-s", "build"]
# Set the command to start the node server.

