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
