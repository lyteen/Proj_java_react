CREATE TABLE IF NOT EXISTS example.greetings (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INT,
    position VARCHAR(50),
    salary DOUBLE,
    bonus DOUBLE,
    stock INT,                      -- Added UNSIGNED as stock can't be negative
    use_device VARCHAR(50),
    team INTEGER
);

CREATE TABLE IF NOT EXISTS example.teams (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
-- CREATE TABLE IF NOT EXISTS example.greetings (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     age INT,
--     position VARCHAR(50),
--     salary DOUBLE,                     -- Added precision for monetary value
--     bonus DOUBLE,
--     stock INT,                      -- Added UNSIGNED as stock can't be negative
--     use_device VARCHAR(50)
--     -- is_active BOOLEAN NOT NULL DEFAULT TRUE,  -- Added DEFAULT TRUE

-- );