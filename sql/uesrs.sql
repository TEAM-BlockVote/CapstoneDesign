CREATE TABLE `blockvote`.`users` (
  `studentNumber` VARCHAR(100) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `dep` VARCHAR(100) NOT NULL,
  `provider` VARCHAR(30) DEFAULT 'local',
  `password` VARCHAR(100) NOT NULL,
  `telNumber` VARCHAR(30) NULL,
  `snsId` VARCHAR(100) NULL,
  `verificationStatus` VARCHAR(30) DEFAULT 'true',
  PRIMARY KEY (`studentNumber`)
);
CREATE TABLE `blockvote`.`qna` (
  `title` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  `view` int DEFAULT 'local',
  `content` VARCHAR(500) NOT NULL,

  PRIMARY KEY (`title`)
);
