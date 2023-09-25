CREATE TABLE `qna` (
  `qnaNumber` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `voteCode` VARCHAR(45) NOT NULL,
  `qnaTitle` VARCHAR(300) NOT NULL,
  `writer` VARCHAR(45) NOT NULL,
  `makeDate` VARCHAR(45) NOT NULL,
  `view` int DEFAULT '0' NOT NULL,
  `content` VARCHAR(3000) NOT NULL,
  `candidate` VARCHAR(100) NOT NULL,
  `promise` VARCHAR(500) NOT NULL
);
