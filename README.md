Sure, here's the entire `README.md` content in a single code block for easy copy-pasting:

```markdown
# Lost and Found (LnF)

Lost and Found (LnF) is a web application that allows users to report lost items, claim found items, and view all reported items. The platform also sends daily emails about reported items and notifications when an item is claimed.

## Features

- **Report Lost Items**: Users can report items they've lost with detailed descriptions.
- **Claim Found Items**: Users can browse through found items and claim them if they match their lost items.
- **View All Reported Items**: Users can view a list of all reported lost and found items.
- **Email Notifications**: The platform sends daily emails to users about newly reported items and notifications when their item is claimed.
- **User Authentication**: Users can sign up and log in using Google OAuth and JWT-based authentication.

## Tech Stack

- **Frontend**: ReactJS
- **Backend**: NodeJS
- **Database**: MongoDB
- **Email Service**: Nodemailer
- **Email Templates**: ejs
- **Scheduler**: node-cron
- **Deployment**: Heroku and Vercel
- **Version Control**: Git and GitHub
- **Authentication**: Google OAuth, JWT

## Project Structure

```
LnF/
├── backend/          # NodeJS backend with ExpressJS
├── frontend/         # ReactJS frontend
├── config/           # Configuration files (e.g., database, email)
├── models/           # MongoDB models for storing data
├── routes/           # API routes for the backend
├── services/         # Services for email, authentication, etc.
├── public/           # Static assets
├── views/            # ejs email templates
└── README.md         # Project documentation
```

## Installation

### Prerequisites

- Node.js
- MongoDB
- npm (Node Package Manager)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hyperaid/LnF.git
   cd LnF
   ```

2. **Install dependencies for both frontend and backend:**

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `backend/` directory and add your environment variables. Here's an example:

   ```env
   MONGO_URI=mongodb://localhost:27017/lnf
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```

4. **Start the application:**

   ```bash
   # Start the backend server
   cd backend
   npm start

   # Start the frontend server
   cd ../frontend
   npm start
   ```

   The frontend will be running on `http://localhost:3000` and the backend on `http://localhost:5000`.

## Usage

- Visit the homepage and log in using your Google account.
- Report a lost item by providing the necessary details.
- Browse through found items and claim your lost item if it matches.
- View all reported lost and found items on the platform.
- Receive daily email notifications about new items.

## Contributing

We welcome contributions! If you'd like to contribute, please fork the repository, create a new branch, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further information, feel free to reach out to us.

- **Project Maintainer**: Abhinav Sharma
- **Email**: abhinav.work2024@gmail.com

---

Thank you for using Lost and Found (LnF)!
```

 
