---
title: Basics. SQL intensive first day home work
date: 2022-07-04
tags:
  - sql
layout: layouts/post.njk
---

## REQUESTS

1 Покажите фамилию и имя клиентов из города Прага ?

    SELECT FirstName, LastName from customers where City="Prague"

2 Покажите фамилию и имя клиентов у которых имя начинается букву M ?
Содержит символ "ch"?

    SELECT FirstName, LastName from customers where FirstName like "M%" or "%ch%"

3 Покажите название и размер музыкальных треков в Мегабайтах ?

    SELECT Name, Bytes/(1024 * 1024) as MegaBytes from tracks

4 Покажите фамилию и имя сотрудников кампании нанятых в 2002 году из города Калгари ?

    SELECT *  from employees where strftime("%Y", HireDate) = '2002' and City="Calgary"

5 Покажите фамилию и имя сотрудников кампании нанятых в возрасте 40 лет и выше?

    select FirstName, LastName FROM employees WHERE strftime('%Y','now') - strftime('%Y', BirthDate) >= 40

6 Покажите покупателей-амерканцев без факса ?

    SELECT * from customers WHERE Country="USA" and fax is NUll

7 Покажите канадские города в которые сделаны продажи в августе и сентябре месяце?

    SELECT * from sales WHERE ShipCountry="Canada" and (strftime("%m", SalesDate)="08" or strftime("%m", SalesDate)="09")

8 Покажите почтовые адреса клиентов из домена gmail.com ?

    SELECT * FROM customers where Email like "%gmail.com"

9 Покажите сотрудников которые работают в кампании уже 18 лет и более ?

    SELECT * FROM employees WHERE strftime('%Y','now') - strftime('%Y', HireDate) >= 18

10 Покажите в алфавитном порядке все должности в кампании ?

    SELECT title FROM employees ORDER by title ASC

11 Покажите в алфавитном порядке Фамилию, Имя и год рождения покупателей ?
Примечание: Вам поможет документация ниже
https://www.sqlitetutorial.net/sqlite-date-functions/sqlite-date-function/

    select LastName, FirstName, Age from customers order by LastName asc

12 Сколько секунд длится самая короткая песня ?

    select min(Milliseconds) from tracks

13 Покажите название и длительность в секундах самой короткой песни

    select name, min(Milliseconds/1000) as Seconds from tracks

14 Покажите средний возраст клиента для каждой страны ?

    SELECT Country, avg(age) from customers GROUP by Country having avg(age)

15 Покафите Фамилии работников нанятых в октябре?

    select LastName from employees where strftime("%m", HireDate) = "10"

16 Покажите фамилию самого старого по стажу сотрудника в кампании ?

    select LastName, min(HireDate) from employees
