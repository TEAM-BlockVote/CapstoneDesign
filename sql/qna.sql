CREATE TABLE `blockvote`.`qna` (
  `id` INT AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  `view` int DEFAULT '0' NOT NULL,
  `content` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id`)
);
