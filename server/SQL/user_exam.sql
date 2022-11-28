CREATE TABLE user_exam (
    exam_required BOOL,
    exam_date DATE,
    exam_completed BOOL,
    time_of_completion DATE,
	user_data_id BIGINT REFERENCES user_data (id),
    exam_id BIGINT REFERENCES exam (id),
    result SMALLINT
);
INSERT INTO user_exam (exam_required, exam_date, exam_completed, user_data_id, exam_id) values (true, '2022-12-12', 'false', 3, 1);
INSERT INTO user_exam (exam_required, exam_date, exam_completed, user_data_id, exam_id) values (true, '2022-12-12', 'false', 4, 1);
INSERT INTO user_exam (exam_required, exam_date, exam_completed, user_data_id, exam_id) values (true, '2022-12-12', 'false', 5, 1);
