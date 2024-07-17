const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});

// Endpoint to create a user
app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Endpoint to get all users
app.get("/users", (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Endpoint to get a single user by ID
app.get("/getUser/:id", (req, res) => {
    UserModel.findById(req.params.id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Endpoint to update a user by ID
app.put("/updateUser/:id", (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        })
        .catch(err => res.status(400).json({ error: err.message }));
});
app.delete('/deleteUser/:id',(req,res)=>{
   const id = req.params.id;
   UserModel.findByIdAndDelete({_id:id})
   .then(res => res.json(res))
   .catch(err => res.json(err)) 
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
