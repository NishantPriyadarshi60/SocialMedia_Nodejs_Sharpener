const mysql = require('mysql2');
const dbConfig = {
  host: '',
  user: '',
  password: '',
  database: ''
};

class Post {
  constructor(data) {
    this.id = data.id;
    this.description = data.description;
    this.imagePath = data.imagePath;
    this.comments = data.comments || [];
  }

  static async findAll() {
    try {
      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM posts');
      connection.end();
      return rows.map(row => new Post(row));
    } catch (err) {
      throw err;
    }
  }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            const post = new Post(rows[0]);
            const [comments] = await db.query('SELECT * FROM comments WHERE postId = ?', [id]);
            post.comments = comments;
            return post;
        } catch (err) {
            throw err;
        }
    }

    static async create(data) {
        try {
            const [result] = await db.query('INSERT INTO posts SET ?', data);
            const newPost = new Post({ id: result.insertId, ...data });
            return newPost;
        } catch (err) {
            throw err;
        }
    }

    async save() {
        try {
            await db.query('UPDATE posts SET description = ?, imagePath = ? WHERE id = ?', [this.description, this.imagePath, this.id]);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Post;