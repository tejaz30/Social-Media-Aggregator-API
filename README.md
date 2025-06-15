# 📰 Social Media Feed App

A simple **social media-style feed system** built with:

- 🖥️ **Backend**: Node.js, Express, MongoDB, JWT Authentication  
- 🌐 **Frontend**: Plain HTML, JavaScript (no frameworks)  
- 🔒 Auth: Secure login and registration with JWT tokens  
- 💬 Features: Create post, like post, real-time updates (socket.io-ready)  

---

## 📂 Features

- ✅ User Registration and Login (with JWT tokens)  
- ✅ Authenticated Feed View  
- ✅ Create Posts  
- ✅ Like Posts  
- ✅ View All Posts (with author and like count)  
- ✅ Real-time Support (socket.io integrated, optional)  
- ✅ Frontend built with plain HTML + JS  
- ✅ MongoDB for storage with Mongoose  

---

## 🛠️ Project Structure

<pre> ## 📁 Project Structure ``` AI-SOCIAL-AGGREGATOR/ ├── 📁 config │ └── db.js # MongoDB connection ├── 📁 controllers │ ├── authController.js # Auth-related logic │ └── postController.js # Post creation and feed logic ├── 📁 frontend │ ├── feed.html # User feed (post/like UI) │ └── index.html # Login / Register page ├── 📁 middleware │ └── authMiddleware.js # JWT auth protection middleware ├── 📁 models │ ├── Post.js # Post schema │ └── User.js # User schema ├── 📁 routes │ ├── auth.js # /api/auth routes │ └── post.js # /api/posts routes ├── .env # Environment variables ├── client.html # (Possibly unused) Client file ├── token.txt # Temporary token storage (dev-only) ├── server.js # Entry point / backend server ├── README.md # Project documentation ├── package.json # Node dependencies and scripts └── package-lock.json # Dependency lock file ``` </pre>
---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/social-feed-app.git
cd social-feed-app
```
2. Install backend dependencies

```bash
cd backend
npm install
```
3. Configure .env
Create a .env file in the backend/ directory:
```bash
ini
PORT=5000
MONGO_URI= mongodb+srv://admin:admin123@cluster0.uj7fxal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=supersecretkey
```


4. Start the Server
```bash
node server.js
Backend runs at: http://localhost:5000
```

5. Open Frontend
In a separate terminal or file browser:

```bash
cd frontend
open index.html  # or just double-click it
```
---
🔐 Authentication
JWT token is stored in localStorage after login.

Protected routes require Authorization: Bearer <token> header.

---

🧪 API Endpoints
Auth
Method	Route	Description
POST	/api/users/register	Register new user
POST	/api/users/login	Login & get token

---
Posts
Method	Route	Description
GET	/api/posts	Get all posts
GET	/api/posts/feed	Posts with metadata
GET	/api/posts/user/:id	Posts by user
POST	/api/posts	Create post (auth)
POST	/api/posts/like/:id	Like post (auth)

---

💻 Frontend Summary
index.html: Register/Login page

feed.html: Create, view, and like posts

---

📡 Real-Time Support
Backend emits:

new_post — on post creation

post_liked — on like

Use Socket.io on frontend to listen for updates.

---

🔧 Future Work
Add React or other frontend framework

Allow deleting or editing posts

Add like buttons directly next to each post

Improve design (Tailwind or Bootstrap)

---

🧑‍💻 Author
Your Teja Bulusu
GitHub: @tejaz30

