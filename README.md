# Tracking-System

----------------------------------------------------------------------------------------------------------------------------------------

THIS TXT SUMARIZES THE ROLE OF EACH FILE OF THIS APP. HOWEVER, EACH FILE WILL HAVE ITS OWN COMMENTS TO SPECIFIE WHAT CAN BE IMPROVED OR ADDED WITHOUT DISTURBING THE ALREADY IMPLEMENTED FUNCTIONALITIES. 

----------------------------------------------------------------------------------------------------------------------------------------

The file "server.js" makes the app running. It calls all the dependencies, mainly Express JS, Mongoose & Passport. 

    The app listens on a port defined by the environment or set at 8080 by default. 
    Each connection of the user to the app is defined by a session with a maximal timeframe of one hour. 
    Every request to the server is viewable in the CLI thanks to the "morgan" module. 
    The link with the database is made by using Mongoose. Mongoose will look in the "config" folder for the "database.js" file which defines the link to the database, built locally for tests purposes. A variable message is printed in the CLI depending on the success or failure of the connection of the app to the DB. 
    The "views" folder, which contains all the files with .html extensions, is called so that the app can successfuly render the views. 
    The app calls the static folder "public" which contains all the files with .css extensions and all the angular files. 
    The app uses the "body-parser" module to extract the body of a HTTP request and store it as a JavaScript Object accessible through "req.body". Here, it's set up for JSON et XML files. 
    The "passport" module is used to handle all the tentatives to authenticate to the app. It is initialized on the app, used for each session and called each time a specific route of the app is requested, in order to check that the user is successfully authenticated. It is mixed up with the "connect-flash" module which can communicate error messages to the user in case a redirection to the app is unsuccessfull. 

----------------------------------------------------------------------------------------------------------------------------------------

The "app" folder contains 3 subfolders :

    1) The "API" folder only contains the "api.js" file which defines the API of the app. Somes changes must be done, thus why the route to this file in the "server.js" file is commented. 
    2) The "models" folder is designated for the storage of all the Mongoose schemas. Currently, there is only the schema for the user's information in the "user.js" file.
    3) The "tabs" folder defines the tabs of the application. Each tab is represented by a file which stores every route that can be called from the page towards another tab of the app.

----------------------------------------------------------------------------------------------------------------------------------------

The "config" folder encloses 3 files :

    1) The "auth.js" file stores the credentials needed to communicate with the several API's used with the app. 
                                ! THESE INFORMATION ARE DELICATE AND MUST NOT BE SHARED !
    2) The "databse.js" file only contains the link to the database, set up locally here for tests puproses. 
                            ! IN CASE DEPLOYMENT, THIS INFORMATION WILL HAVE TO BE CHANGED !
    3) The "passport.js" file treats all the authentication strategies which will either register new informations in case the user has never been registered before, or will attest of the identity of the user to authorize, or not if the user isn't allowed, the access to the other functionalities of the app. It also stores the "flash" messages displayed in case of failed redirections.

----------------------------------------------------------------------------------------------------------------------------------------

The "node_modules" folder obviously contains all the files exported from the modules downloaded as dependencies in the "package.json" file.

----------------------------------------------------------------------------------------------------------------------------------------

The "public" folder contains 2 subfolders :

    1) The "css" subfolder encloses two css files slightly changing from one another to be more adapted depending of the html page using it.
    2) The "angularjs" subfolder encloses the "app.js" file which simply defines the angular module to use for the html pages. It also contains 3 subfolders as well, two of them being empty, "Directives" and "Services, but designed to shelter a better shaped angular code if needed. The only currently used subfolder of the "angularjs" folder is the "Controllers" one, which inventores all the functions needed to repatriate information received from requests to the API's.

----------------------------------------------------------------------------------------------------------------------------------------

The "views" folder disposes of all the html pages rendered by the app. The names are quite explicits.

The members from Cobot and Slack are displayed thanks to the "monitoring_page.html" file, and only the ones that are actives are displayed thanks to the "avroy.html" file.

----------------------------------------------------------------------------------------------------------------------------------------
