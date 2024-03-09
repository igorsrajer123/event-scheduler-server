#Start Redis container
docker start redis-container || docker run -d --name redis-container -p 6379:6379 redis/redis-stack-server:latest


#Start docker Mongodb container
docker start mongodb-container || docker run -d --name mongodb-container -p 27017:27017 mongo


#Start server using nodemon library
nodemon