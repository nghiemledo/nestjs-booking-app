# Coworking Space Booking API

## Introduction
This project is a **Coworking Space Booking API** built with **NestJS** and **MongoDB**. It allows users to book coworking spaces, manage bookings, and check availability. The API supports authentication using **JWT** and role-based access control for **users** and **admins**.

## Features
### **User Management**
- **Register** (POST `/users/register`)
- **Login** (POST `/users/login`) with JWT authentication

### **Booking Management**
- **Create a booking** (POST `/bookings`) – Requires date and time input
- **View booking list** (GET `/bookings`) – Only **admins** can view all bookings
- **Cancel a booking** (DELETE `/bookings/:id`)

### **Availability Check**
- **Check available time slots** (GET `/availability?date=YYYY-MM-DD&time=HH:MM`)

### **Admin Management**
- **Admin login** (POST `/admin/login`)
- **Role-based access control**: Users and Admins

### **Booking Verification & Confirmation**
- **Check available slots** (GET `/availability?date=YYYY-MM-DD`)
- **View all bookings** (GET `/bookings`)
- **Confirm or reject a booking** (PATCH `/bookings/:id/status`)

### **Venue/Table Management**
- **Add a new venue/table** (POST `/venues`)
- **Edit a venue/table** (PATCH `/venues/:id`)
- **Delete a venue/table** (DELETE `/venues/:id`)
- **View available venues** (GET `/venues`)

## Technology Stack
- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: JWT (JSON Web Token)
- **API Documentation**: Swagger (optional)

## Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/nghiemledo/nestjs-booking-app.git
   cd nestjs-booking-app
   ```

2. **Install dependencies**
   ```sh
   yarn install
   ```

3. **Configure environment variables**
   Create a `.env` file and define your environment variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/coworking_db
   JWT_SECRET=your_secret_key
   PORT=3000
   ```

4. **Run the application**
   ```sh
   yarn start
   ```

5. **API Testing**
   Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the API endpoints.

## API Endpoints
| Method | Endpoint | Description | Access |
|--------|---------|-------------|--------|
| POST | `/users/register` | Register a new user | Public |
| POST | `/users/login` | User login | Public |
| POST | `/bookings` | Create a new booking | Authenticated Users |
| GET | `/bookings` | View all bookings | Admin Only |
| DELETE | `/bookings/:id` | Cancel a booking | Authenticated Users |
| GET | `/availability?date=YYYY-MM-DD&time=HH:MM` | Check available slots | Public |
| POST | `/admin/login` | Admin login | Public |
| PATCH | `/bookings/:id/status` | Confirm/Reject booking | Admin Only |
| POST | `/venues` | Add a new venue/table | Admin Only |
| PATCH | `/venues/:id` | Edit venue/table | Admin Only |
| DELETE | `/venues/:id` | Delete venue/table | Admin Only |
| GET | `/venues` | View available venues | Public |

## License
This project is licensed under the MIT License.

## Author
Developed by **Le Do Nghiem**. Feel free to contribute and enhance the project!
