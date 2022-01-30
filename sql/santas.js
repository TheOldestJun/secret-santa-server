class Santas {
  constructor(dao) {
    this.dao = dao;
  }
  createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS santas (
              id INTEGER PRIMARY KEY,
              santa_id INTEGER,
              receiver_id INTEGER,
              FOREIGN KEY (santa_id) REFERENCES users(id),
              FOREIGN KEY (receiver_id) REFERENCES users(id)
          )`;
    return this.dao.run(sql);
  }
  createChains(santaId, receiverId) {
    return this.dao.run(
      "INSERT INTO santas (santa_id, receiver_id) VALUES (?, ?)",
      [santaId, receiverId]
    );
  }
  returnReveicer(userId) {
    return this.dao.get(`SELECT receiver_id FROM santas WHERE santa_id = ?`, [
      userId,
    ]);
  }
}

module.exports = Santas;
