import express from "express";
import mysql from "mysql";

const app = express();
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "cred"
});

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.get('/books', (req, res) => {
    const sqlSelect = "SELECT * FROM books";
    db.query(sqlSelect, (err, result) => {
        if (err) console.log(err);
        return res.json(result);
    })
})


app.post("/books", (req, res) => {
    const q = "INSERT INTO books(`title`, `descl`,  `cover`) VALUES (?)";

    const values = [
        req.body.title,
        req.body.descl,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});



app.listen(8800, () => console.log("Server is running on port 8800"));