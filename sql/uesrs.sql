CREATE TABLE `blockvote`.`users` (
  `studentNumber` VARCHAR(15) NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `dep` VARCHAR(30) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `telNumber` VARCHAR(30) NULL,
  PRIMARY KEY (`studentNumber`)
);