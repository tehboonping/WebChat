const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var mysql = require("mysql2");
var connection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'pass',
    database: 'textdata'
});


//MYSQLに接続
connection.connect(function(err)
{
    if(err)
    {
        console.error("ConnectError", err);
    }
});

let store = {};

app.use(express.static('public'));

app.get("/", function(req, res)
{
  res.sendFile(__dirname + "/index.html");
});

app.get("/chat", function(req, res)
{
  res.sendFile(__dirname + "/public/chat.html");
});

io.on("connection", function(socket)
{
  socket.on("join", function(msg)
  {
    //データベースのテーブル「data」からメッセージデータを抽出
    connection.query('SELECT * FROM data',function(err, rows){
        if(err)
        {
          console.error(err);
        }
        //console.log(rows);
        socket.emit("showrows", rows);
    });

    usrobj = {
      'room': msg.roomId,
      'name': msg.name
    }
    store = usrobj;
    socket.join(msg.roomId);
  })

  socket.on("post", function(text, name)
  {
    io.to(store.room).emit("message", text, name);

    //データベースのテーブル「data」にメッセージデータを保存
    connection.query('INSERT INTO data SET name = ?, message = ?',[name, text],function(err)
    {
        if(err)
        {
            console.error("SaveError", err);
        }
    });
  });

});

http.listen(8085, () => {
    console.log("success listen 8085");
})