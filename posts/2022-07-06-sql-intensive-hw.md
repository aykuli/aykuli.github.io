---
title: JOIN. SQL intensive second day home work
date: 2022-07-06
tags:
  - sql
layout: layouts/post.njk
---

## REQUESTS

1 Посчитайте общую сумму продаж в США в 1 квартале 2012 года?
Решить 2-мя способами Джойнами и Подзапросами

- Подзапросом

        select sum((
            SELECT  sum(si.UnitPrice) from sales_items as si
            where si.SalesId=s.SalesId
        )) as UnitPrice from sales as s
        where ShipCountry="USA"
        and SalesDate >= date("2012-01-01")
        and SalesDate < date("2012-05-01")

- join case

        select sum(si.UnitPrice) from sales_items as si
            left join sales as s
            on si.SalesId=s.SalesId
        where s.ShipCountry="USA"
        and s.SalesDate >= date("2012-01-01")
        and s.SalesDate < date("2012-05-01")

2 Покажите имена клиентов, которых нет среди работников.
Решить 3-мя способами: подзапросами, джойнами и логическим вычитанием.

- подзапрос

        SELECT FirstName from employees
        except
        SELECT FirstName from customers

- логическое вычитание

        select * from employees as e
        where not EXISTS (
            select 1 FROM customers as c
            where c.firstname=e.firstname
        )

- join case

        select * from employees as e
        left outer join customers as c
        on c.firstname=e.firstname
        where c.firstname is null;

3 Посчитайте количество треков в каждом альбоме. В результате должно быть: имя альбома и кол-во треков.

- подзапрос

        SELECT (
        select title from albums as a
        where a.albumid=t.AlbumId
        ) as title, sum(
        (
            select count(*) from albums as s
            where s.AlbumId = t.AlbumId
        )
        ) as tracks_in_album from tracks as t
        GROUP by title

- join case

        SELECT title, count(t.TrackId) from tracks as t
        left outer JOIN albums  as a
        on a.AlbumId=t.AlbumId
        GROUP by a.title

4 Покажите фамилию и имя покупателей немцев сделавших заказы в 2009 году,
товары которых были отгружены в город Берлин?

    SELECT  (
        SELECT FirstName  from customers as c
        where c.CustomerId=s.CustomerId

    ) as FirstName,
    (
    	SELECT LastName  from customers as c
    	where c.CustomerId=s.CustomerId

    ) as LastName from sales as s where s.ShipCity="Berlin" and strftime("%Y", s.salesdate)="2009" GROUP by s.CustomerId;

5 Покажите фамилии клиентов которые купили больше 30 музыкальных треков?

    SELECT (
    	select firstname || ' ' || lastname from customers as c
    	where c.CustomerId = s.CustomerId
    ),
    count(si.trackId) as tracks_count_solded
    from sales as s
    	LEFT join sales_items as si
    		on s.SalesId=si.SalesId
    		GROUP by s.CustomerId
    		HAVING count(si.trackId) > 30

6 В базе есть таблица музыкальных треков и жанров Назовите среднюю стоимстость музыкального трека в каждом жанре?

    SELECT g.name , g.GenreId, avg(t.UnitPrice) from tracks as t
    cross join genres as g
        where t.GenreId = g.GenreId
        GROUP by g.GenreId

7 В базе есть таблица музыкальных треков и жанров. Покажите жанры у которых средняя стоимость одного трека больше 1-го рубля

    SELECT g.name , g.GenreId, avg(t.UnitPrice) from tracks as t
    cross join genres as g
        where t.GenreId = g.GenreId
    	GROUP by g.GenreId
    	HAVING avg(t.UnitPrice) > 1
