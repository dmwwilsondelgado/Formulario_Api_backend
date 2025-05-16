#Revisamos Tablas
#Creamos el Usuario Adiministrador
create user 'wilsondelgado'@'localhost' identified by "1102717619";
create database formulario_api;
grant all privileges on formulario_api.* To 'wilsondelgado'@'localhost';
flush privileges;

show databases;
# Para trabaja en la base de Datos
use formulario_api;


create table Ciudades (
id_ciudades int auto_increment,
nombre_ciudades varchar (20),
create_at timestamp default current_timestamp, #Crear tiempo genera de la base de Datos
updated_at timestamp default current_timestamp on update current_timestamp,
primary key (id_ciudades));

create table Generos (
id_genero int auto_increment,
nombre_genero varchar(20),
primary key (id_genero));


create table habilidades(
id int auto_increment primary key,

); 
create table productos(
 id int auto_increment primary key,
 nombre varchar(250) not null,
 descripcion text,
 precio decimal(10,2),
 categoria_id int,
 create_at timestamp default current_timestamp, #Crear tiempo genera de la base de Datos
 updated_at timestamp default current_timestamp on update current_timestamp ,
 foreign key (categoria_id) references categorias(id) on delete set null
 # Cuanod eliminemos la categoria que el campo se vuelva nulo 
);