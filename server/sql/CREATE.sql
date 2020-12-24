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


CREATE TABLE IF NOT EXISTS `bookshelf`.`libraries` (
  `cdate` TIMESTAMP NOT NULL,
  `library_id` VARCHAR(100) NOT NULL,
  `library_artwork` LONGTEXT NULL,
  `library_name` VARCHAR(50) NOT NULL,
  `library_description` LONGTEXT NULL,
  `library_visible` BOOLEAN DEFAULT TRUE,
  `library_external_info` LONGTEXT NULL,
  `library_creator_id` VARCHAR(100) NOT NULL, -- ID of user which creates this library
  FOREIGN KEY (library_creator_id) REFERENCES users(user_id) ON DELETE CASCADE,
  PRIMARY KEY (`library_id`));

CREATE TABLE IF NOT EXISTS `bookshelf`.`user_library` (
  `user_library_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `library_id` VARCHAR(100) NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  FOREIGN KEY (library_id) REFERENCES libraries(library_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  PRIMARY KEY (`user_library_id`));

CREATE TABLE IF NOT EXISTS `bookshelf`.`books` (
  `cdate` TIMESTAMP NOT NULL,
  `book_id` VARCHAR(100) NOT NULL,
  `book_library_id` VARCHAR(100),
  `book_name` VARCHAR(150) NOT NULL,
  `book_author` VARCHAR(150) NULL,
  `book_description` LONGTEXT NULL,
  `book_artwork` LONGTEXT NULL,
  `book_external_info` LONGTEXT NULL,
  PRIMARY KEY (`book_id`));


CREATE TABLE IF NOT EXISTS `bookshelf`.`library_book` (
  `library_book_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `library_id` VARCHAR(100) NOT NULL,
  `book_id` VARCHAR(100) NOT NULL,
  FOREIGN KEY (library_id) REFERENCES libraries(library_id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
  PRIMARY KEY (`library_book_id`));
