#Start docker Mongodb container
docker container inspect mongodb-container || docker run -d --name mongodb-container  -d -p 27017:27017 mongo

#Start server 
nodemon --exec npx ts-node ./src/server.ts