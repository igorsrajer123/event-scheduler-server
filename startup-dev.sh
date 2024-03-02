#Start docker Mongodb container
docker start mongodb-container || docker run -d --name mongodb-container -d -p 27017:27017 mongo

#Start server using nodemon library
nodemon