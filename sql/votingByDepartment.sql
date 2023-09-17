CREATE TABLE `votingByDepartment` (
  `id` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `voteCode` VARCHAR(255) NOT NULL,
  `department` VARCHAR(255) NOT NULL,
  `voteTimeStamp` DATETIME NOT NULL
);