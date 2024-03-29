const express = require('express');
const app = express();
const cors = require('cors');
const port = 3003;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

const dbo = require("./db/conn");

app.listen(port, ()=> {
    dbo.connectToServer(function(err){
        if (err) console.error(err);
    });
    console.log(`Server is running on ${port}`);
})