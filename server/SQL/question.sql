CREATE TABLE question (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	contents VARCHAR(350) NOT NULL,
	exam_id BIGINT
);
insert into question (contents, exam_id) values ('Miksi taivas on sininen?', 1);
insert into question (contents, exam_id) values ('Mikä on elämän tarkoitus?', 1);
insert into question (contents, exam_id) values ('Jos kuristat smurffia, minkä väriseksi sen kasvot muuttuvat?', 1);
insert into question (contents, exam_id) values ('Jos jäniksenkäpälä tuottaa onnea, mitä jänikselle tapahtui?', 1);
insert into question (contents, exam_id) values ('Tämä on toisen tentin eka kysymys', 2);
insert into question (contents, exam_id) values ('Tämä on toisen tentin toka kysymys', 2);
insert into question (contents, exam_id) values ('Tämä on toisen tentin kolmas kysymys', 2);
insert into question (contents, exam_id) values ('Tämä on kolmannen tentin eka kysymys', 3);
insert into question (contents, exam_id) values ('Tämä on kolmannen tentin toka kysymys', 3);
insert into question (contents, exam_id) values ('Tämä on kolmannen tentin kolmas kysymys', 3);
insert into question (contents, exam_id) values ('Tämä on neljännen tentin eka kysymys', 4);
insert into question (contents, exam_id) values ('Tämä on neljännen tentin toka kysymys', 4);
insert into question (contents, exam_id) values ('Tämä on neljännen tentin kolmas kysymys', 4);
insert into question (contents, exam_id) values ('Tämä on viidennen tentin eka kysymys', 5);
insert into question (contents, exam_id) values ('Tämä on viidennen tentin toka kysymys', 5);
insert into question (contents, exam_id) values ('Tämä on viidennen tentin kolmas kysymys', 5);