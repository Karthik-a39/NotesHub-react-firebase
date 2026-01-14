# NotesHub 🔐📝

NotesHub is a modern full-stack web application built using **React** and **Firebase**.  
It provides secure authentication and user-specific data storage with a clean, responsive UI.

---

## 🚀 Features

- User Authentication using Email & Password
- Google Sign-In using Firebase Authentication
- Authentication State Handling (Login / Logout)
- Protected Routes for authorized users
- User-specific data storage using Firebase Firestore
- Secure Firestore Rules
- Responsive UI (Desktop & Mobile)
- Hosted using Firebase Hosting

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Styling:** CSS / Tailwind (optional)
- **Backend:** Firebase
- **Authentication:** Firebase Auth
- **Database:** Firebase Firestore
- **Hosting:** Firebase Hosting

---

## 📂 Project Structure

src/
├── components/
│ ├── Login.jsx
│ ├── Home.jsx
│ └── ProtectedRoute.jsx
├── config/
│ └── firebase.js
├── App.jsx
├── main.jsx
└── index.css


---

## 🔐 Firebase Security Rules (Sample)
js'''
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null
                          && request.auth.uid == userId;
    }
  }
}

▶️ Run Locally

Clone the repository

git clone https://github.com/your-username/noteshub.git


Install dependencies

npm install


Start the development server

npm run dev

🌍 Deployment

The project is deployed using Firebase Hosting.

To deploy:

npm run build
firebase deploy

📌 Future Enhancements

Notes CRUD functionality
Profile update (name, avatar)
Dark mode
Admin roles
Cloud Functions
👨‍💻 Author
 Karthik
 Built as a learning-focused full-stack React + Firebase project.
