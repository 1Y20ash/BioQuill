# 🌱 BioQuill

**BioQuill** is a full-stack eco-friendly pen store built to demonstrate a simple online shopping experience with a separate frontend and backend. The project focuses on sustainable products, user authentication, product management, and a browser-based shopping cart.

## ✨ Features

- 🌿 Eco-friendly pen storefront
- 🛍️ Dynamic product listing from the backend
- 👤 User signup and login
- 🔐 Password hashing with **bcrypt**
- 🛒 Local browser-based shopping cart
- ➕ Increase/decrease product quantity
- 🗑️ Remove items from cart
- 💰 Automatic cart total calculation
- ✅ Checkout and order-success flow
- 👨‍💼 Admin/product management page
- 📱 Simple responsive frontend styling
- 🌐 REST API built with Express.js
- 🗄️ MySQL database integration
- 🔗 CORS-enabled frontend/backend communication

## 🏗️ Project Structure

```text
BioQuill/
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
└── frontend/
    ├── index.html
    ├── admin.html
    ├── cart.html
    ├── cart.js
    ├── login.html
    ├── signup.html
    ├── order-success.html
    ├── script.js
    └── style.css
```

## 🧰 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Font Awesome
- Browser `localStorage` for user/cart state

### Backend
- Node.js
- Express.js
- MySQL2
- bcrypt
- CORS
- Express JSON middleware

### Database

The backend uses MySQL with tables for application data, including:

- `Users` — stores registered user accounts and hashed passwords
- `Products` — stores product information such as name, price, stock, and description

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check whether the backend is running |
| GET | `/products` | Retrieve available products |
| POST | `/products` | Add a new product |
| POST | `/signup` | Register a new user |
| POST | `/login` | Authenticate a user |

## 🔄 How It Works

```text
                 ┌──────────────────┐
                 │   BioQuill UI    │
                 │ HTML/CSS/JS      │
                 └────────┬─────────┘
                          │
                    HTTP / REST API
                          │
                          ▼
                 ┌──────────────────┐
                 │ Express.js       │
                 │ Node.js Backend  │
                 └────────┬─────────┘
                          │
                       MySQL2
                          │
                          ▼
                 ┌──────────────────┐
                 │  MySQL Database  │
                 │ Users / Products │
                 └──────────────────┘
```

### Shopping flow

1. The home page requests products from the `/products` API.
2. Products are displayed as cards with pricing and descriptions.
3. A logged-in user can add products to the cart.
4. Cart information is maintained in browser `localStorage`.
5. Users can update quantities or remove products.
6. Checkout clears the cart and opens the order-success page.

### Authentication flow

1. A new user submits the signup form.
2. The backend hashes the password with bcrypt before storing it.
3. During login, the backend retrieves the user by email.
4. bcrypt compares the submitted password with the stored hash.
5. Successful authentication returns basic user information to the frontend.
6. The frontend stores the returned user object in `localStorage`.

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/1Y20ash/BioQuill.git
cd BioQuill
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure MySQL

Create a MySQL database and the required `Users` and `Products` tables. Then configure the database connection in the backend before starting the server.

> **Security:** Never commit database passwords, API keys, or other credentials to GitHub. Use environment variables such as `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `DB_PORT` for a production-ready configuration.

### 4. Start the backend

```bash
node server.js
```

The server uses the `PORT` environment variable when available and otherwise listens on port `3000`.

### 5. Open the frontend

Serve the `frontend` directory with a local web server. For example, with VS Code, use **Live Server** and open `frontend/index.html`.

> The current frontend contains the deployed backend URL in its JavaScript/HTML files. When running the backend locally, update those API URLs to point to your local server, for example `http://localhost:3000`.

## 🌐 Deployment

The project is structured as two parts:

- **Frontend:** static HTML/CSS/JavaScript application
- **Backend:** Node.js + Express API

The current codebase references a deployed Render backend for API requests. Deployment platforms can be changed as needed as long as the frontend API URL and CORS configuration are updated consistently.

## 🔒 Security Notes

BioQuill includes basic authentication practices such as bcrypt password hashing and parameterized MySQL queries.

For production use, the project should additionally:

- Store database credentials in environment variables.
- Use HTTPS for all application traffic.
- Avoid storing authentication state solely in `localStorage` for sensitive production applications.
- Add server-side authorization for admin operations.
- Validate and sanitize all incoming data.
- Add proper session/JWT management if persistent authentication is required.
- Use secure database permissions and connection settings.

## 📸 Project Highlights

BioQuill demonstrates practical full-stack concepts including:

- Frontend/backend separation
- REST API integration
- CRUD-style product management
- MySQL database connectivity
- Password hashing
- Authentication
- Client-side cart management
- CORS configuration
- Deployment of a web application

## 👨‍💻 Author

**Yash Chitmalwar**

Computer Science & Engineering (AIML) Student

GitHub: [1Y20ash](https://github.com/1Y20ash)

## 📄 License

This project is currently provided for educational and project-development purposes. No specific open-source license has been declared in the repository yet.
