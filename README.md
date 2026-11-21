 
# CivicConnect – Local Problem Reporting & Management System

**CivicConnect** is a MERN-stack web application designed to bridge the communication gap between citizens and local authorities. It provides a centralized platform where citizens can report local problems, upload supporting images, vote on existing issues, and track the progress of reported complaints.

The platform helps administrators manage reported issues, assign teams, and update resolution statuses, making local problem management more transparent and efficient.

## Key Features

###  User Features
- **User Authentication:** Secure user registration and login.
- **Report Local Issues:** Submit complaints by specifying the problem type, location, and description.
- **Image Upload:** Attach images to reports as visual evidence.
- **Vote on Reports:** Support existing reports to highlight important community issues.
- **Track Complaints:** View submitted reports and monitor their current status.
- **Disaster Feed:** Browse reports submitted by other users.

### Admin Features
- **Admin Dashboard:** View and manage reported issues from a centralized dashboard.
- **Report Management:** Access reports submitted by different users.
- **Status Management:** Update the progress of reports.
- **Delete Reports:** Remove inappropriate or invalid reports.
- **Community Monitoring:** Monitor reported problems and their voting activity.

## Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| CSS | Styling and responsive layouts |
| Node.js | Backend runtime environment |
| Express.js | REST API development |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| Axios | Frontend API communication |

##  Application Workflow

1. A user registers or logs into the platform.
2. The user submits a local problem with its category, location, description, and an image.
3. The report is stored in the database.
4. Other users can view and vote on reported issues.
5. Administrators review reports and manage their progress.
6. The administrator updates the report status as the issue progresses towards resolution.

## Report Statuses

| Status | Description |
|---|---|
| Pending | Report submitted and awaiting review |
| In Progress | Issue is being processed |
| Team Assigned | A team has been assigned to address the issue |
| Resolved | Reported issue has been resolved |

##  Project Structure

```text
CivicConnect/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── .env
│   └── server.js
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

*Note: The structure above represents the intended organization. Adjust folder names to match the actual repository.*

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd CivicConnect
```

### 2. Set Up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm start
```

### 3. Set Up the Frontend

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

### 4. Access the Application

Open the frontend URL displayed in your terminal, usually:

```text
http://localhost:5173
```

The backend API runs on the configured port, usually:

```text
http://localhost:5000
```

##  Security

- Authentication using JSON Web Tokens (JWT).
- Protected backend routes using authentication middleware.
- Role-based access for administrative operations.
- Environment variables for sensitive configuration.

##  Project Objectives

- Encourage citizen participation in solving local problems.
- Improve communication between citizens and local authorities.
- Make complaint reporting and tracking easier.
- Help administrators prioritize and manage community issues.
- Promote transparency and accountability in local governance.

##  Future Enhancements

- Real-time notifications for report status updates.
- Analytics dashboard for identifying frequently reported problems.
- Real-time communication between citizens and administrators.

## Developed By

**Vivek Kumar Shaw**

B.Tech – Computer Science and Engineering (IoT)

**Project:** CivicConnect – Local Problem Reporting & Management System

---

*Building a more connected community through technology.* 🌱

# The project is live at
url : https://ourlocalproblems.vercel.app/
