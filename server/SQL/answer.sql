CREATE TABLE answer_option (
	id BIGSERIAL NOT NULL PRIMARY KEY,
    number VARCHAR(5) NOT NULL,
	contents VARCHAR(300) NOT NULL,
    is_correct BOOL NOT NULL,
    exam_id BIGINT REFERENCES exam (id),
	question_id BIGINT REFERENCES question (id)
);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('A', 'En osaa sanoa.', 'f', 1, 1);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('A', 'En osaa sanoa.', 'f', 1, 1);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('B', 'Tyhmä kysymys, kysy joku toinen.', 'f', 1, 1);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('C', 'Kanada.', 'f', 1, 1);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('D', 'Koska valospektrissä sininen aalto on lyhytaaltoista ja siroaa eniten.', 't', 1, 1);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('A', '-13', 'f', 1, 2);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('B', '0', 'f', 1, 2);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('C', '42', 't', 1, 2);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('D', '∞', 'f', 1, 2);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('A', 'Violetiksi.', 'f', 1, 3);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('B', 'Ne eivät muuta väriä.', 't', 1, 3);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('C', 'Punaiseksi.', 'f', 1, 3);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('D', 'Smurffien kuristaminen on väärin.', 't', 1, 3);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('A', 'Sille', 't', 1, 4);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('B', 'tais', 't', 1, 4);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('C', 'käydä', 't', 1, 4);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('D', 'kehnosti.', 't', 1, 4);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('A', 'Juu.', 't', 2, 5);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('B', 'Ei.', 'f', 2, 5);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('c', 'Ehkä.', 'f', 2, 5);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('A', 'Juu.', 't', 2, 6);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('B', 'Ei.', 'f', 2, 6);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('c', 'Ehkä.', 'f', 2, 6);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('A', 'Juu.', 't', 2, 7);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('B', 'Ei.', 'f', 2, 7);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('c', 'Ehkä.', 'f', 2, 7);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('A', 'Juu.', 't', 3, 8);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('B', 'Ei.', 'f', 3, 8);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('c', 'Ehkä.', 'f', 3, 8);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('A', 'Juu.', 't', 3, 9);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('B', 'Ei.', 'f', 3, 9);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('c', 'Ehkä.', 'f', 3, 9);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('A', 'Juu.', 't', 3, 10);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('B', 'Ei.', 'f', 3, 10);
insert into answer_option (number, contents, is_correct, exam_id, question_id) values ('c', 'Ehkä.', 'f', 3, 10);
