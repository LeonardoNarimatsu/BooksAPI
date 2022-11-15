// app.post("/book", async (req, res) => {
//     const { title, author, publishedAt } = req.body;
//     const [queryEditora] = await conn.execute("insert into editora (nome, endereco, cnpj) values (?, ?, ?);", [
//         title, author, publishedAt
//     ]);
//     const editora = queryEditora.insertId;
//     const [queryBooks] = await conn.execute("insert into book (title, author, publishedAt, editoraId) values (?, ?, ?, ?);", [
//         title, author, publishedAt, editora
//     ]);
//     return res.status(201).json({
//         ...req.body,
//         id: queryBooks.insertId
//     });        
// });