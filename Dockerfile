FROM node:20 
WORKDIR /app
COPY package*.json ./
COPY . . 
RUN npm install && npm cache clean --force 
RUN npm run build 
# Expose the application port
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]