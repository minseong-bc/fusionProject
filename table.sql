CREATE TABLE `gilbut`.`event` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `addr1` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `firstimage` VARCHAR(80) NULL,
  `detail` TEXT(65535) NULL,
  PRIMARY KEY (`Id`));

CREATE TABLE `gilbut`.`hotel` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `addr1` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `firstimage` VARCHAR(80) NULL,
  `detail` TEXT(65535) NULL,
  PRIMARY KEY (`Id`));
  
CREATE TABLE `gilbut`.`region` (
`Id` INT NOT NULL AUTO_INCREMENT,
`addr1` VARCHAR(45) NULL,
`title` VARCHAR(45) NULL,
`firstimage` VARCHAR(80) NULL,
`detail` TEXT(65535) NULL,
PRIMARY KEY (`Id`));

CREATE TABLE `gilbut`.`restaurant` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `addr1` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `firstimage` VARCHAR(80) NULL,
  `detail` TEXT(65535) NULL,
  PRIMARY KEY (`Id`));
  
CREATE TABLE `gilbut`.`shopping` (
`Id` INT NOT NULL AUTO_INCREMENT,
`addr1` VARCHAR(45) NULL,
`title` VARCHAR(45) NULL,
`firstimage` VARCHAR(80) NULL,
`detail` TEXT(65535) NULL,
PRIMARY KEY (`Id`));
  
CREATE TABLE `gilbut`.`course` (
`Id` INT NOT NULL AUTO_INCREMENT,
`title` VARCHAR(45) NULL,
`firstimage` VARCHAR(80) NULL,
`detail` TEXT(65535) NULL,
PRIMARY KEY (`Id`));