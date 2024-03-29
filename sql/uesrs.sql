CREATE TABLE `users` (
  `studentNumber` VARCHAR(100) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `dep` VARCHAR(100) NOT NULL,
  `provider` VARCHAR(30) DEFAULT 'local',
  `password` VARCHAR(100) NOT NULL,
  `telNumber` VARCHAR(30) NULL,
  `snsId` VARCHAR(100) NULL,
  `verificationStatus` VARCHAR(30) DEFAULT 'true',
  `walletAddr` VARCHAR(100) NOT NULL,
  `walletPrivateKey` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`studentNumber`)
);
