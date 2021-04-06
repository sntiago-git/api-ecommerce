const app = require("./server"); //server
require("./database"); //db

app.listen(3000, ()=>{
    console.log("server running on port", app.get("port"))
})