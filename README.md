# Exam API
## _Ron Vaknin_
## Environment variables
- PORT will be used as server port, default: 3000
- UPDATE_FREQUENCY will be used as cach update timout(miliseconds), default is 15 minutes;
## Endpoints
- url:port/info : api info
- url:port/{id} : add player data by id if exists in "files/players.csv", update cach and return file with results. 

## Tech

This exam uses a number of libraries to work properly:
- express 
- axios
- csv-parser
- csv-writer

## Installation
NOTE! module folder might be missing due to folder size
Install the dependencie and start the server.
```
npm i
npm start