CREATE TABLE `blockvote`.`vote` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(100) NOT NULL,
  `writer` VARCHAR(100) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `startDate` VARCHAR(100) NOT NULL,
  `endDate` VARCHAR(100) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `text` VARCHAR(100) NOT NULL
);