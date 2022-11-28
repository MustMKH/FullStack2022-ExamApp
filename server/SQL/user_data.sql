CREATE TABLE user_data (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	e_mail VARCHAR(100) NOT NULL,
	password VARCHAR(20) NOT NULL,
	is_admin BOOLEAN NOT NULL
);
insert into user_data (first_name, last_name, e_mail, password, is_admin) values ('Roosa', 'Rehtori', 'roosa.rehtori@koulu.fi', 123456, 't');
insert into user_data (first_name, last_name, e_mail, password, is_admin) values ('Oona', 'Opiskelija', 'oona.opiskelija@koulu.fi', 123456, 'f');
insert into user_data (first_name, last_name, e_mail, password, is_admin) values ('Olli', 'Opettaja', 'olli.opettaja@koulu.fi', 123456, 't');
insert into user_data (first_name, last_name, e_mail, password, is_admin) values ('Kalle', 'Koululainen', 'kalle.koululainen@koulu.fi', 123456, 'f');
insert into user_data (first_name, last_name, e_mail, password, is_admin) values ('Oiva', 'Oppilas', 'oiva.oppilas@koulu.fi', 123456, 'f');