create database Barber;

create table users(
    id bigserial not null primary key,
    name varchar(200) not null,
    mail varchar(200) not null unique,
    password varchar(200) not null
);

insert into users (name, mail, password) values ('Yonatan Lauriano', 'yonatan@curso.com', 'miPass');

insert into users (name, mail, password) values ('Martin Perez', 'martin@curso.com', 'miPass');

insert into users (name, mail, password) values ('Federico Lopez', 'federico@curso.com', 'miPass');