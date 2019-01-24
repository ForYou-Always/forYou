# forYou


#### React Frontend:

       
*Folder Structure:*

   1. Create your main container folder inside "front\src\home\{...}".
   
    Ex: You are developing admin related-pages.
       
           dir:   front\src\home\{my_folder}
           file:                  ---{my}Container.js
           dir:                   ---components
           dir:                   ---flux
           file:                       ---{my}ActionTypes.js
           file:                       ---{my}Actions.js
           file:                       ---{my}Reducer.js

 These folder-file structure is must.
           
What will actually be in these folders?

   1. *$_..container.js* -> actual main page which you are developing.
         Ex: List, Detail are all containers. Which will have separate url-routing path.
         
         
   2. Inside components we will be having *add,edit,delete* dialog components. i.e these will be rendered as a pop-up inside the container.
   
    Misc: If the add/edit gets separate URL-routing path then need not be a component.
     It should be a container-file.
     
     
*Code Flow:*

    1. Add your *{my}Container* in homeNavigator.js with a unique url-path.         
    2. Configure your *{my}Reducer* in homeReducer.js with a suitable name.
         
*Ajax Request:*

    1. In your actions file make your Restcall.
       a. Import the following methods from *.\forYou\front\src\common\restApi.js*
           { getReq, putReq, postReq, deleteReq, ...}
         
*Misc:*

    1. While exporting your container encloose it in the following way. 
           (i.e) withRouter(connect(null)(MyContainer))
