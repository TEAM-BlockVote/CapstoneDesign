CREATE TABLE `comment` (
  `id` INT NOT NULL,
  `text` VARCHAR(150) NOT NULL,
  `studentNumber` VARCHAR(150) NOT NULL,
  CONSTRAINT FK_comment_qna FOREIGN KEY (id) 
  REFERENCES qna (id)
);