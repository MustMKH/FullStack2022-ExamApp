CREATE TABLE user_exam (
    exam_required BOOL,
    exam_date DATE,
    exam_completed BOOL,
    time_of_completion DATE,
	user_data_id BIGINT REFERENCES user_data (id),
    exam_id BIGINT REFERENCES exam (id),
    result SMALLINT
);
