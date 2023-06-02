CREATE TABLE `blockvote`.`qna` (
  `title` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  `view` int DEFAULT NOT NULL,
  `content` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`title`)
);
