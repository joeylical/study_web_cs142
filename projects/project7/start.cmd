start /min cmd /c mongod --dbpath ./mongodb/
sleep 1
start /min cmd /c npm run build:w
sleep 1
start /min cmd /c nodemon webServer.js
