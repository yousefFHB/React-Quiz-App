Here’s a clean, professional **GitHub README.md** for your project based on what you’ve shown:

* React
* React Router
* TailwindCSS
* Framer Motion
* Context API auth
* Protected routes
* Toast notifications
* Auth + Profile + Products pages
* Smooth page transitions
* Dark zinc/violet UI system

You can paste this directly into your repo’s `README.md` and adjust the project name/screenshots.

---

# 🚀 React Products App — Auth + Protected Routes + Animated UI

A modern React single-page application with authentication flow, protected routes, animated page transitions, and a dark glass-style UI built with TailwindCSS.

This project demonstrates practical frontend architecture including routing, auth state management, UI transitions, and reusable layout components.

---

## ✨ Features

* 🔐 Authentication flow (Login / Register switch)
* 🧠 Global auth state using React Context
* 🛡 Protected routes with redirect logic
* 🧭 React Router navigation
* 🎬 Smooth page transitions (Framer Motion)
* 💬 Toast notifications (react-hot-toast)
* 🎨 TailwindCSS dark theme UI
* 📱 Responsive layout
* 🧱 Reusable components (Nav, Footer, PageWrapper)
* 🔄 Animated auth form switching
* 📦 Product listing + product details routing
* 👤 Profile page (auth-only access)
* ❌ Custom NotFound route

---

## 🧰 Tech Stack

* **React**
* **React Router DOM**
* **TailwindCSS**
* **Framer Motion**
* **React Hot Toast**
* **Context API**

---

## 📁 Project Structure

```
src/
 ├── Components/
 │    ├── Nav.jsx
 │    ├── Footer.jsx
 │    └── PageWrapper.jsx
 │
 ├── Context/
 │    └── AuthContext.jsx
 │
 ├── Pages/
 │    ├── Home.jsx
 │    ├── Auth.jsx
 │    ├── Login.jsx
 │    ├── Register.jsx
 │    ├── Products.jsx
 │    ├── ProductDetails.jsx
 │    ├── Profile.jsx
 │    └── NotFound.jsx
 │
 ├── App.jsx
 └── main.jsx
```

---

## 🔐 Route Logic

| Route                        | Access                              |
| ---------------------------- | ----------------------------------- |
| `/`                          | Public                              |
| `/about`                     | Public                              |
| `/products`                  | Public                              |
| `/product-details/:id/:name` | Public                              |
| `/auth`                      | Guest only (redirects if logged in) |
| `/profile`                   | Protected (requires token)          |

---

## 🎬 Page Transitions

All route changes are animated using **Framer Motion** with a reusable `PageWrapper` component and `AnimatePresence` at the router level.

Auth page also includes animated switching between Login and Register forms.

---

## 🎨 UI System

* Dark zinc background
* Violet accent shadows and focus rings
* Glass / blur card surfaces
* Consistent input + button styling
* Sticky navbar with dynamic shadow behavior

---

## ⚙️ Installation

```bash
git clone <your-repo-url>
cd <repo-name>
npm install
npm run dev
```

---

## 📦 Dependencies Used

```
react
react-router-dom
tailwindcss
framer-motion
react-hot-toast
```

---

## 🧪 Learning Goals Covered

* React component composition
* Context-based auth state
* Conditional route rendering
* Protected navigation patterns
* UI animation patterns
* Tailwind design system usage
* Form handling
* Layout architecture

---

## 📌 Future Improvements (optional ideas)

* API-backed authentication
* Token persistence (localStorage refresh)
* Role-based access
* Product filtering/search
* Skeleton loaders
* Dashboard charts
* Unit tests


