# integracionContinua

   
# Comandos para git
  - Comandos basicos: /*Usarlos con responsabilidad*/
    - git add <ruta>: Con este comando podemos agregar a nuestro paquete del commit un archivo o una carpeta en especifico, por ejemplo, este comando agrega toda la carpeta en la que estemos situados:
    -       git add .  
    - git commit -m "mensaje": Con este comando firmamos el paquete para que este listo para ser transportado, por ejemplo, este comando firma con el nombre "bugfixing landing navbar", normalmente escribimos algo que defina que cambio se esta subiendo
    -       git commit -m "bugfixing landing navbar"
    -   git push: Una vez añadidos los archivos que queramos enviar y firmado nuestro paquete procedemos a subirlo para que nuestros compañeros puedan descargarlo, se utiliza de la siguiente manera
    -       git push 
    -   git pull: Por ultimo tenemos el comando que trae los cambios subidos por nuestros compañeros o por nosotros mismos, realmente es muy sencillo de utlizar, en ocasiones puede causar error, si estamos editando uno de los archivos subidos por nuestros compañeros
    -       git pull
    -   git stash y git stash pop: Si se nos presenta que debemos descartar momentaneamente nuestros cambios podemos utilizar git stash para guardarlos en segundo plano y posteriormente recuperarlos, funciona asi:
    -       git stash       /*Para guardarlos*/
    -       git stash pop   /*Para recuperarlos*/
  - Ramas: /*Dedico un espacio para las ramas porque las utilizaremos mucho*/
    - git branch <ramita>:Para crear una rama basta con poner este comando seguido del nombre de la rama, por ejemplo:
    -       git branch develop
    - git checkout <ramita>:Para hacer el cambio de una rama a otra debemos utilizar este comando, teniendo en cuenta que no podemos dejar cambios pendientes de añadir a un commit, por ejemplo:
    -       git checkout 
    - Teniendo todo esto en cuenta vamos a usar las siguientes practicas, para trabajar en una caracteristica nueva vamos asignarle una rama marcandola como "caracteristica" de la siguiente manera
    -       git branch feature/navbar /*Solo si no esta creada*/
    -       git checkout feature/navbar
    - En caso de estar trabajando en un bug se hara de la siguiente manera
    -       git branch bug/footer /*Solo si no esta creada*/
    -       git checkout bug/footer
    
 
