# Hello World API using NestJS, TypeScript and PostgreSQL

This project is part of the Backend Internship assignment. It demonstrates a simple Hello World REST API built using NestJS and TypeScript with PostgreSQL database integration using TypeORM.

## Tech Stack
- Node.js
- NestJS
- TypeScript
- PostgreSQL
- TypeORM

## Project Overview
This module includes:
- A Hello World API endpoint
- PostgreSQL database connection
- TypeORM configuration
- Successful database integration and verification

## API Endpoint
GET /hello

### Sample Response
Hello World!

## PostgreSQL Integration

The application is connected to PostgreSQL using TypeORM.

### Database Configuration
- Database Name: hello_world_db
- Username: postgres
- Host: localhost
- Port: 5432
- ORM: TypeORM

Database connection is configured in:
src/app.module.ts

TypeORM is used with synchronize enabled for automatic schema creation.

## How to Run the Project

### Prerequisites
- Node.js (v18 or above)
- npm
- PostgreSQL (installed and running)
- pgAdmin

### Steps

Clone the repository:
git clone https://github.com/Prasadraogorle/backend-internship-task-1.git

Navigate to the project:
cd backend-internship-task-1/hello_world_api_calling

Install dependencies:
npm install

Start the application:
npm run start:dev

If the setup is correct, the application will start successfully and connect to PostgreSQL.

## Verification
- PostgreSQL service is running
- Database hello_world_db exists
- NestJS application connects successfully
- /hello endpoint works as expected

## Notes
- PostgreSQL must be running before starting the application
- This completes Task 3: PostgreSQL Integration

## Author
Prasad Gorle
