CREATE TABLE user_data (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	email VARCHAR(150) NOT NULL UNIQUE,
	password VARCHAR(500) NOT NULL,
	is_admin BOOLEAN NOT NULL DEFAULT false
);
