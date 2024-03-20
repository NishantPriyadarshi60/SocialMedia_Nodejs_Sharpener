const mysql = require('mysql2');

const dbConfig = {
    host: '',
    user: '',
    password: '',
    database: ''
};

class Comment {
    constructor(data) {
        this.id = data.id;
        this.postId = data.postId;
        this.comment = data.comment;
    }

    static async create(data) {
        try {
            const connection = await mysql.createConnection(dbConfig);
            const [result] = await connection.execute('INSERT INTO comments SET ?', [data]);
            connection.end();
            const newComment = new Comment({ id: result.insertId, ...data });
            return newComment;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Comment;
