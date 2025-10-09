# React Job Website

A modern job listing platform built with React and Express, featuring a responsive frontend and a robust backend API. This project allows users to browse, add, edit, and view job listings seamlessly.

![Project Screenshot](public/screen.png)

## 🚀 Live Demo

- **Frontend**: [https://react-job-website.harshitsoni.space/](https://react-job-website.harshitsoni.space/)
- **Backend API**: [https://api.react-job-website.harshitsoni.space/](https://api.react-job-website.harshitsoni.space/)

## 🛠️ Tech Stack

### Frontend

- **React** - A JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Declarative routing for React

### Backend

- **Express.js** - Web application framework for Node.js
- **MongoDB** - NoSQL database for storing job data
- **Node.js** - JavaScript runtime environment

## ✨ Features

- Browse job listings with pagination
- View detailed job information
- Add new job listings
- Edit existing job listings
- Responsive design for mobile and desktop
- RESTful API for job data management

## 📡 API Usage

The backend provides a RESTful API that you can use to interact with job data. Base URL: `https://api.react-job-website.harshitsoni.space/`

### Endpoints

- `GET /jobs` - Retrieve all job listings
- `GET /jobs/:id` - Retrieve a specific job by ID
- `POST /jobs` - Create a new job listing
- `PUT /jobs/:id` - Update an existing job listing
- `DELETE /jobs/:id` - Delete a job listing

### Example API Request

```bash
curl -X GET "https://api.react-job-website.harshitsoni.space/jobs"
```

## 🏃‍♂️ Installation and Setup

Follow these steps to run the project locally:

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for backend)

### Clone the Repository

```bash
git clone https://github.com/Harshit-Soni78/React-Job-Website.git
cd react-job-website
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend server will run on `http://localhost:5000` (or as configured).

### Frontend Setup

```bash
cd ..
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite default).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Inspired by Traversy Media's React tutorial.
