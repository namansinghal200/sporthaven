CREATE TABLE Sport (
    sportid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    maxsize INT,
    currentsize INT DEFAULT 0
);
CREATE TABLE Lobby (
    lobbyid INT PRIMARY KEY AUTO_INCREMENT,
    sportid INT,
    maxsize INT,
    currentsize INT DEFAULT 0,
    isactive BOOLEAN DEFAULT FALSE,
    isupdated BOOLEAN DEFAULT FALSE,
    winner VARCHAR(255),
    score VARCHAR(255),  -- Define score as VARCHAR
    FOREIGN KEY (sportid) REFERENCES Sport(sportid)
);
CREATE TABLE User (
    userid INT PRIMARY KEY AUTO_INCREMENT,
    activelobby BOOLEAN DEFAULT FALSE,
    currentlobby INT,  -- Changed data type to INT
    FOREIGN KEY (currentlobby) REFERENCES Lobby(lobbyid)
);

CREATE TABLE lobby_userids (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lobbyid INT,
    user_id INT,
    FOREIGN KEY (lobbyid) REFERENCES Lobby(lobbyid),
    FOREIGN KEY (user_id) REFERENCES User(userid)
);

ALTER TABLE User
ADD COLUMN password VARCHAR(255),  -- Adjust the data type and length as needed
ADD COLUMN profile_pic VARCHAR(255);  -- Assuming profile pic is stored as a file path or URL


