const express = require('express');
const { resolve } = require('path');
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config();
const URL=process.env.URL
const connection=mongoose.connect(URL)
const menu=require('./models/menu')

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.put("/menu/:id",async(req,res)=>{
  try{
    const id=req.params.id;
    const { name, description, price } = req.body; 
    const found=await menu.findByIdAndUpdate(id,{name, description,price},{new:true})
    if(found){
      res.status(200).json({message: "Succesfully updated"})
    }
    else{
      res.status(404).json({message:"Not found"})
    }

  }catch(err){
    res.status(500).send(err)
  }
})

app.delete("/menu/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMenuItem = await menu.findByIdAndDelete(id);

    if (deletedMenuItem) {
      res.status(200).json({ message: "Successfully deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }

  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, async() => {
  try{
    await connection
    console.log("connected")
  }catch(err){
    console.log("Error",err)
  }
  console.log(`Example app listening at http://localhost:${port}`);
});
