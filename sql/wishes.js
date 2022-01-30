let sqlite3 = require("sqlite3");

class Wishes {
  constructor(dao) {
    this.dao = dao;
  }
  createTable(userId) {
    const sql = `CREATE TABLE IF NOT EXISTS wishesUser${userId}(
            id INTEGER PRIMARY KEY,
            wish TEXT NOT NULL
        )`;
    return this.dao.run(sql);
  }

  dropTable(userId) {
    return this.dao.run(`DROP TABLE wishesUser${userId}`);
  }

  createWish(wish, userId) {
    return this.dao.run(`INSERT INTO wishesUser${userId} (wish) VALUES (?)`, [
      wish,
    ]);
  }
  deleteWish(id, userId) {
    return this.dao.run(`DELETE FROM wishesUser${userId} WHERE id = ?`, [id]);
  }
  getWishesByUserId(userId) {
    return this.dao.getAll(`SELECT * FROM wishesUser${userId}`);
  }
}

module.exports = Wishes;
