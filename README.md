# Society Recruitment Test Portal

A modern web-based **Recruitment Test Portal** designed for societies and student organizations to conduct online recruitment tests efficiently. The platform provides a structured environment for candidates to participate in recruitment assessments while allowing administrators to manage tests, questions, candidates, and results.

## Overview

The Society Recruitment Test Portal is built to simplify the recruitment process for college societies and organizations.

Candidates can register, access assigned tests, answer questions within a defined time limit, and submit their responses online. Administrators can manage recruitment tests and evaluate candidate performance through the system.

The application uses modern frontend technologies along with Firebase for backend services, authentication, and data management.

## Key Features

### Candidate Features

* Candidate registration and login
* Secure authentication
* View available recruitment tests
* Start tests according to availability
* Multiple-choice questions
* Test timer
* Question navigation
* Answer selection and modification
* Automatic test submission
* Result/performance tracking
* Responsive user interface

### Admin Features

* Admin authentication
* Create and manage recruitment tests
* Add, update, and delete questions
* Manage candidate information
* Set test duration
* Control test availability
* View candidate submissions
* View test results and performance
* Manage recruitment-related data

## Technology Stack

### Frontend

* **React.js** – Used for building the primary user interface and reusable components.
* **Vue.js** – Used for selected frontend modules and interactive interfaces.
* **JavaScript / HTML / CSS** – Core web technologies.
* **Responsive Design** – Ensures compatibility across desktop, tablet, and mobile devices.

### Backend & Services

* **Firebase** – Backend-as-a-Service platform.
* **Firebase Authentication** – Handles user authentication and authorization.
* **Cloud Firestore** – Stores users, tests, questions, answers, and results.
* **Firebase Hosting** – Can be used to deploy the application.

## System Architecture

```text
                    ┌──────────────────────┐
                    │      Candidate       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     React.js /       │
                    │      Vue.js          │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Firebase       │
                    ├──────────────────────┤
                    │ Authentication       │
                    │ Cloud Firestore      │
                    │ Hosting              │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Test & Result Data   │
                    └──────────────────────┘
```

## Application Workflow

### Candidate Workflow

```text
Register / Login
       ↓
Candidate Dashboard
       ↓
View Available Test
       ↓
Start Test
       ↓
Answer Questions
       ↓
Submit Test
       ↓
Result / Performance
```

### Admin Workflow

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Create Recruitment Test
     ↓
Add Questions
     ↓
Configure Test
     ↓
Publish Test
     ↓
Monitor Submissions
     ↓
Review Results
```

a public repository.

### 5. Start the Development Server

step 0: Install the node modules in the cloned repo by 
```bash
npm install
```

Step 1: Run it on the local server..
```bash
npm run dev
```

The application will be available at the local development URL shown in the terminal.

## Database Structure

A possible Firestore structure is:

```text
users
 └── userId
      ├── name
      ├── email
      ├── role
      └── createdAt

tests
 └── testId
      ├── title
      ├── description
      ├── duration
      ├── status
      └── createdAt

questions
 └── questionId
      ├── testId
      ├── question
      ├── options
      ├── correctAnswer
      └── marks

submissions
 └── submissionId
      ├── userId
      ├── testId
      ├── answers
      ├── score
      └── submittedAt
```

## Authentication

Firebase Authentication is used to manage user accounts.

Depending on the implementation, supported authentication methods can include:

* Email and Password
* Google Authentication
* Other Firebase-supported authentication providers

User roles can be used to differentiate between:

* **Candidate**
* **Administrator**

## Test Module

The test module is designed to provide a controlled online assessment environment.

Important functionality includes:

* Configurable test duration
* Question-wise navigation
* Multiple-choice answers
* Answer updates before submission
* Automatic submission when the timer expires
* Score calculation
* Submission storage in Firestore

## Security

Firebase security rules should be configured to ensure that:

* Candidates can access only authorized tests.
* Candidates cannot modify questions or correct answers.
* Candidates can submit their own test responses.
* Only administrators can create or modify tests.
* Only authorized users can access administrative functionality.

Example Firestore rules should be customized according to the application's actual authentication and authorization model.

## Responsive Design

The portal is designed to provide a consistent experience across:

* Desktop
* Laptop
* Tablet
* Mobile devices

The interface focuses on usability so candidates can concentrate on completing their recruitment assessment without unnecessary complexity.


Society Recruitment Test Portal
Built with React.js, Vue.js, and Firebase.
