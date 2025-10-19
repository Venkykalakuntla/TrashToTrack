# ♻️ TrashToTrack

**TrashToTrack** is a platform that connects **users with recycling companies** to recycle waste efficiently instead of dumping it.  
The **admin** plays a key role in matching waste submissions from users with recycling requests from recycling companies to ensure proper waste management.

---

## ✅ Key Features

- 🧑‍🤝‍🧑 Users can submit details about their waste.
- 🏭 Recycling companies can request specific types of waste.
- 🛠 Admin matches users with recycling company requests.
- 🌱 Promotes proper recycling instead of dumping.
- 📦 Efficient waste collection process.

---

## 🏗 Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | HTML, CSS, JavaScript (or React - update if needed) |
| Backend    | Node.js, Express |
| Database   | MongoDB |

---

## 🔄 System Workflow

### 👤 User
1. Logs in / registers.
2. Submits waste details (type, quantity, location).
3. Waits for a recycling company to be matched.

### 🏢 Recycling Company
1. Requests specific types of waste.
2. Views matched users from admin.

### 🛠 Admin
1. Views all user waste submissions.
2. Views all company requests.
3. Matches users with recycling companies.

---

## 🚀 How to Run Locally

```bash
# Install dependencies
npm install

# Start the server
npm start
