import Todo from "../models/Todo.js";

export const getTodo = async (req,res) => {
    const todos = await Todo.find();
    res.json(todos);
};

export const postTodo = async(res, req) => {
    const todo = new Todo({text: req.body.text});
    await todo.save();
    res.status(201).json(todo);
}

export const putTodo = async(res, req) => {
    try {
        const {id} = req.params;
        const {completed} = req.body;
        if(typeof completed === "undefined") {
            return res.status(400).json({message: "Message completed field"});
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            {completed},
            {new: true}
        );

        if(!updatedTodo) {
            return res.status(404).json({message: "Todo not found"});
        }
        req.json(updatedTodo);
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({message: "Updation failed", error: error.message});
    }
};

export const deleteTodo = async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if(!todo) return res.status(404).json({message: "Todo not found"});
    res.json({message: "Todo deleted", id: req.params.id});
}