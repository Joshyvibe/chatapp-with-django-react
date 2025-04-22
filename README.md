# Real-Time Chat System Built with Django and React

This repository contains all the resources needed to build a robust, real-time chat system using **Django** for the backend and **React** for the frontend. 
The system supports real-time messaging, online status indicators, typing indicators, and user authentication.

This repository is featured in a video tutorial available on my YouTube channel, 'Joshyvibe'
[Visit my YouTube Channel to watch video](https://youtu.be/fXwaejZiwEQ)

---

## Key Features

### Backend:
1. **WebSocket Integration**: Utilizes Django Channels to support WebSocket connections for real-time messaging.
2. **Redis**: Acts as the message broker to enable WebSocket functionality and handle asynchronous events.
3. **Daphne**: A production-ready ASGI server used to serve WebSocket and HTTP traffic.
4. **Message Persistence**: Messages are stored in a PostgreSQL or SQLite database using Django ORM.
5. **Authentication**: Supports token-based authentication for secure communication.
6. **Online and Typing Indicators**: Real-time updates for online users and typing notifications.
7. **Role-based Access**: Ensures users can only access conversations they are part of.

### Frontend:
1. **Real-Time Updates**: Leverages WebSocket to provide instant message delivery.
2. **User Interface**: Built using React with a clean and responsive design.
3. **Online Status Display**: Shows a list of online users in the conversation.
4. **Typing Indicators**: Displays when another user is typing in the conversation.
5. **Authentication and Authorization**: Uses JWT for managing user sessions.
6. **Error Handling**: Graceful handling of network and server errors.

---

## What You Need to Know About WebSocket
WebSocket provides a persistent connection between the client and server, enabling bi-directional communication without waiting for a server response like HTTP. This is crucial for achieving real-time functionality. 

To set up WebSocket in Django:
1. Install the Django Channels library:
   ```bash
   pip install channels_redis
   pip install daphne 
   ```
2. Update your `settings.py` to configure Channels and Redis:
   ```python
   INSTALLED_APPS = [
       ...
       'channels',
   ]

   ASGI_APPLICATION = "chatsystemproj.asgi.application"

   CHANNEL_LAYERS = {
       "default": {
           "BACKEND": "channels_redis.core.RedisChannelLayer",
           "CONFIG": {
               "hosts": [("127.0.0.1", 6379)],
           },
       },
   }
   ```
3. Ensure you have a running Redis server:
   ```bash
   sudo apt install redis-server
   sudo service redis-server start
   redis-cli ping  # Should return PONG
   ```

---

## Project Structure

### Backend:
- **`chatapp/`**: Contains the core logic for managing conversations and messages.
- **`chatsystemproj/`**: The Django project folder, including settings and ASGI configuration.
- **`asgi.py`**: Configures the ASGI application to handle WebSocket connections.
- **`consumers.py`**: Implements WebSocket consumers for handling real-time communication.

### Frontend:
- **React Components**:
  - `Conversation.jsx`: Manages real-time chat UI and WebSocket communication.
  - `Login.jsx` and `Register.jsx`: Handles user authentication.
  - `ChatList.jsx`: Displays the list of conversations.
- **CSS Styles**: Custom styles for a responsive and user-friendly interface.

---

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- Redis
- PostgreSQL (or SQLite for local development)

### Backend Setup
1. **Create a Virtual Environment**:  
   ```bash
   python -m venv env
   ```
2. **Activate the Virtual Environment**:
   - On Windows:  
     ```bash
     .\env\Scripts\activate
     ```
   - On macOS/Linux:  
     ```bash
     source env/bin/activate
     ```
3. **Navigate to the Backend Directory**:  
   ```bash
   cd chatsystemproj
   ```
4. **Install Dependencies**:  
   ```bash
   pip install -r requirements.txt
   ```
5. **Run Migrations**:  
   ```bash
   python manage.py migrate
   ```
6. **Run the Development Server**:  
   ```bash
   python manage.py runserver
   ```
7. **Run Daphne** (for WebSocket support):  
   ```bash
   daphne -b 0.0.0.0 -p 8000 chatsystemproj.asgi:application
   ```

### Frontend Setup
1. **Navigate to the Frontend Directory**:  
   ```bash
   cd frontend
   ```
2. **Install Dependencies**:  
   ```bash
   npm install
   ```
3. **Start the Development Server**:  
   ```bash
   npm run dev
   ```

---

## Key Components
### Backend:
- **WebSocket Consumers**:
  Handles incoming and outgoing WebSocket messages, including:
  - Message broadcasting.
  - Typing notifications.
  - Online user status updates.

- **REST API**:
  Provides endpoints for:
  - Fetching conversation messages.
  - Creating new messages.
  - Managing user authentication.

### Frontend:
- **WebSocket Client**:
  - Connects to the backend WebSocket server.
  - Sends and receives real-time events (messages, typing indicators).

- **Message List**:
  Displays messages with a distinction between sent and received messages.

- **Typing Indicator**:
  Displays the name of the user typing in the chat.

---

## Additional Feature to Explore
- **Message Deletion**: Enable users to delete messages from conversations.


---

## Screenshots
<img width="297" alt="chatinterface" src="https://github.com/user-attachments/assets/e2ef26df-022b-4f53-be9c-2a3aa7254b06" />
<img width="220" alt="conversation list ui" src="https://github.com/user-attachments/assets/2c89f72c-ac94-4523-8b5c-d220e3ef6a17" />
<img width="353" alt="authpage" src="https://github.com/user-attachments/assets/9bf196c0-fa12-4ccc-b4c4-632ce3bffd5f" />

---

## License
This project is licensed under the MIT License.

--- 


Feel free to clone, modify, and use this project as needed! 😊

---




