class Users {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            santaFor INTEGER,
            FOREIGN KEY (santaFor) REFERENCES santas(id)
        )`;
    return this.dao.run(sql);
  }

  dropTable() {
    return this.dao.run(`DROP TABLE users`);
  }

  createUser(firstName, lastName) {
    return this.dao.run(
      `INSERT INTO users (firstName, lastName, santaFor) VALUES (?, ?, ?)`, // sql sentence
      [firstName, lastName, null] // setting params to apropriate values in table
    );
  }

  addSantaForId(userId, receiverId) {
    return this.dao.run(`UPDATE users SET santaFor = ? WHERE id = ?`, [
      receiverId,
      userId,
    ]);
  }

  deleteUser(id) {
    return this.dao.run("DELETE FROM users WHERE id = ?", [id]);
  }
  count() {
    return this.dao.get("SELECT COUNT (*) FROM users");
  }
  getById(id) {
    return this.dao.get("SELECT * FROM users WHERE id = ?", [id]);
  }
  getAllUsers() {
    return this.dao.getAll("SELECT * FROM users");
  }
}

module.exports = Users;
