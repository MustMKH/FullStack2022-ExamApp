CREATE TABLE user_answer (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    option_selected BOOL,
    answer_result SMALLINT,
	user_data_id BIGINT REFERENCES user_data (id),
	answer_option_id BIGINT REFERENCES answer_option (id)
);
insert into user_answer (option_selected, user_data_id, answer_option_id) values ('t', 3, 1);