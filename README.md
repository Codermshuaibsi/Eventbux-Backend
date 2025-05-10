# Eventbux Backend

**Eventbux Backend** is the server-side application for the Eventbux platform, built using Node.js and Express. It provides RESTful APIs to manage events, support OTP-based verification.

---

## 🚀 Features

- **OTP Verification**: Email-based One-Time Password (OTP) system for user verification.
- **Event Management**: Create, read, update, and delete events.
- **Modular Architecture**: Organized codebase with separate folders for routes, models, and configurations.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Email Service**: [Nodemailer](https://nodemailer.com/) (for sending OTPs)
- **Environment Variables**: [dotenv](https://www.npmjs.com/package/dotenv)

---

## 📂 Project Structure

Eventbux-Backend/
├── config/ # Configuration files (e.g., database connection)
├── models/ # Mongoose models
├── otp/ # OTP generation and verification logic
├── routes/ # Express route handlers
├── .env # Environment variables
├── index.js # Entry point of the application
├── package.json # Project metadata and dependencies
└── package-lock.json # Exact versions of installed dependencies

yaml
Copy
Edit

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) instance (local or cloud-based).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Codermshuaibsi/Eventbux-Backend.git
   cd Eventbux-Backend
Install dependencies:

bash
Copy
Edit
npm install
Configure environment variables:

Create a .env file in the root directory and add the following:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
Replace the placeholder values with your actual configuration.

Start the development server:

bash
Copy
Edit
npm run dev
The server will start on http://localhost:5000.

📮 API Endpoints
Authentication=
POST /api/auth/verify-otp - Verify OTP sent to email.

Events
GET /api/events - Retrieve all events.

POST /api/fetch-events - Update and fetch event data and store into the db


🧪 Testing
You can use tools like Postman or Insomnia to test the API endpoints.

