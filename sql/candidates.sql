CREATE TABLE `candidates` (
  `id` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `voteCode` VARCHAR(45) NOT NULL,
  `partyName` VARCHAR(100) NOT NULL,
  `candidateName` VARCHAR(100) NOT NULL,
  `promise` VARCHAR(3000) NOT NULL,
  `partyimage` VARCHAR(500) NOT NULL
);