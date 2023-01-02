### THIS PROJECT REQUIRES NODE.JS INSTALLED 



## How to Start

# Open cmd prompt and cd into the project's directory

# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# if there are more than 27 vulnerabilities found
npm audit fix --force

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000



## Dependencies 

# Dependencies used in this project
React.js for front-end user interface
Express.js for back-end queries and transactions
Concurrently used to run both Express and React concurrently

# Client-sided dependencies:
react-router-dom for routing between pages of the app
react-player to embed video into the app for conveniences 

# Server-sided dependencies
pg for connecting to psql
cors to provide an Express middleware that can be used to enable Cross-origin resource sharing (CORS)



### Project structure

    |-client    ------------------------------> this is the folder for front end 
    |    |_public
    |    |    |_index.html
    |    |_src
    |    |    |_components    ----------------> components of the React app
    |    |            |_Header.js  -----------> Homepage        
    |    |            |_Jobs.js     ----------> Jobs page
    |    |            |_NavBar.js   ----------> Navigation bar
    |    |            |_Payroll.js   ---------> Payroll page
    |    |            |_Search.js    ---------> Employee page
    |    |            |_Video.js     ---------> Video page
    |    |
    |    |_App.js        -------->   React application    
    |    |_index.js        ------>   run React application on index.html
    |    |_index.css       ------>   css file to style the web app
    |    |_package.json    ------>   client-sided dependencies
    |
    |_creds.js         ---> credentials to login to 
    |_package.json     ---> server-sided dependencies
    |_README.md        ---> README file
    |_server.js        ---> back end express server
    |_query.sql        
    |_transaction.sql