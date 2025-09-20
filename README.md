# ZapLink: A Modern URL Shortener

ZapLink is a high-performance, scalable URL shortening service built with a focus on speed, reliability, and ease of use. It allows users to transform long, cumbersome URLs into concise, shareable links, perfect for social media, marketing campaigns, or simply making links more manageable.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)




## Project Structure

ZapLink is organized into two main components: a `backend` service and a `frontend` application. This separation ensures a clear division of concerns, allowing for independent development, deployment, and scaling of each part.

### Backend

The `backend` directory contains the server-side logic responsible for handling URL shortening requests, managing the database, and providing the API endpoints consumed by the frontend. It is built using Node.js and Express, leveraging MongoDB for data persistence. Key functionalities include:

- **URL Shortening**: Generating unique short codes for long URLs.
- **Redirection**: Handling requests to short URLs and redirecting them to their original destinations.
- **Analytics**: Tracking clicks and other relevant metrics for shortened URLs.
- **Authentication**: Securing API endpoints and user data.

### Frontend

The `frontend` directory houses the client-side application that provides the user interface for interacting with the ZapLink service. It is developed using a modern JavaScript framework (e.g., React, Vue, or Angular, though the specific framework is not detailed in the initial project structure). The frontend allows users to:

- Shorten URLs through an intuitive interface.
- View a history of their shortened URLs.
- Manage and customize their shortened links.
- Access basic analytics for their links.




## Getting Started

To get a local copy of ZapLink up and running, follow these simple steps. This guide assumes you have the necessary prerequisites installed on your system.

### Prerequisites

Before you begin, ensure you have the following software installed:

- **Node.js**: The backend is built with Node.js. It is recommended to use the latest LTS (Long Term Support) version. You can download it from [nodejs.org](https://nodejs.org/).
- **npm** (Node Package Manager): npm is distributed with Node.js, so when you download Node.js, you automatically get npm installed on your computer.
- **MongoDB**: The backend uses MongoDB as its database. You can install MongoDB locally or use a cloud-hosted solution like MongoDB Atlas. Instructions for local installation can be found on the [MongoDB website](https://docs.mongodb.com/manual/installation/).
- **Git**: For cloning the repository. You can download it from [git-scm.com](https://git-scm.com/downloads).

### Installation

1. **Clone the repository**:

   Open your terminal or command prompt and run the following command to clone the ZapLink repository to your local machine:

   ```bash
   git clone https://github.com/kharalnirmal/ZapLink.git
   cd ZapLink
   ```

2. **Install Backend Dependencies**:

   Navigate into the `backend` directory and install the required Node.js packages:

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:

   Navigate into the `frontend` directory and install its dependencies. (Note: The specific frontend framework and its installation steps might vary, but `npm install` is a common starting point).

   ```bash
   cd ../frontend
   npm install
   ```

   After installing dependencies, you might need to build the frontend project. Refer to the `frontend` directory's specific documentation or `package.json` scripts for build commands (e.g., `npm run build`).




## Environment Variables

To configure ZapLink, you need to set up several environment variables. These variables are crucial for the application to connect to the database, secure user data, and define its operational parameters. Create a `.env` file in the `backend` directory and populate it with the following variables:

```
PORT=8000 
MONGODB_URI=
BASE_URL=http://localhost:3000
JWT_SECRET=your_super_secret_jwt_key
```

### Explanation of Variables:

- `PORT`: The port on which the backend server will listen. Default is `8000`.
- `MONGODB_URI`: The connection string for your MongoDB database. This should point to your MongoDB instance, whether local or hosted.
- `BASE_URL`: The base URL that will be used for generating shortened links. This should be the public-facing URL of your ZapLink instance.
- `JWT_SECRET`: A secret key used for signing JSON Web Tokens (JWTs). This is critical for authentication and should be a strong, randomly generated string in a production environment.

**Security Note**: Never commit your `.env` file to version control. It should contain sensitive information specific to your deployment. Use a `.env.example` file (or similar) to provide a template without actual values.




## Usage

Once the backend and frontend are set up and running, you can start using ZapLink. 

### Starting the Backend Server

Navigate to the `backend` directory and start the server:

```bash
cd backend
npm start
```

This will typically start the server on the `PORT` specified in your `.env` file (e.g., `http://localhost:3000`).

### Starting the Frontend Application

Navigate to the `frontend` directory and start the development server:

```bash
cd frontend
npm start
```

This will usually open the application in your web browser at a local address (e.g., `http://localhost:3001`). You can then interact with the ZapLink interface to shorten URLs, view your link history, and manage your account.

### API Endpoints

For developers, the backend exposes a RESTful API. Key endpoints include:

- `POST /api/shorten`: To create a new shortened URL.
- `GET /:shortCode`: To redirect to the original URL.
- `GET /api/urls`: To retrieve a user's shortened URLs.
- `POST /api/auth/register`: To register a new user.
- `POST /api/auth/login`: To log in an existing user.

Refer to the backend source code (e.g., `backend/src/routes/urlRoutes.js` and `backend/src/routes/authRoutes.js`) for detailed API documentation and request/response formats.




## Contributing

We welcome contributions to ZapLink! If you have suggestions for improvements, new features, or bug fixes, please follow these steps:

1.  **Fork the repository**.
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/your-bug-fix`.
3.  **Make your changes** and ensure they adhere to the project's coding standards.
4.  **Write clear, concise commit messages**.
5.  **Push your branch** to your forked repository.
6.  **Open a Pull Request** to the `main` branch of the original ZapLink repository, describing your changes in detail.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please reach out to the project maintainer:

- **Nirmal Kharal** - [kharalnirmal](https://github.com/kharalnirmal)



