CREATE TABLE `votingResults` (
  `id` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `voteCode` VARCHAR(255) NOT NULL,
  `partyNumber` INT NOT NULL,
  `votes` INT DEFAULT 0,
  `lastUpdate` DATETIME NOT NULL
);