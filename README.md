<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ChatGPT-4 Coding Assistant</title>
  <link
    href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.3/dist/tailwind.min.css"
    rel="stylesheet"
  />
  <style>
    body {
      background-color: #f7fafc;
      font-family: 'Inter', sans-serif;
    }

    #chatbox {
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      padding: 16px;
      backdrop-filter: blur(5px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .natural-button {
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }

    .natural-button:hover {
      background-color: #45a049;
    }

    .natural-input {
      background-color: rgba(255, 255, 255, 0.9);
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 8px;
      width: 100%;
      transition: border-color 0.3s ease;
    }

    .natural-input:focus {
      border-color: #4CAF50;
      outline: none;
    }

    .copy-button {
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 4px 8px;
      font-size: 12px;
      margin-left: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .copy-button:hover {
      background-color: #45a049;
    }

    .code-block {
      background-color: #1e1e1e;
      color: #d4d4d4;
      padding: 12px;
      border-radius: 4px;
      font-family: 'Courier New', Courier, monospace;
      overflow-x: auto;
      white-space: pre-wrap;
    }
  </style>
</head>
<body class="flex flex-col min-h-screen">
  <div class="flex-grow container mx-auto py-6 px-4">
    <div class="h-full w-full max-w-2xl mx-auto">
      <div id="chatbox" class="flex flex-col items-start overflow-y-auto h-full p-4 rounded"></div>
    </div>
  </div>
  <div class="sticky bottom-0 w-full">
    <div class="flex justify-center">
      <div class="px-2 w-full max-w-2xl">
        <div class="flex flex-col my-5">
          <div class="flex items-center mb-2">
            <label class="mr-2">Chat Mode:</label>
            <select id="chatMode" class="natural-input p-1">
              <option value="regular">Regular Chat</option>
              <option value="coding">Coding Mode</option>
            </select>
          </div>
          <input
            class="natural-input shadow flex-grow rounded p-2 mb-2"
            id="messageInput"
            type="text"
            placeholder="Type your message or code question"
          />
          <div class="flex justify-between space-x-2">
            <button
              class="natural-button bg-red-500 hover:bg-red-600"
              id="clearButton"
            >
              Clear Chat
            </button>
            <button
              class="natural-button bg-green-500 hover:bg-green-600"
              id="sendButton"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script>
    const chatbox = document.getElementById("chatbox");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");
    const clearButton = document.getElementById("clearButton");
    const chatMode = document.getElementById("chatMode");
    const chatId = crypto.randomUUID();
    let websocket = null;
    let receiving = false;

    const systemPrompt = "You are a helpful assistant.";
    const codingPrompt = "You are a coding assistant. Provide concise and accurate code solutions or explanations.";

    function createMessageElement(text, alignment, isCode = false) {
      const messageContainer = document.createElement("div");
      messageContainer.className = `w-full my-2.5 flex ${
        alignment === "left" ? "justify-start" : "justify-end"
      }`;

      const messageElement = document.createElement("div");
      messageElement.className = `inline-block p-2.5 rounded border ${
        alignment === "left" ? "bg-white" : "bg-green-100"
      }`;
      if (isCode) {
        const codeBlock = document.createElement("pre");
        codeBlock.className = "code-block";
        codeBlock.textContent = text;
        messageElement.appendChild(codeBlock);
      } else {
        messageElement.textContent = text;
      }

      const copyButton = document.createElement("button");
      copyButton.className = "copy-button";
      copyButton.textContent = "Copy";
      copyButton.onclick = () => {
        navigator.clipboard.writeText(text).then(() => {
          copyButton.textContent = "Copied!";
          setTimeout(() => (copyButton.textContent = "Copy"), 2000);
        });
      };

      messageContainer.appendChild(messageElement);
      messageContainer.appendChild(copyButton);
      return messageContainer;
    }

    function connectWebSocket(message, initChat) {
      receiving = true;
      sendButton.textContent = "Cancel";
      const url = "wss://backend.buildpicoapps.com/api/chatbot/chat";
      websocket = new WebSocket(url);

      websocket.addEventListener("open", () => {
        websocket.send(
          JSON.stringify({
            chatId: chatId,
            appId: "wide-dog",
            systemPrompt: chatMode.value === "coding" ? codingPrompt : systemPrompt,
            message: initChat ? "Welcome! How can I assist you today?" : message,
          })
        );
      });

      const messageElement = createMessageElement("", "left");
      chatbox.appendChild(messageElement);

      websocket.onmessage = (event) => {
        const response = event.data;
        const isCode = response.includes("```");
        messageElement.querySelector("div").textContent += response;
        if (isCode) {
          messageElement.querySelector("div").className = "code-block";
        }
        chatbox.scrollTop = chatbox.scrollHeight;
      };

      websocket.onclose = (event) => {
        if (event.code === 1000) {
          receiving = false;
          sendButton.textContent = "Send";
        } else {
          messageElement.querySelector("div").textContent += "Error getting response from server. Refresh the page and try again.";
          chatbox.scrollTop = chatbox.scrollHeight;
          receiving = false;
          sendButton.textContent = "Send";
        }
      };
    }

    function createWelcomeMessage() {
      connectWebSocket("", true);
    }

    sendButton.addEventListener("click", () => {
      if (!receiving && messageInput.value.trim() !== "") {
        const messageText = messageInput.value.trim();
        messageInput.value = "";
        const messageElement = createMessageElement(messageText, "right");
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;

        connectWebSocket(messageText, false);
      } else if (receiving && websocket) {
        websocket.close(1000);
        receiving = false;
        sendButton.textContent = "Send";
      }
    });

    messageInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !receiving && messageInput.value.trim() !== "") {
        event.preventDefault();
        sendButton.click();
      }
    });

    clearButton.addEventListener("click", () => {
      chatbox.innerHTML = "";
    });

    chatMode.addEventListener("change", () => {
      chatbox.innerHTML = "";
      createWelcomeMessage();
    });

    createWelcomeMessage();
  </script>
</body>
</html>
