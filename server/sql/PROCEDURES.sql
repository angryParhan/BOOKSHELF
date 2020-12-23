DELIMITER $
-- CREATE user
CREATE PROCEDURE createUser
(IN id VARCHAR(100), IN lib_id VARCHAR(100), IN login VARCHAR(100), IN email VARCHAR(100), IN name VARCHAR(50), IN password VARCHAR(100))
BEGIN
    INSERT INTO bookshelf.users
    (user_id, user_library_id, user_email, user_login, user_password, user_name, cdate)
    VALUES
    (id, lib_id, email, login, password, name, NOW()); -- Create new user
    INSERT INTO bookshelf.libraries
    (library_id, library_creator_id, library_name, cdate)
    VALUES
    (lib_id, id, 'Favourites', NOW()); -- Create fav lib
    INSERT INTO bookshelf.user_library (library_id, user_id) VALUES (lib_id, id); -- Add relation with fav library
END $

-- CREATE library
CREATE PROCEDURE createLibrary
(IN id VARCHAR(100), IN creator_id VARCHAR(100), IN name VARCHAR(50), IN description LONGTEXT, IN visible BOOLEAN, IN artwork LONGBLOB, IN external_info LONGTEXT)
BEGIN
	INSERT INTO bookshelf.libraries
	(library_id, library_creator_id, library_name, library_description, library_visible, library_artwork, library_external_info, cdate)
	VALUES
	(id, creator_id, name, description, visible, artwork, external_info, NOW()); -- Create new lib
    INSERT INTO bookshelf.user_library (library_id, user_id) VALUES (id, creator_id); -- Add relation with user
END $

-- CREATE book
CREATE PROCEDURE createBook
(IN id VARCHAR(100), IN lib_id VARCHAR(100), IN name VARCHAR(150), IN author VARCHAR(150), IN description LONGTEXT, IN artwork LONGTEXT, IN external_info LONGTEXT)
BEGIN
    INSERT INTO bookshelf.books
    (book_id, book_name, book_author, book_description, book_artwork, book_external_info, cdate)
    VALUES
    (id, name, author, description, artwork, external_info, NOW()); -- Create new book
END $
DELIMITER ;
