drop database UrlShortener;
create database UrlShortener;
use UrlShortener;

create table url (
    id int primary key auto_increment,
    originalUrl varchar(50) not null,
    expireAt Datetime not null
);

insert into url (originalUrl,expireAt) values 
('http://google.com','2021-02-18 02:55:00'),
('http://google.com','2023-02-18 02:55:00');
