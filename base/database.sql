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


create table lenguajes(
id_lenguaje int auto_increment ,
nombre_lenguaje varchar(20),
primary key(id_lenguaje));


create table Usuarios(
id_usuario int auto_increment,
nombre varchar(20),
apellido varchar(20),
correo varchar(20),
fecha_nacimiento date,
id_genero int,
id_ciudades int,
primary key(id_usuario),
foreign key  (id_genero) references generos(id_genero),
foreign key (id_ciudades) references ciudades(id_ciudades),
create_at timestamp default current_timestamp, #Crear tiempo genera de la base de Datos
updated_at timestamp default current_timestamp on update current_timestamp 
);

create table lenguajes_usuarios(
id_usuario int ,
id_lenguaje int,
foreign key (id_usuario)references usuarios(id_usuario),
foreign key (id_lenguaje)references lenguaje(id_lenguaje)
);