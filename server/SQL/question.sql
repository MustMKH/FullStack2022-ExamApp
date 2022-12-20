CREATE TABLE question (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	contents VARCHAR(350) NOT NULL,
	points INT DEFAULT 10,
	exam_id BIGINT
);
insert into question (contents, exam_id) values ('Miksi taivas on sininen?', 50);
insert into question (contents, exam_id) values ('Mikä on elämän tarkoitus?', 50);
insert into question (contents, exam_id) values ('Jos kuristat smurffia, minkä väriseksi sen kasvot muuttuvat?', 50);
insert into question (contents, exam_id) values ('Jos jäniksenkäpälä tuottaa onnea, mitä jänikselle tapahtui?', 50);
insert into question (contents, exam_id) values ('Tämä on toisen tentin eka kysymys', 51);
insert into question (contents, exam_id) values ('Tämä on toisen tentin toka kysymys', 51);
insert into question (contents, exam_id) values ('Tämä on toisen tentin kolmas kysymys', 51);
insert into question (contents, exam_id) values ('Tämä on kolmannen tentin eka kysymys', 52);
insert into question (contents, exam_id) values ('Tämä on kolmannen tentin toka kysymys', 52);
insert into question (contents, exam_id) values ('Tämä on kolmannen tentin kolmas kysymys', 52);
insert into question (contents, exam_id) values ('Tämä on neljännen tentin eka kysymys', 53);
insert into question (contents, exam_id) values ('Tämä on neljännen tentin toka kysymys', 53);
insert into question (contents, exam_id) values ('Tämä on neljännen tentin kolmas kysymys', 53);
insert into question (contents, exam_id) values ('Tämä on viidennen tentin eka kysymys', 54);
insert into question (contents, exam_id) values ('Tämä on viidennen tentin toka kysymys', 54);
insert into question (contents, exam_id) values ('Tämä on viidennen tentin kolmas kysymys', 54);
insert into question (contents, exam_id) values ('Tämä on kuudennen tentin eka kysymys', 55);
insert into question (contents, exam_id) values ('Tämä on kuudennen tentin toka kysymys', 55);
insert into question (contents, exam_id) values ('Tämä on kuudennen tentin kolmas kysymys', 55);
