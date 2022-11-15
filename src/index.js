const express = require("express");
const mysql2 = require("mysql2/promise");

let book = [];

// CRIAR O APP
const app = express();

const connectDb = async () => {
    const connection = await mysql2.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '2036205',
        database : 'livros'
    });
    console.log("Conectou no MySQL!");
    return connection;
} 

connectDb().then((conn) => {
    app.use(express.json());
    
    app.post("/book", async (req, res) => {
        const { title, author, publishedAt } = req.body;
        const [query] = await conn.execute("insert into book (title, author, publishedAt) values (?, ?, ?);", [
            title, author, publishedAt
        ]);
        return res.status(201).json({
            ...req.body,
            id: query.insertId
        });        
    });
    
    app.get('/book', async (req, res) => {
        const [books] = await conn.execute("select * from book");
        return res.status(200).json(books);
    })
    
    app.get("/book/:book_id", async (req, res) => {
        const { book_id } = req.params;
        const [books] = await conn.execute("select * from book where id = ?;", [book_id]);
        const book = books[0];
        if (!book) res.status(404).json("not found");
        return res.status(200).json(book);
    })
    
    app.delete("/book/:book_id", async (req, res) => {
        const { book_id } = req.params;
        await conn.execute("delete from book where id = ?;", [book_id]);
        return res.status(204).json({ result: "deleted" });
    });
    
    app.patch("/book/:book_id", async (req, res) => {
        const { author, title, publishedAt} = req.body;
        const { book_id} = req.params;
        await conn.execute("update book set title = ?, author= ?, publishedAt= ? where id = ?;", [
            title, author, publishedAt, book_id
        ]);   
    
        return res.status(201).json({
            ...req.body,
            id: Number(book_id)            
        });
    })
    
    // MANDAR O SERVIDOR RODAR
    app.listen(3333, () => console.log('server is running'));
});

