# forYou


#### React Frontend:

       
*Folder Structure:*

   1. Create your main container folder inside "front\src\home\{...}".
   
    Ex: you are developing admin related-pages.
       
           dir:   front\src\home\admin
           dir:                   ---components
           dir:                   ---flux
           file:                  ---adminContainer.js
           
What will actually be in these folders?

   1. $_..container.js -> actuall main page which you are developing.
         Ex: List, Detail are all containers
         
   2. Inside components we will be having "add,edit,delete" dialog components. i.e these will be rendered as a pop-up inside the container.
    Misc: If the add/edit is a 