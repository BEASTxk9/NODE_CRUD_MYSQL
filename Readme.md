### NODE JS CRUD USING A MYSQL DATABASE ###

## Lets Begin... ##

1. run `npm init --y` in the terminal to initialize the project...(package.json file)...



2. install the following packages needed for this project by running `npm i mysql dotenv express cors nodemon` in the terminal
# !IMPORTANT: To check that the packages were installed look at the dependencies in the package.json file #

* installing the `mysql` package allows you to work with mysql databases

* installing the `dotenv` package allows you to connect your app to the database

* installing the `express` package...
    - Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build a single  page, multipage, and hybrid web application. It's a layer built on the top of the Node js that helps manage servers and

* installing the `cors` package...
    - Cross-origin resource sharing (CORS) is a mechanism for integrating applications. CORS defines a way for client web applications that are loaded in one domain to interact with resources in a different domain.

* installing the `nodemon` package allows you to test if the db is connected correctly an more by running `npm start` in the terminal
    - once you install nodemon go to the package.json file and set `"start": "node your-script.js"` so when you run npm start it will start the file that is called



3. Create a `app.js` file/global js file where all the packages will be called.



4. `Connect` your `mysql database` using `clever cloud` then take the db `environment variable`s from the `expert` tab under `information` on the `clever cloud` website and place it into the `.env` file which will be the variable names used to connect to the database on the `app.js` file.


5. Once the connection is established you can go to mysql workbench and use the db by running `USE MYSQL_DATABASE_NAME` 

6. Create a `.gitignore` file to not push you db details in the `.env` file and node_modules packages to github