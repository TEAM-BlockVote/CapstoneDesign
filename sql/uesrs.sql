CREATE TABLE `blockvote`.`users` (
  `studentNumber` VARCHAR(30) NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `dep` VARCHAR(30) NOT NULL,
  `provider` VARCHAR(30) DEFAULT 'local',
  `password` VARCHAR(100) NOT NULL,
  `telNumber` VARCHAR(30) NULL,
  `snsId` VARCHAR(30) NULL,
  `verificationStatus` VARCHAR(30) DEFAULT 'true',
  PRIMARY KEY (`studentNumber`)
);