# BlogApp Backend

A full-stack blog application with JWT authentication, image uploads, and server-side rendering.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Templating:** EJS
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer
- **Password Hashing:** HMAC-SHA256 with random salt

## Features

- User signup & signin with hashed passwords
- JWT-based authentication via cookies
- Create, read blog posts with cover image upload
- Comment on blog posts
- Role-based user model (user/admin)
- Server-side rendered views with EJS

## Project Structure

```
├── app.js                 # Entry point
├── controllers/           # Controller logic
├── middlewares/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── blog.js            # Blog schema
│   ├── comment.js         # Comment schema
│   └── user.js            # User schema with password hashing
├── routes/
│   ├── blog.js            # Blog routes (CRUD, image upload)
│   └── user.js            # User routes (signup, signin, signout)
├── service/
│   └── auth.js            # JWT token creation & verification
├── public/
│   ├── images/            # Static images
│   └── uploads/           # Uploaded blog cover images
└── views/
    ├── home.ejs           # Homepage with all blogs
    ├── addblog.ejs        # Add new blog form
    ├── blog.ejs           # Single blog with comments
    ├── signin.ejs         # Sign in page
    ├── signup.ejs         # Sign up page
    └── partials/          # Reusable EJS partials
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB

### Installation

1. Clone the repository
   ```bash
   git clone <repo-url>
   cd blogappbackend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory
   ```
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/blogapp
   ```

4. Start the server
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

5. Open `http://localhost:8000` in your browser

## API Routes

| Method | Route             | Description          | Auth Required |
|--------|-------------------|----------------------|---------------|
| GET    | `/`               | Home page (all blogs)| Yes           |
| GET    | `/user/signin`    | Sign in page         | No            |
| GET    | `/user/signup`    | Sign up page         | No            |
| POST   | `/user/signin`    | Sign in user         | No            |
| POST   | `/user/signup`    | Register user        | No            |
| GET    | `/user/signout`   | Sign out user        | No            |
| GET    | `/blog/add`       | Add blog form        | Yes           |
| POST   | `/blog/add`       | Create blog post     | Yes           |
| GET    | `/blog/:id`       | View single blog     | Optional      |
| POST   | `/blog/comment/:id` | Add comment        | Yes           |
