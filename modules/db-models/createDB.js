const tables = {
    users: `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,
        userid VARCHAR(100) NOT NULL UNIQUE,
        token VARCHAR(30),
        ava VARCHAR(255),
        name VARCHAR(80) NOT NULL,
        surname VARCHAR(80) NOT NULL,
        provider VARCHAR(15) DEFAULT '',
        email VARCHAR(110) DEFAULT '',
        phone VARCHAR(20) DEFAULT '',
        phone_code VARCHAR(6) DEFAULT '',
        phone_verified VARCHAR(10) DEFAULT 'noverified',
        permission INT DEFAULT '0',
        date_registered DATETIME
        )`
};

const rule = {
    admin: `UPDATE users SET permission='1' WHERE email='svyrydvladymyr@gmail.com'`
};


class CreteTables {
    constructor(con){ this.con = con }
    query(type, name) {
        this.con.query( {tables, rule, news }[type][name],
            function (error, result) {
                error
                    ? console.log(`ERROR: ${error.sqlMessage}`)
                    : console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} '${name}' created!`);
            }
        );
    }
    table(name) { this.query('tables', name) };
    rule(name) { this.query('rule', name) };
};

module.exports = new CreteTables(require('./connectDB').con);