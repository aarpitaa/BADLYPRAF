CREATE TABLE contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    date DATE,   // Can be NULL by default
    dropdown VARCHAR(255),
    checkbox BOOLEAN
);

-- CREATE TABLE contact (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, date DATE, dropdown VARCHAR(255), checkbox BOOLEAN);

CREATE TABLE sale (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP
);

-- CREATE TABLE sale (id INT AUTO_INCREMENT PRIMARY KEY, message TEXT, start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, end_time TIMESTAMP);
