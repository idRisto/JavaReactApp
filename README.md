# JavaReactApp

MySql needs to be running. Open UniController (or similarr), start MySql Server and open MySql console.

create database book_db;

create user 'springuser'@'%' identified by 'ThePassword';

grant select, insert, delete, update on db_example.* to 'springuser'@'%';

Did not have time to setup hosting for db


 



Run this command at project root: 
cd booklist; npm install; npm run build; cd ..; mvn clean install; mvn spring-boot:run
