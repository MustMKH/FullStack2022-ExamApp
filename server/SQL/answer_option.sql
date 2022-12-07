CREATE TABLE answer_option (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	contents VARCHAR(300) NOT NULL,
    is_correct BOOL NOT NULL DEFAULT false,
	question_id BIGINT
);


insert into answer_option (contents, is_correct, question_id) values ('En osaa sanoa.', 'f', 47);
insert into answer_option (contents, is_correct, question_id) values ('Tyhmä kysymys, kysy joku toinen.', 'f', 47);
insert into answer_option (contents, is_correct, question_id) values ('Kanada.', 'f', 47);
insert into answer_option (contents, is_correct, question_id) values ('Koska valospektrissä sininen aalto on lyhytaaltoista ja siroaa eniten.', 't', 47);
insert into answer_option (contents, is_correct, question_id) values ('-13', 'f', 48);
insert into answer_option (contents, is_correct, question_id) values ('0', 'f', 48);
insert into answer_option (contents, is_correct, question_id) values ('42', 't', 48);
insert into answer_option (contents, is_correct, question_id) values ('∞', 'f', 48);
insert into answer_option (contents, is_correct, question_id) values ('Violetiksi.', 'f', 49);
insert into answer_option (contents, is_correct, question_id) values ('Ne eivät muuta väriä.', 't', 49);
insert into answer_option (contents, is_correct, question_id) values ('Punaiseksi.', 'f', 49);
insert into answer_option (contents, is_correct, question_id) values ('Smurffien kuristaminen on väärin.', 't', 49);
insert into answer_option (contents, is_correct, question_id) values ('Sille', 't', 50);
insert into answer_option (contents, is_correct, question_id) values ('tais', 't', 50);
insert into answer_option (contents, is_correct, question_id) values ('käydä', 't', 50);
insert into answer_option (contents, is_correct, question_id) values ('kehnosti.', 't', 50);
insert into answer_option (contents, is_correct, question_id) values ('Juu.', 't', 5);
insert into answer_option (contents, is_correct, question_id) values ('Ei.', 'f', 5);
insert into answer_option (contents, is_correct, question_id) values ('Ehkä.', 'f', 5);
insert into answer_option (contents, is_correct, question_id) values ('Juu.', 't', 6);
insert into answer_option (contents, is_correct, question_id) values ('Ei.', 'f', 6);
insert into answer_option (contents, is_correct, question_id) values ('Ehkä.', 'f', 6);
insert into answer_option (contents, is_correct, question_id) values ('Juu.', 't', 7);
insert into answer_option (contents, is_correct, question_id) values ('Ei.', 'f', 7);
insert into answer_option (contents, is_correct, question_id) values ('Ehkä.', 'f', 7);
insert into answer_option (contents, is_correct, question_id) values ('Juu.', 't', 8);
insert into answer_option (contents, is_correct, question_id) values ('Ei.', 'f', 8);
insert into answer_option (contents, is_correct, question_id) values ('Ehkä.', 'f', 8);
insert into answer_option (contents, is_correct, question_id) values ('Juu.', 't', 9);
insert into answer_option (contents, is_correct, question_id) values ('Ei.', 'f', 9);
insert into answer_option (contents, is_correct, question_id) values ('Ehkä.', 'f', 9);
insert into answer_option (contents, is_correct, question_id) values ('Juu.', 't', 10);
insert into answer_option (contents, is_correct, question_id) values ('Ei.', 'f', 10);
insert into answer_option (contents, is_correct, question_id) values ('Ehkä.', 'f', 10);
insert into answer_option (contents, is_correct, question_id) values ('Juu.', 'f', 11);
insert into answer_option (contents, is_correct, question_id) values ('Ei.', 'f', 11);
insert into answer_option (contents, is_correct, question_id) values ('Juu.', 'f', 12);
insert into answer_option (contents, is_correct, question_id) values ('Ei.', 'f', 12);
insert into answer_option (contents, is_correct, question_id) values ('Juu.', 'f', 13);
insert into answer_option (contents, is_correct, question_id) values ('Ei.', 'f', 13);
insert into answer_option (contents, is_correct, question_id) values ('Juu.', 'f', 14);
insert into answer_option (contents, is_correct, question_id) values ('Ei.', 'f', 14);
insert into answer_option (contents, is_correct, question_id) values ('Juu.', 'f', 15);
insert into answer_option (contents, is_correct, question_id) values ('Ei.', 'f', 15);
insert into answer_option (contents, is_correct, question_id) values ('Juu.', 'f', 16);
insert into answer_option (contents, is_correct, question_id) values ('Ei.', 'f', 16);
