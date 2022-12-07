-- Currently it is not possible to add exams with a higher id number than what is present in the question table!!!

ALTER TABLE exam ADD CONSTRAINT fk_exam_question FOREIGN KEY (id) REFERENCES question (id) ON DELETE CASCADE;

ALTER TABLE exam ADD CONSTRAINT fk_exam_answer_option FOREIGN KEY (id) REFERENCES answer_option (id) ON DELETE CASCADE;

ALTER TABLE question ADD CONSTRAINT fk_question_answer_option FOREIGN KEY (id) REFERENCES answer_option (id) ON DELETE CASCADE;

-- Delete the ones above:

ALTER TABLE exam DROP CONSTRAINT fk_exam_question;

ALTER TABLE exam DROP CONSTRAINT fk_exam_answer_option;

ALTER TABLE question DROP CONSTRAINT fk_question_answer_option;

-- It is the other way around (final situation):

ALTER TABLE question ADD CONSTRAINT fk_question_exam FOREIGN KEY (exam_id) REFERENCES exam (id) ON DELETE CASCADE;

ALTER TABLE answer_option ADD CONSTRAINT fk__answer_option__question FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE;
