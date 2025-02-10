# DevOps Backend API

A RESTful API for user authentication and account management built with Node.js, Express, and MySQL.

## Features

- User authentication (register, login, logout)
- JWT token-based authorization
- Account management with CRUD operations
- Role-based access control (admin and user roles)
- MySQL database with Sequelize ORM

## Prerequisites

- Node.js
- MySQL
- npm

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:

   ```env
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

3. Run migrations:

   ```bash
   sequelize db:migrate
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json
{
    "email": "string",
    "password": "string"
}
```

#### Logout

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### Account Management Endpoints

#### Create Account

```http
POST /api/accounts
Authorization: Bearer <token>
Content-Type: application/json
{
    "firstName": "string",
    "lastName": "string",
    "address": "string",
    "phoneNumber": "string",
    "team": "string",
    "role": "string"
}
```

#### Get All Accounts

```http
GET /api/accounts
Authorization: Bearer <token>
```

#### Get Single Account

```http
GET /api/accounts/:id
Authorization: Bearer <token>
```

#### Update Account

```http
PUT /api/accounts/:id
Authorization: Bearer <token>
Content-Type: application/json
{
    "firstName": "string",
    "lastName": "string",
    "address": "string",
    "phoneNumber": "string",
    "team": "string",
    "role": "string"
}
```

#### Delete Account

```http
DELETE /api/accounts/:id
Authorization: Bearer <token>
```

### Task Management Endpoints

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
    "title": "string",
    "type": "string",
    "task": "string",
    "status": "TODO" | "IN PROGRESS" | "DONE" | "Canceled" | "Backlog",
    "priority": "LOW" | "MEDIUM" | "HIGH",
    "team": "string"
}
```

## Data Models

### User Model

```javascript
{
    id: integer (auto-generated),
    username: string (unique),
    email: string (unique),
    password: string (hashed),
    role: enum['admin', 'user'] (default: 'user'),
    createdAt: datetime,
    updatedAt: datetime
}
```

### Account Model

```javascript
{
    id: integer (auto-generated),
    id_user: integer (foreign key),
    firstName: string,
    lastName: string,
    address: string (optional),
    phoneNumber: string (optional),
    team: string (optional),
    role: string (optional),
    createdAt: datetime,
    updatedAt: datetime
}
```

## Error Responses

```javascript
// 400 Bad Request
{
    "success": false,
    "error": "Error message"
}

// 401 Unauthorized
{
    "message": "Invalid credentials"
}

// 403 Forbidden
{
    "success": false,
    "error": "Not authorized to access this resource"
}

// 404 Not Found
{
    "success": false,
    "error": "Resource not found"
}
```

## License

ISC
