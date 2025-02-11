const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
    return `
      <div class="mine messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${formattedTime}
        </div>
      </div>
    `;
  } else {
    return `
      <div class="yours messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${message.sender} ${formattedTime}
        </div>
      </div>
    `;
  }
}

async function fetchMessages() {
  console.log("Fetching messages..."); 
  const response = await fetch(serverURL);
  const messages = await response.json();
  console.log("Fetched messages:", messages);
  return messages;
}

async function updateMessages() {
  console.log("Updating messages..."); 
  const messages = await fetchMessages();
  let formattedMessages = "";
  messages.forEach(message => {
    formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
  console.log("Messages updated on screen."); 
}

updateMessages();

sendButton.addEventListener("click", function(event) {
  event.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;
  console.log("Send button clicked");
  console.log("Sender:", sender); 
  console.log("Message:", message);
  sendMessages(sender, message);
  myMessage.value = "";

  
  updateMessages();
});

const serverURL = `https://it3049c-chat.fly.dev/messages`;

function sendMessages(username, text) {
  const newMessage = {
    sender: username,
    text: text,
    timestamp: new Date()
  };

  console.log("Sending message:", newMessage); 

  fetch(serverURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMessage)
  }).then(response => {
    console.log("Message sent successfully"); 
    console.log(response); 
    
    updateMessages();
  }).catch(error => {
    console.error("Error sending message:", error); 
  });
}
