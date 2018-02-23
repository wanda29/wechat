drop database if exists;
create database  db character set utf8;
drop table if exists db.chat;
create table db.chat(
    id int auto_increment primary key comment 'id pk',
    question text not null  comment '问题',
    answer text not null comment '回答'
) comment '聊天';
insert into db.chat values(null,'你好','你好，小i为你服务');