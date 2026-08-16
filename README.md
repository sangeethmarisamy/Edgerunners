# Academic Intelligence Platform

A full-stack Education Management Portal for managing students, teachers, courses, classrooms, assignments, examinations, attendance, grades, and academic records.

## Features

### Student Portal
- Student dashboard
- View assignments
- View examinations
- View grades
- View attendance
- View academic profile

### Teacher Portal
- Teacher dashboard
- Manage courses
- Manage classrooms
- Manage assignments
- Manage examinations
- Manage attendance
- Manage grades

### Admin Portal
- Admin dashboard
- Student management
- Teacher management
- Course management
- Classroom management
- Assignment management
- Examination management
- Attendance management

## Technology Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Spring Security
- JWT Authentication

### Database
- PostgreSQL

## Architecture

```text
Student / Teacher / Admin
          |
          v
    React Frontend
          |
          v
      REST API
          |
          v
   Spring Boot Backend
          |
          v
      PostgreSQL
academic-intelligence/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/buildathon/academic/
│       │       ├── config/
│       │       ├── controller/
│       │       ├── model/
│       │       ├── repository/
│       │       ├── service/
│       │       └── security/
│       │
│       └── resources/
│           └── application.properties
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── pom.xml
├── README.md
└── .gitignore

Run Backend

From the project root:

cd ~/buildathon-2026/academic-intelligence

Build:

mvn clean package

Run:

mvn spring-boot:run

Backend URL:

http://localhost:8080

API base URL:

http://localhost:8080/api

Keep this terminal running.

Frontend Setup

Open a second terminal:

cd ~/buildathon-2026/academic-intelligence/frontend

Install dependencies:

npm install

Run frontend:

npm run dev

Vite normally starts at:

http://localhost:5173

If port 5173 is already in use, Vite automatically selects another port.

For network access:

npm run dev -- --host 0.0.0.0

Use the Network URL displayed by Vite.Run Complete Application
Terminal 1 — Backend
cd ~/buildathon-2026/academic-intelligence
mvn spring-boot:run
Terminal 2 — Frontend
cd ~/buildathon-2026/academic-intelligence/frontend
npm run dev

Then open the frontend URL displayed by Vite.
