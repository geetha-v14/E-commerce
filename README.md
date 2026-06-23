# MegaMart - Full Stack MERN E-Commerce Platform

MegaMart is a full-stack e-commerce application built using the MERN stack. It provides a complete online shopping experience with user authentication, product browsing, cart management, and an admin dashboard for managing products, categories, users, and orders.

<img width="1900" height="1791" alt="megamart-ecommerce-website" src="https://github.com/user-attachments/assets/d4e28b2f-b5ba-46e8-8f8b-8693cdeda471" />



## Features

### User Features

* User Registration & Login
* JWT Authentication
* Product Listing
* Product Details Page
* Category & Subcategory Filtering
* Search Products
* Shopping Cart Management
* User Profile Management
* Responsive Design

### Admin Features

* Admin Dashboard
* Product Management 
* Category Management
* User Management
* Order Management
* Role-Based Access Control

### Backend Features

* RESTful API Architecture
* JWT Authorization
* Secure Password Hashing
* Global Error Handling
* Request Validation
* Rate Limiting
* Cloudinary Image Upload Integration




## Tech Stack

### Frontend

* React.js
* React Router DOM
* Redux Toolkit
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Express Validator

### Cloud Services

* MongoDB Atlas
* Cloudinary




## Installation

### Clone Repository

```bash
git clone https:https://github.com/geetha-v14/E-commerce.git
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```



## Environment Variables

### Backend (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:3000

ADMIN_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```



## License

This project is developed for learning, portfolio, and demonstration purposes.
