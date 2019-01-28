# forYou


#### Node-Express Backend:


*Database Schema:*

    1. server/src/dbStore/collectionConst.js
          - Define your table-name{collection} in this files.          
    2. server/src/dbStore/{your_schema}.js
           - Define your table-schema structure in this file.
           And export them as Model{i.e similar to java entity}. 


*Server Routing:*

    1. server/expressServer.js
          - Define your base route path for you major_module.
           Ex: User related operations will be performed in the following path.
           server.use('/user', userControlRouter);
              a. /user -> defines your rest-api 1st path parameter.
              b. userControlRouter -> defines your full restApi's.

    2. server/src/routers/{your_router_file}.js
          - Define your subsequent routes & implement your backend logic
          based on your requirements & folder strutures.
          Ex. Get, Put, Post requests rest api's
             i.e Router -> Service{major_logics} -> utils{common_validations & other stuffs}          
    
          For Easy Understanding: This process is similar to spring
           Controller -> Service -> dao{operations}
           
*Backend Postman: && Best Practice:*

    1. Utilize postman for developing backend independently.
    
    Note: while using postman for testing backend please comment 
    -> server.get('*', validateSession); in the expressServer.js
    
    For avoiding the token validation.

