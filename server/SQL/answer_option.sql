CREATE TABLE answer_option (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	contents VARCHAR(300) NOT NULL,
    is_correct BOOL NOT NULL DEFAULT false,
    exam_id BIGINT,
	question_id BIGINT
);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('En osaa sanoa.', 'f', 1, 1);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('En osaa sanoa.', 'f', 1, 1);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Tyhmä kysymys, kysy joku toinen.', 'f', 1, 1);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Kanada.', 'f', 1, 1);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Koska valospektrissä sininen aalto on lyhytaaltoista ja siroaa eniten.', 't', 1, 1);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('-13', 'f', 1, 2);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('0', 'f', 1, 2);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('42', 't', 1, 2);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('∞', 'f', 1, 2);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Violetiksi.', 'f', 1, 3);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ne eivät muuta väriä.', 't', 1, 3);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Punaiseksi.', 'f', 1, 3);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Smurffien kuristaminen on väärin.', 't', 1, 3);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Sille', 't', 1, 4);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('tais', 't', 1, 4);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('käydä', 't', 1, 4);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('kehnosti.', 't', 1, 4);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Juu.', 't', 2, 5);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ei.', 'f', 2, 5);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ehkä.', 'f', 2, 5);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Juu.', 't', 2, 6);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ei.', 'f', 2, 6);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ehkä.', 'f', 2, 6);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Juu.', 't', 2, 7);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ei.', 'f', 2, 7);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ehkä.', 'f', 2, 7);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Juu.', 't', 3, 8);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ei.', 'f', 3, 8);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ehkä.', 'f', 3, 8);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Juu.', 't', 3, 9);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ei.', 'f', 3, 9);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ehkä.', 'f', 3, 9);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Juu.', 't', 3, 10);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ei.', 'f', 3, 10);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ehkä.', 'f', 3, 10);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Juu.', 'f', 4, 11);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ei.', 'f', 4, 11);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Juu.', 'f', 4, 12);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ei.', 'f', 4, 12);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Juu.', 'f', 4, 13);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ei.', 'f', 4, 13);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Juu.', 'f', 5, 14);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ei.', 'f', 5, 14);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Juu.', 'f', 5, 15);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ei.', 'f', 5, 15);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Juu.', 'f', 5, 16);
insert into answer_option (contents, is_correct, exam_id, question_id) values ('Ei.', 'f', 5, 16);
