const express = require('express');
const app = express();
const pool = require("./DB");

//User's Input
app.use(express.json());

//All-Routes

//create a user
app.post("/create_user", async (req, res) => {
    try {
        const{ user_name } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO users (user_name) VALUES ($1) RETURNING *",
            [user_name]
        )
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//create a todo
app.post("/create_todo", async (req, res) => {
    try {
        const { description } = req.body;
        const { title } = req.body;
        const { priority } = req.body;
        const { date } = req.body;
        const { state } = req.body;
        const { user_id } = req.body; //Check
        const newTodo = await pool.query(
            "INSERT INTO todo (description,title,priority,date,state,user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [description, title, priority,date,state,user_id]
        )
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//get a todo
app.get("/todo/:todo_id/:user_id", async (req, res) => {
    const { todo_id } = req.params;
    const { user_id } = req.params;
    try {
        const newTodo = await pool.query(
            "SELECT * FROM todo WHERE todo_id=$1 and user_id=$2", 
            [todo_id,user_id]
        )
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//update a todo
app.put("/update_todo", async (req, res) => {
    const { todo_id } = req.body;
    const { user_id } = req.body;
    const { description } = req.body;
    const { title } = req.body;
    const { priority } = req.body;
    const { date } = req.body;
    const { state } = req.body;
    try {
        if (description != undefined) {
            const newTodo = await pool.query(
                "UPDATE todo SET description = $1 WHERE todo_id = $2 and user_id = $3",
                [description,todo_id,user_id]
            );
        }
        if (title != undefined) {
            const newTodo = await pool.query(
                "UPDATE todo SET title = $1 WHERE todo_id = $2 and user_id = $3",
                [title,todo_id,user_id]
            );
        }
        if (priority != undefined) {
            const newTodo = await pool.query(
                "UPDATE todo SET priority = $1 WHERE todo_id = $2 and user_id = $3",
                [priority,todo_id,user_id]
            );
        }
        if (date != undefined) {
            const newTodo = await pool.query(
                "UPDATE todo SET date = $1 WHERE todo_id = $2 and user_id = $3",
                [date,todo_id,user_id]
            );
        }
        if (state != undefined) {
            const newTodo = await pool.query(
                "UPDATE todo SET state = $1 WHERE todo_id = $2 and user_id = $3",
                [state,todo_id,user_id]
            );
        }
        res.json("UPDATED");
    } catch (error) {
        console.error(error.message);
    }
})

//delete a todo
app.delete("/delete_todo", async (req, res) => {
    const { todo_id } = req.body;
    const { user_id } = req.body;
    try {
        const deleted = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1 and user_id = $2",
            [todo_id,user_id]
        );
        res.json("DELETED");
    } catch (error) {
        console.error(error.message);
    }
})

//search a todo
app.get("/search_todo/:user_id", async (req, res) => {
    const { user_id } = req.params;
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
    temp += " and user_id = ";
    temp += user_id;
    console.log(temp);
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
app.get("/all_todos/:user_id", async (req, res) => {
    const{ user_id } = req.params;
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo WHERE user_id = $1 ORDER BY priority DESC",
            [user_id]
        )
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5000, () => {
    console.log("Server is running on 5000");
})