Este repositorio contiene una aplicación de gestión de empleados desarrollada con tecnologías modernas para mantener registros de ingreso y egreso de empleados en una compañía.

Tecnologías Utilizadas:

React
Utilizado para desarrollar la interfaz de usuario dinámica y responsive de la aplicación web.

Node.js
Entorno de ejecución utilizado para el backend de la aplicación.

Express
Framework de Node.js utilizado para construir el servidor backend que proporciona APIs RESTful.

MongoDB
Base de datos NoSQL utilizada para almacenar la información de los empleados y sus registros de ingreso/egreso.

Mongoose
Biblioteca de modelado de objetos MongoDB para Node.js, utilizada para definir modelos y esquemas para los datos de la aplicación.

Axios
Cliente HTTP basado en promesas utilizado en el frontend para realizar peticiones HTTP a la API del backend.

HTML/CSS
Lenguajes estándar para estructurar y diseñar la interfaz de usuario de la aplicación web.


Funcionalidades y Uso
Registro de Ingreso/Egreso de Empleados:
Permite registrar la entrada y salida de empleados especificando su ID, nombre y hora correspondiente.

Visualización de Registros:
Muestra una lista de todos los empleados con detalles de sus registros de ingreso/egreso, estado actual y tiempo transcurrido en la empresa.

Búsqueda y Filtrado:
Funcionalidad para buscar empleados por ID o nombre, facilitando la localización rápida de registros específicos.

Eliminación de Registros:
Permite eliminar registros de empleados de la base de datos, manteniendo la lista actualizada.


Ejecución del Proyecto
Para ejecutar localmente el proyecto, siga estos pasos:

Clonar el Repositorio:

git clone https://github.com/MatiasSebastianPepe/employee-management.git
cd employee-management

Instalar Dependencias:

Backend:
cd backend
npm install

Frontend:
cd frontend
npm install

Configurar Variables de Entorno:

Cree un archivo .env en el directorio backend para configurar variables como la URL de conexión a la base de datos MongoDB.

Ejecutar la Aplicación:

Backend:
node server.js

Frontend:
npm start

Acceder a la Aplicación:

La aplicación estará disponible en http://localhost:3000 por defecto para el frontend y en el puerto configurado (por ejemplo, http://localhost:5000) para el backend.
