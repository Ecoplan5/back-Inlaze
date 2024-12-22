# back inlaze


Hola!!  Esta es la guía para Ejecutar el Backend del Proyecto

Seguir estos pasos te permitirá configurar y ejecutar el backend del proyecto de manera sencilla y eficiente.
1. Asegúrate de estar en la ubicación correcta:
PS C:\Users\felix\PRUEBA INLAZE BACK>
Si aún no lo has hecho, clona el repositorio y accede a la carpeta del proyecto.
Dentro de la carpeta, haz clic derecho y selecciona Abrir en Terminal.
Luego, ejecuta el siguiente comando para abrir el proyecto en Visual Studio Code: code .

2. Instalación de Dependencias
Ejecuta este comando una vez dentro del proyecto  para instalar todas las dependencias necesarias: npm install
Esto configurará todo lo que necesitas para empezar a trabajar con el proyecto.

3. Configuración de la Base de Datos
Es fundamental tener MySQL Workbench instalado, ya que se usará para conectar la base de datos.

El nombre de la base de datos por defecto es: inlaze

Si deseas cambiar el nombre, debes hacerlo en la carpeta config.js, ubicado en la carpeta database. Busca la configuración que luce como esta:


dialect: 'mysql',
host: 'localhost',
port: 3306,
username: 'root',
password: '',
database: 'inlaze',


Si tu MySQL tiene contraseña, agrégala en el campo password.
Si deseas cambiar el nombre de la base de datos, reemplaza 'inlaze' con el nombre que prefieras. Asegúrate de que la base de datos exista en MySQL Workbench antes de ejecutar el proyecto.

4. Creación de la Base de Datos
Abre MySQL Workbench  y ejecuta los siguientes comandos para crear la base de datos:

CREATE DATABASE inlaze;
USE inlaze;

(Si cambiaste el nombre de la base de datos en config.js, usa ese nombre en lugar de inlaze).

5. Sincronización y Migración
Vuelve a Visual Studio Code y ejecuta el siguiente comando en la terminal para sincronizar las tablas y establecer una conexión exitosa con la base de datos: node index.js

Esto migrará las tablas necesarias a la base de datos que configuraste previamente.

6. Conexión con el Frontend
Una vez que el backend esté corriendo correctamente, pasa al proyecto frontend. Sigue las instrucciones del frontend para iniciar sesión (como se explicó en la guía anterior) y comienza a explorar el software.