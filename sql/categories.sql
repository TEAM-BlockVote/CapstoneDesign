CREATE TABLE `categories` (
  `indexNumber` INT AUTO_INCREMENT PRIMARY KEY,
  `category` VARCHAR(45) NOT NULL,
  `candidateNumber` INT NOT NULL,
  `promise` VARCHAR(1000) NOT NULL,
  `voteCode` VARCHAR(10) NOT NULL
);