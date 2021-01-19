const express = require('express');
const app = express();
const pool = require("./DB");

//User's Input
app.use(express.json());

//Routes

//create a todo
app.post("/create_todo", async (req, res) => {
    try {
        const { description } = req.body;
        const { title } = req.body;
        const { priority } = req.body;
        const { date } = req.body;
        const { state } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description,title,priority,date,state) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            [description, title, priority,date,state]
        )
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//get a todo
app.get("/todo/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const newTodo = await pool.query(
            "SELECT * FROM todo WHERE todo_id=$1", [id]
        )
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//update a todo
app.put("/update_todo/:id", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const { title } = req.body;
    const { priority } = req.body;
    const { date } = req.body;
    const { state } = req.body;
    try {
        if (description != undefined) {
            const newTodo = await pool.query(
                "UPDATE todo SET description = $1 WHERE todo_id = $2",
                [description, id]
            );
        }
        if (title != undefined) {
            const newTodo = await pool.query(
                "UPDATE todo SET title = $1 WHERE todo_id = $2",
                [title, id]
            );
        }
        if (priority != undefined) {
            const newTodo = await pool.query(
                "UPDATE todo SET priority = $1 WHERE todo_id = $2",
                [priority, id]
            );
        }
        if (date != undefined) {
            const newTodo = await pool.query(
                "UPDATE todo SET date = $1 WHERE todo_id = $2",
                [date, id]
            );
        }
        if (state != undefined) {
            const newTodo = await pool.query(
                "UPDATE todo SET state = $1 WHERE todo_id = $2",
                [state, id]
            );
        }
        res.json("UPDATED");
    } catch (error) {
        console.error(error.message);
    }
})

//delete a todo
app.delete("/delete_todo/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("DELETED");
    } catch (error) {
        console.error(error.message);
    }
})

//search a todo
app.get("/search_todo", async (req, res) => {
    const { title } = req.body;
    const { priority } = req.body;
    const { state } = req.body;
    const { date } = req.body;
    var temp = "";
    if (title != undefined) {
        temp += "title = '";
        temp += title;
        temp += "'";
    }
    if (priority != undefined) {
        if (temp != "") {
            temp += " and ";
        }
        temp += "priority = ";
        temp += priority;
        temp += "";
    }
    if (date != undefined) {
        if (temp != "") {
            temp += " and ";
        }
        temp += "date = ";
        temp += date;
        temp += "";
    }
    if (state != undefined) {
        if (temp != "") {
            temp += " and ";
        }
        temp += "state = ";
        temp += state;
        temp += "";
    }
    try {
        const newTodo = await pool.query(
            "SELECT * FROM todo WHERE " + temp
        )
        res.json(newTodo.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//fetch all todos
app.get("/all_todos", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        )
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//prioritize todos
app.get("/prioritize_todos", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo "
        )
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5000, () => {
    console.log("Server is running on 5000");
})