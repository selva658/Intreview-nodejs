const app = require("./server")

const connect = require("./configs/db")

let port = process.env.PORT;
if (port == null || port == "") {
    port=5000
}

console.log(port)
app.listen(port, async () => {
    await connect()
    console.log("listening on server ");

})