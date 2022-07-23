---
title: DDL (data definition language).SQL intensive third day.
date: 2022-07-07
tags:
  - sql
layout: layouts/post.njk
---

## DDL (data definition language)

```
CREATE TABLE contact_groups(
	contact_id INTEGER,
	group_id INTEGER,
	PRIMARY KEY (contact_id, group_id),
	FOREIGN KEY(contact_id)
		REFERENCES contacts (contact_id)
		ON DELETE CASCADE
		ON UPDATE NO ACTION,
	FOREIGN KEY(group_id)
		REFERENCES (group_id) groups
			ON DELETE CASCADE
			ON UPDATE NO ACTION
)
```

```
ALTER TABLE contacts RENAME TO contacts_old
```

```
ALTER TABLE contacts_old ADD COLUMN test_col INTEGER
```

```
CREATE table contacts (
	contact_id INTEGER PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT UNIQUE,
	phone TEXT UNIQUE
	CHECK (length(phone) >= 10) and (length(email) > 3)
)
```

```
CREATE [UNIQUE] INDEX index_name
	on table_name(column_list)
```

```
CREATE TABLE contacts (
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL
)

CREATE UNIQUE INDEX idx_contacts_email
	ON	contacts(email)

INSERT INTO contacts (first_name, last_name, email)
VALUES ('John', 'Doe','john@a.b');

SELECT * from contacts
```

Searching with index will be very fast.

```
EXPLAIN QUERY PLAN
SELECT first_name, last_name,email
FROM contacts
WHERE email="l@a.ru"
```

### Views

```
create view vw_jazz_tracks as
SELECT * from tracks as t
WHERE t.GenreId in (SELECT GenreId from genres where name = 'Jazz')
```

```
create view vw_tracks_1 as
SELECT t.TrackId, t.name as TrackName, Title as Album,
mt.name as media_type,
g.name as Genre,
t.Composer,
Milliseconds,
Bytes,
UnitPrice from tracks as t
	inner join albums as a
		on a.AlbumId=t.AlbumId
	inner join media_types as mt
		on t.MediaTypeId = mt.MediaTypeId
	inner join genres as g
		on t.GenreId = g.GenreId
```

### CTE - common table expression

```
WITH cte as (
SELECT * FROM customers where Country='Germany'
),
cte1 as (
SELECT cte.CustomerId, cte.FirstName, count(*) as cnt_sales
	from sales as s
		inner JOIN cte
			on cte.CustomerId=s.CustomerId
	GROUP by cte.FirstName, cte.LastName
)
```

### Trigger

```
create trigger [IF NOT EXISTS] trigger_name
[BEFORE | AFTER | INSTEAD OF] [INSERT | UPDATE | DELETE]
	ON table_name
	[WHEN CONDITION]
BEGIN
	statements;
END;
```

```
create table leads (
	id INTEGER PRIMARY KEY,
	first_name TEXT not null,
	last_name TEXT not null,
	phone TEXT not null,
	email TEXT not null,
	source TEXT not null
	)

create trigger validate_email_before_insert_leads
	BEFORE INSERT on leads
	BEGIN
		SELECT
			CASE
		when NEW.email NOT LIKE '%_@__%.__%' THEN
			RAISE (ABORT, 'Invalid email you wrote')
		END;
	END;
```

Example:

```
INSERT INTO leads (first_name, last_name, email, phone, source)
VALUES ('John','Doe', 'aaaa@br', '+77989896','')
```

And I will get the error message 'Invalid email you wrote'.

```
CREATE TABLE leads_logs (
	id INTEGER PRIMARY KEY,
	old_id int,
	new_id int,
	old_phone text,
	new_phone TEXT,
	old_email text,
	new_email text,
	user_action text,
	created_at text
);

CREATE TRIGGER log_contact_after_update
AFTER UPDATE On leads
WHEN old.phone <> new.phone
	OR old.email <> new.email
BEGIN
	INSERT INTO leads_logs (
		old_id, new_id, old_phone, new_phone, old_email, new_email, user_action, created_at
	)
	VALUES (
		old.id, new.id, old.phone, new.phone, old.email, new.email, 'UPDATE', datetime("now")
	);
END;
```

```
SELECT * from leads;

UPDATE leads SET last_name = 'Smith', email='aa@b.com' WHERE id = 1;

SELECT * FROM leads_logs;
```

```
DROP TRIGGER log_contact_after_update
```
