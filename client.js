const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector('.container');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageElement.innerHTML= message;

}

const  names = prompt("Enter your name to join"); 
append("Welcome to we chat app",'right');
socket.emit('new-user-joined',names); 
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left');

});

socket.on('receive',data=>{
   append(`${data.name}:${data.message}`,'left');
});

socket.on('left',data=>{
    append(`${data.name} left the chat`,'left');
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = "";
})