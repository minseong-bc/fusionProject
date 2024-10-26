CREATE TABLE `db_test`.`tour` (
  `tourInt` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `addr1` VARCHAR(45) NULL,
  `firstimage` VARCHAR(80) NULL,
  `areacode` VARCHAR(45) NULL,
  PRIMARY KEY (`tourInt`)
);

CREATE TABLE `db_test`.`event` (
`eventInt` INT NOT NULL AUTO_INCREMENT,
`title` VARCHAR(45) NULL,
`addr1` VARCHAR(45) NULL,
`firstimage` VARCHAR(80) NULL,
`areacode` VARCHAR(45) NULL,
PRIMARY KEY (`eventInt`)
);

CREATE TABLE `db_test`.`restaurant` (
  `restaurantInt` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `addr1` VARCHAR(45) NULL,
  `firstimage` VARCHAR(80) NULL,
  `areacode` VARCHAR(45) NULL,
  PRIMARY KEY (`restaurantInt`)
);