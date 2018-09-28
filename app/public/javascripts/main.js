var socket = io();
var message = document.querySelector('#message-text'); 

var msgObjt = {user: "", message: "", img: ""};

var userName= "Anonymous-User";

if(document.querySelector("#logout")) {
    msgObjt.user = document.querySelector("#userName").innerText;
    msgObjt.img = document.querySelector("#image").getAttribute("src");
    console.log(msgObjt); 
} else {
    msgObjt.user = userName;
    msgObjt.img = "/images/user-anon.png"
    console.log(msgObjt)
};

socket.on('new-connection', function(msgObjt) { 
    // { id: socket.id, messages: messages}
    console.log(`No se que sale aqui ${msgObjt}`);
    msgObjt.messages.forEach(element => {
    let li = document.createElement("li");
    let img = document.createElement('img');
    li.setAttribute("class", "list-group-item");
    li.innerHTML = `<img src=${element.img} alt="Photo" height="20" width="20"> <b>${element.user}</b>: ${element.message}`; 
   document.querySelector('ul.list-group').appendChild(li);
    });
});

socket.on('chat-message', function(msgObjt){
    let li = document.createElement("li");
    let img = document.createElement('img');
    li.setAttribute("class", "list-group-item");
    li.innerHTML = `<img src=${msgObjt.img} alt="Photo" height="20" width="20"> <b>${msgObjt.user}</b>: ${msgObjt.message}`; 
    console.log(msgObjt);
   document.querySelector('ul.list-group').appendChild(li);
  });

document.querySelector("#send-msg").addEventListener("click", function(e) {
    msgObjt.message = message.value;
    console.log(`Emit: ${msgObjt.user}, ${msgObjt.message}`);
    socket.emit('chat-message', msgObjt);
    e.preventDefault();
});

