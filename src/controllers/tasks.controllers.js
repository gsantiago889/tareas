const pool = require('../db.js')

const index = (req, res) =>{
    res.json({message: "BIENVENIDOS PAGINA DE INICIO"})
}


const createTasks = async (req, res)=>{
    const { titulo, descripcion } = req.body;

 try{
    const result = await pool.query("INSERT INTO task (titulo, descripcion) VALUES ($1, $2) RETURNING *", [titulo, descripcion])
    res.json(result.rows[0])
}catch(error){
    res.json({error: error.message});
}
    
}


const returnAllTasks = async (req, res)=>{

    try{
        const tareas = await pool.query("SELECT * FROM task");
        res.json(tareas.rows)
    }catch(error){
     res.json({error: error.message}); 
    }

}

const returnOneTask = async (req, res)=>{
    const { id } = req.params
    try{
        const tareas = await pool.query("SELECT * FROM task WHERE id = $1", [id]);
        if(tareas.rows.length === 0) return res.status(404).json({message: "task not found",})
        res.json(tareas.rows)
    }catch(error){
     res.json({error: error.message}); 
    }

}

const updateTasks = async (req, res)=>{
    const { id } = req.params
    const { titulo, descripcion } = req.body
    try{
        const tareas = await pool.query("UDATE FROM task VALUES ($2, $3)  WHERE id = $1", [id, titulo, descripcion]);
        if(tareas.rowCount === 0) return res.status(404).json({message: "tarea not found"})
        return res.sendStatus(204)
    }catch(error){
     res.json({error: error.message}); 
    }
}

const deleteTasks = async (req, res)=>{
    const { id } = req.params
    try{
        const tareas = await pool.query("DELETE FROM task WHERE id = $1 RETURNING *", [id]);
        if(tareas.rowCount === 0) return res.status(404).json({message: "tarea not found"})
        return res.sendStatus(204)
    }catch(error){
     res.json({error: error.message}); 
    }
}

module.exports = {
    createTasks,
    returnAllTasks,
    updateTasks,
    deleteTasks,
    returnOneTask,
    index
}