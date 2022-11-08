CREATE TABLE question (
	id BIGSERIAL NOT NULL PRIMARY KEY,
    number VARCHAR(5) NOT NULL,
	contents VARCHAR(500) NOT NULL,
	exam_id BIGINT REFERENCES exam (id)
);
insert into question (number, contents, exam_id) values (1, 'Miksi taivas on sininen?', 1);
insert into question (number, contents, exam_id) values (2, 'Mikä on elämän tarkoitus?', 1);
insert into question (number, contents, exam_id) values (3, 'Jos kuristat smurffia, minkä väriseksi sen kasvot muuttuvat?', 1);
insert into question (number, contents, exam_id) values (4, 'Jos jäniksenkäpälä tuottaa onnea, mitä jänikselle tapahtui?', 1);
insert into question (number, contents, exam_id) values (1, 'Tämä on toisen tentin eka kysymys', 2);
insert into question (number, contents, exam_id) values (2, 'Tämä on toisen tentin toka kysymys', 2);
insert into question (number, contents, exam_id) values (3, 'Tämä on toisen tentin kolmas kysymys', 2);
insert into question (number, contents, exam_id) values (1, 'Tämä on kolmannen tentin eka kysymys', 3);
insert into question (number, contents, exam_id) values (2, 'Tämä on kolmannen tentin toka kysymys', 3);
insert into question (number, contents, exam_id) values (3, 'Tämä on kolmannen tentin kolmas kysymys', 3);