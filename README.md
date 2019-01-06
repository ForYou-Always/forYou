# forYou


### Environment Setup:

    1. Node V8.11.3 (LTS)
    2. Mongodb + Compass (https://drive.google.com/drive/folders/17q6xmSQ4nuB6NUR85sadVZSug7fNF1d-?ogsrc=32)
       
*Development Environment:*

   IDE:
   
     1. Eclipse latest JavaEE - (Vscode, Atomeditor - not recommended since they automate many of our works)
        Install 
        a. Nodeclipse 1.0.2 
        b. Enide Studio (2015)
        c. Typescript IDE 1.3.0 
                          plugins from eclipse-market-place
     2. Console2 - will act as catalyst for dev process (Recommended)
        
   Backend Api Development:
   
     1. Postman latest - Must
     


Develpoment Start:
1. cd into forYou folder

         a. ${npm install}
         b. ${npm start} This will start the client in the port 8080

2. Mongodb-setup

         a. Extract the monodb.7z into a safe location. Ex: C:\Program Files\mongodb\
         b. create a nested folders inside it ...> data\db.
         c. cd in to ${C:\Program Files\Mongodb\bin>}
         d. run the command -> ${mongod.exe --dbpath="D:\Workspace\Mongodb\data\db"}
         
         This will start the mongodb in the port 27017

3. cd into forYou/server folder         

         b. ${npm install}
         c. ${npm start} This will start the server in the port 2020
         
          
MERN stack Info:
1. Node v8+
2. React v16+
3. Express v4+
4. mongo v4+ 
Now you should be able to run the application without any issues. via http://localhost:8080