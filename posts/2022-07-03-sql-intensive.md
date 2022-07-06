---
title: Basics. SQL intensive conspect first day
date: 2022-07-03
tags:
  - sql
layout: layouts/post.njk
---

## REQUESTS

-- Покажите содержание таблицы customers

    SELECT * FROM customers

-- Отобрать все музыкальные треки с ценой меньше 1 рубля. Больше 1 рубля

    SELECT * FROM tracks WHERE UnitPrice <= 1
    SELECT * FROM tracks WHERE UnitPrice > 1
    SELECT * FROM tracks WHERE UnitPrice > 1 and UnitPrice < 2

-- Как зовут работников-продавцов в компаний? Фамилия и имя

    SELECT FirstName , LastName FROM employees
    SELECT FirstName || ' ' || LastName as FIO FROM employees
    Andrew Adams
    Nancy Edwards
    Jane Peacock

    SELECT Name, UnitPrice*(1-0.2) as price_withput_tax from tracks
    SELECT  FirstName || ' ' || LastName as FIO,
    	        Address || '; ' || City || '; ' || State || '; ' || Country as full_address
    FROM customers

    SELECT FirstName || ' ' || LastName as FIO,
        Address || '; ' || City || '; ' || State || '; ' || Country as full_address,
        State, ifnull(State, 'no data') as State
    FROM customers

-- Avoiding null

    SELECT FirstName || ' ' || LastName as FIO,
        ifnull(Address, 'no data') || '; ' || ifnull(City, 'no data') || '; ' || ifnull(State, 'no data') || '; ' || ifnull(Country, 'no data') as full_address
    FROM customers

-- Select song with the word night in name
%% - means any number of symbols on right and left sides

    SELECT * from tracks where name like '%night%'

-- songs that finishs not with A symbol

    SELECT * from tracks where name not like '%A'
    SELECT * from tracks where not(name like '%A' and UnitPrice > 1)
    SELECT * from tracks where name like '%A' and UnitPrice > 1 or Composer = 'AC/DC'
    SELECT * from tracks where TrackId in (1, 2, 3, 4, 5)
    SELECT * from sales where salesDate between date('2010-01-01') and date('2011-01-01')
    SELECT 	salesDate,
        date(salesDate, 'start of month') as MM,
        date(salesDate, 'start of year') as YYYY
    from sales
    SELECT 	* from tracks WHERE Composer is null

-- distinct - оператор отбрасывания дублитката

    SELECT DISTINCT Country from customers

    SELECT DISTINCT Country, State from customers
    WHERE fax is not NULL
    order by Country ASC

--- показывает количесвто клиентов для каждой страны

    SELECT Country , count(*)
    from customers
    GROUP by Country

Result:

```
    Belgium	1
    Brazil	6
    Canada	10
```

    SELECT Country , count(*),avg(age),min(age),sum(age),max(age)
    from customers
    GROUP by Country

    SELECT Country , count(*),avg(age),min(age),sum(age),max(age)
    from customers
    GROUP by Country, State
    having count(*)>4

-- для каждого года посчитать количесво продаж

    SELECT date(salesdate, 'start of year'),count(*)
    from sales
    group by date(salesdate, 'start of year')

Result:

```
    2009-01-01	83
    2010-01-01	83
    2011-01-01	83
    2012-01-01	83
    2013-01-01	80
```
