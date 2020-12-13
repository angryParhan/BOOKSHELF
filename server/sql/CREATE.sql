CREATE SCHEMA IF NOT EXISTS `bookshelf` DEFAULT CHARACTER SET utf8 ;
USE `bookshelf`;

CREATE TABLE IF NOT EXISTS `bookshelf`.`users` (
  `cdate` TIMESTAMP NOT NULL,
  `user_login` VARCHAR(30) NULL,
  `user_email` VARCHAR(40) NULL,
  `user_name` VARCHAR(30) NULL,
  `user_library_id` VARCHAR(100) NOT NULL, -- Favourite list of books
  `user_password` VARCHAR(100) NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  UNIQUE INDEX `user_login_UNIQUE` (`user_login` ASC) VISIBLE,
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE,
  UNIQUE INDEX `user_library_id_UNIQUE` (`user_library_id` ASC) VISIBLE,
  PRIMARY KEY (`user_id`));

CREATE TABLE IF NOT EXISTS `bookshelf`.`user_library` (
  `user_library_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `library_id` VARCHAR(100) NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`user_library_id`));

CREATE TABLE IF NOT EXISTS `bookshelf`.`libraries` (
  `cdate` TIMESTAMP NOT NULL,
  `library_id` VARCHAR(100) NOT NULL,
  `library_artwork` LONGBLOB NULL,
  `library_name` VARCHAR(50) NOT NULL,
  `library_description` VARCHAR(5000) NULL,
  `library_visible` BOOLEAN DEFAULT TRUE,
  `library_creator_id` VARCHAR(100) NOT NULL, -- ID of user which creates this library
  PRIMARY KEY (`library_id`));

CREATE TABLE IF NOT EXISTS `bookshelf`.`library_book` (
  `library_book_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `library_id` VARCHAR(100) NOT NULL,
  `book_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`library_book_id`));

CREATE TABLE IF NOT EXISTS `bookshelf`.`books` (
  `cdate` TIMESTAMP NOT NULL,
  `book_id` VARCHAR(100) NOT NULL,
  `book_library_id` VARCHAR(100),
  `book_name` VARCHAR(150) NOT NULL,
  `book_author` VARCHAR(150) NULL,
  `book_description` VARCHAR(5000) NULL,
  `book_artwork` LONGBLOB,
  PRIMARY KEY (`book_id`));


select * from libraries;
