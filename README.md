NestJS Admin Panel Project
This is a sample project for an admin panel built NestJS framework. The project includes features such as user authentication, file uploading, email sending, CRUD operations, and more.

Installation
Clone the repository
Install dependencies using 
npm install
Create a 
.env
 file and add the following variables:
PORT
: the port number for the server
DB_HOST
: the database host
DB_PORT
: the database port
DB_USERNAME
: the database username
DB_PASSWORD
: the database password
DB_DATABASE
: the database name
MAILER_HOST
: the email host
MAILER_PORT
: the email port
MAILER_USERNAME
: the email username
MAILER_PASSWORD
: the email password
Run the server using 
npm run start
Usage
The following endpoints are available:

POST /admin/signup
: creates a new admin user
POST /admin/insertadmin
: inserts a new admin user
GET /admin/
: returns "hello"
GET /admin/getimage/:name
: returns the image with the given name from the uploads folder
POST /admin/sendemail
: sends an email
GET /admin/index
: returns all admin users
GET /admin/findadmin/:id
: returns the admin user with the given ID
GET /admin/findadmin
: returns the admin user with the given ID and name
PUT /admin/updateadmin/:id
: updates the admin user with the given ID
DELETE /admin/deleteadmin/:id
: deletes the admin user with the given ID
POST /admin/signin
: logs in an admin user
GET /admin/signout
: logs out the current admin user
POST /admin/insertmanager
: inserts a new manager user
PUT /admin/updateadmin/
: updates the current admin user
GET /admin/findmanagersbyadmin/:id
: returns all manager users for the admin user with the given ID
GET /admin/findadminbymanager/:id
: returns the admin user for the manager user with the given ID
Dependencies
The project uses the following dependencies:

@nestjs/common
: provides common NestJS functionality
@nestjs/config
: provides configuration management for NestJS
@nestjs/core
: provides the core NestJS functionality
@nestjs/platform-express
: provides the Express platform adapter for NestJS
@nestjs/typeorm
: provides the TypeORM integration for NestJS
bcryptjs
: provides password hashing functionality
class-validator
: provides validation functionality for classes
class-transformer
: provides class transformation functionality
typeorm
: provides the ORM functionality for the project
multer
: provides file uploading functionality
nodemailer
: provides email sending functionality
@nestjs/mailer
: provides the Mailer integration for NestJS
@nestjs/passport
: provides the Passport integration for NestJS
passport
: provides authentication functionality
passport-local
: provides local authentication functionality
rxjs
: provides reactive programming functionality
License
This project is licensed under the MIT License.