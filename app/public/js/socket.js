const socket = io();

const url = new URL(window.location.href);
const params = url.searchParams;

const urlRoomId = parseInt(params.get('roomId'));
const urlName = params.get('name');

let target = document.getElementById("msglist");
target.scrollTo(0, target.scrollHeight);

socket.on("connect", () => {
  socket.emit("join",  { roomId: urlRoomId, name: urlName });
});

document.getElementById("frm-post").addEventListener("submit", function(e)
{
  e.preventDefault();

  const msg = document.getElementById("msg");
  if (msg.value === "" || msg.value == "\n") 
  {
    return false;
  }
  socket.emit("post", msg.value, urlName);

  msg.value = "";
});

socket.on("showrows",function(rows)
{
  var html = "";
  const list = document.getElementById("msglist");

  for(var i = 0; i < rows.length; i++)
  {
    var li = document.createElement("li");
    li.innerHTML = rows[i].name + "\n" + " " + rows[i].message;
    li.classList.add('child');
    list.appendChild(li, list.firstChild);
  }

  list.scrollTo(0, list.scrollHeight);
});

socket.on("message", function(text, name)
{
  const list = document.getElementById("msglist");
  var li = document.createElement("li");
  li.innerHTML = name + "\n" + " " + text;
  li.classList.add('child');
  list.appendChild(li, list.firstChild);
  list.scrollTo(0, list.scrollHeight);
});

function addCss() {
  document.getElementById("lists").classList.add("listyle");
}

window.addEventListener('load', () => {
  msg.focus();
});
