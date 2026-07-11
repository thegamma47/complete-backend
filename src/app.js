const express = require('express')
const noteModel = require("./models/note.model")

const app = express();
app.use(express.json());

// const notes = [];

// app.post("/notes",(req,res)=>{
//     notes.push(req.body)

//     res.status(201).json({message:"notes created successfully"})
// });

// app.get("/notes",(req,res) =>{

//     res.status(200).json({
//         notes:notes
//     })
// });

// app.delete("/notes/:index",(req,res) =>{

//     const index = req.params.index

//     delete notes [index]

//     res.status(200).json({
//         message:"note deleted successfully"
//     })
// });

// app.patch("/notes/:index",(req,res) =>{

//     const index = req.params.index
//     const descreption = req.body.descreption

//     notes[ index ].descreption = descreption

//     res.status(200).json({
//         message:"notes updated successfully"
//     })

// }); 

app.post("/notes", async(req,res) =>{
    
    const data = req.body /* {tittle,descreption} */

    await noteModel.create({
        tittle:data.tittle,
        descreption:data.descreption
    })

    res.status(201).json({
        message:"note created"
    })
})

app.get("/notes", async(req,res) =>{
       
    const notes = await noteModel.find({

        tittle:"test_tittle"

    }) //Find always returns []

    res.status(200).json({
        message:"notes fetched successfully",
        notes:notes
    })
     
})

module.exports=app;