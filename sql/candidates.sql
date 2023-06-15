CREATE TABLE `candidates` (
  `id` INT PRIMARY KEY,
  `party` VARCHAR(100) NOT NULL,
  `candidate` VARCHAR(100) NOT NULL,
  `votes` int DEFAULT '0' NOT NULL
);