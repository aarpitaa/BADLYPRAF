const mysql = require('mysql-await');

var connPool = mysql.createPool({
    connectionLimit: 5,
    host: "127.0.0.1",
    user: "C4131F23U56",
    database: "C4131F23U56",
    password: "3186",
    connectTimeout: 20000
});

// connPool.awaitQuery("CREATE TABLE contact (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, date DATE, dropdown VARCHAR(255), checkbox BOOLEAN);");

// connPool.awaitQuery("CREATE TABLE sale (id INT AUTO_INCREMENT PRIMARY KEY, message TEXT, start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, end_time TIMESTAMP);");

async function addContact(data) {
    let formattedDate = data.date;

    // Check if the date is empty or invalid, and set it to NULL
    if (!data.date || isNaN(new Date(data.date).getTime())) {
        formattedDate = null;
    }

    const sql = "INSERT INTO contact (name, email, date, dropdown, checkbox) VALUES (?, ?, ?, ?, ?)";
    await connPool.awaitQuery(sql, [data.name, data.email, formattedDate, data.dropdown, data.checkbox]);
}

async function deleteContact(id) {
    const result = await connPool.awaitQuery("DELETE FROM contact WHERE id = ?", [id]);
    return result.affectedRows > 0;
}

async function getContacts() {
    return await connPool.awaitQuery("SELECT * FROM contact ORDER BY id DESC");
}

async function addSale(message) {
    await connPool.awaitQuery("INSERT INTO sale (message) VALUES (?)", [message]);
}

async function endSale() {
    await connPool.awaitQuery("UPDATE sale SET end_time = CURRENT_TIMESTAMP WHERE end_time IS NULL");
}

async function getRecentSales() {
    return await connPool.awaitQuery("SELECT * FROM sale ORDER BY start_time DESC LIMIT 3");
}

module.exports = {addContact, getContacts, deleteContact, addSale, endSale, getRecentSales};
