---
title: JOINS. SQL intensive conspect second day
date: 2022-07-05
tags:
  - sql
layout: layouts/post.njk
---

## REQUESTS

-- у какого композитора самый дорогой трек

    SELECT Composer,name,  max(UnitPrice) from tracks
    GROUP by Composer
    ORDER by max(UnitPrice) desc limit 1

-- в какие немецкие города в 2009 было сделано больше 1 продажи?

    SELECT * FROM sales
    where ShipCountry="Germany"
    and SalesDate >= date('2009-01-01') and SalesDate < date("2010-01-01")
    HAVING count(*) > 1

--вставка данных в таблицу

    INSERT INTO media_types
    VALUES (9, '0000'), (10, 'hhhh'), (11, 'tttt')

    INSERT INTO media_types
    SELECT GenreId, Name from genres where GenreId in (25,26)

--UPDATE

    UPDATE media_types set name="0000" where MediaTypeId=9

    UPDATE media_types
    set name="0000", MediaTypeId=MediaTypeId+1
    where MediaTypeId=127

--DELETE

    DELETE from media_types where MediaTypeId =25

--UNION ФИО всех из сотрудников и клиентов

    SELECT FirstName, LastName, "CLIENT" from customers
    UNION ALL
    SELECT FirstName, LastName, "EMPLOYEE" from employees

    SELECT * FROM (
        SELECT FirstName from customers
        UNION
        select FirstName from employees
    )

-- we'll get only Astrid

    SELECT * FROM (
        SELECT FirstName from customers
        UNION
        select FirstName from employees
    ) as t where t.Firstname="Astrid"

-- except

    SELECT FirstName from customers
    except
    SELECT FirstName from employees

--intersect

    SELECT FirstName from customers
    intersect
    SELECT FirstName from employees

-- avg

    select avg(a) from (
        select 3 as a
        union ALL
        select 7
    )

-- Посчитать кол-во продаж для каждого клиента подзапросом. Поля ФИО, кол-во продаж.

    select FirstName, LastName, (
        select count(*) from sales as s
        where s.CustomerId=customers.CustomerId
    ) as sales from customers

-- 2вложнных подзапроса: Скольк муз треков купил каждый клиент

    SELECT CustomerId, FirstName, LastName, (
        select count(distinct TrackId)
        from sales_items as si
        where si.SalesId in (
            select SalesId from sales as s
            where s.CustomerId=c.CustomerId
        )
    ) as number_of_sales from customers as c

-- в какую страну было продано больше всего муз треков в жанре джаз

    select ShipCountry, sum(
        (
            select count(*) from sales_items as si
            WHERE si.SalesId = s.SalesId AND si.TrackId IN (
                SELECT TrackId from tracks as t
                where t.GenreId in (
                    select GenreId from genres
                    where name="Jazz"
                )
            )
        )
    ) as count_sold_tracks  from sales as s
    GROUP by ShipCountry
    ORDER by count_sold_tracks desc limit 1

--CROSS JOIN

    select * from tracks as t
    cross join genres as g
    where t.GenreId = g.GenreId

--INNER JOIN

    select * from tracks as t
        inner join genres as g
            on t.GenreId = g.GenreId

--JOIN also needs for

    create TABLE employees_0 (id int, lastname varchar(50), firstname varchar(50), title_id);

    INSERT INTO employees_0
    SELECT 1, "Иванов","Иванов",1
    UNION
    SELECT 2, "AAA","AAAAAAA",2
    UNION
    SELECT 3, "BBB","BBBBBB",3;

    drop TABLE job_titles;
    CREATE table job_titles (title_id int,title_name varchar(50))
    INSERT INTO job_titles
    select 1, 'Manager'
    UNION
    SELECT 2, 'Developer';

-- Get data from both tables

    select * from employees_0 inner join job_titles on employees_0.title_id=job_titles.title_id

--сколько покупок сделал каждый клиент в 2009 году? ФИО, кол-во (через джионы)

    SELECT c.firstname,c.lastname, count(s.CustomerId) from customers as c
    left join sales as s
    	on c.CustomerId=s.CustomerId and strftime('%Y', salesDate)="2009"
    	GROUP BY c.firstname,c.lastname
