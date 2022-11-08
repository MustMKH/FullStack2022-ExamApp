CREATE TABLE exam (
	id BIGSERIAL NOT NULL PRIMARY KEY,
    number VARCHAR(5) NOT NULL,
	title VARCHAR(50) NOT NULL
);
insert into exam (number, title) values (1, 'HTML ja CSS perusteet');
insert into exam (number, title) values (2, 'JavaScript syntaksi');
insert into exam (number, title) values (3, 'PostgreSQL ja tietokannat');