# Backend Internship Task – Authentication System (NestJS)

## 📌 Project Overview

This project implements a secure backend authentication system using **NestJS** and **TypeScript**, with support for:

- Email/Password authentication
- Google OAuth-based Sign-in / Sign-up
- JWT-based token handling and session management
- PostgreSQL database integration using TypeORM
- Foundation for Patient and Doctor onboarding
- Updated ER Diagram reflecting system design

This implementation fulfills the internship task requirements and is structured for future role-based extensions.

---

## 🛠 Tech Stack

- **Backend Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**:
  - JWT (JSON Web Tokens)
  - Google OAuth 2.0 (Passport)
- **Security**:
  - bcrypt (for password hashing)
- **Tools**:
  - pgAdmin
  - Git & GitHub

---

## 📂 Project Structure

hello_world_api_calling/
├── src/
│ ├── auth/
│ │ ├── auth.controller.ts
│ │ ├── auth.service.ts
│ │ ├── auth.module.ts
│ │ ├── jwt.strategy.ts
│ │ └── google.strategy.ts
│ ├── users/
│ │ └── user.entity.ts
│ ├── app.module.ts
│ └── main.ts
├── .env
├── package.json
└── README.md

---

## 🗄 Database Design (ER Diagram)

The ER Diagram includes:
- User entity
- Support for Patient and Doctor roles
- Relationships prepared for future onboarding flows

The ER diagram image and explanation video are included in the repository.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-link>
cd hello_world_api_calling

2️⃣ Install Dependencies
npm install

3️⃣ PostgreSQL Setup
Install PostgreSQL

Create a database (example: auth_db)

Ensure PostgreSQL is running on port 5432

4️⃣ Environment Variables
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

5️⃣ Configure Database (TypeORM)
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'your_db_password',
  database: 'auth_db',
  entities: [User],
  synchronize: true,
});
6️⃣ Run the Application
npm run start:dev

Server will start on:
http://localhost:3000

Authentication Features
🔹 Email/Password Authentication

Register user

Login user

Password hashing using bcrypt

JWT token generation

🔹 Google OAuth Authentication

Google Sign-in / Sign-up

Automatic user creation if not exists

JWT token issued after successful Google login

🔗 API Endpoints
🔸 Register
POST /auth/register


Request Body:

{
  "email": "user@example.com",
  "password": "password123"
}

🔸 Login
POST /auth/login

🔸 Google Login
GET /auth/google

🔸 Google Callback
GET /auth/google/callback

🔸 Protected Route
GET /auth/profile


Header:

Authorization: Bearer <JWT_TOKEN>

🧠 Session Management

Stateless session management using JWT

Tokens are validated using Passport JWT strategy

Protected routes are accessible only with valid tokens

👤 User & Role Handling

Unified User entity

Supports:

Local authentication users

Google OAuth users

Role field prepared for:

Patient

Doctor

ER diagram reflects future role-based onboarding