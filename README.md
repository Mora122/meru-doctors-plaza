# Meru Doctors' Plaza Hospital — Official Website

> Level 4 Hospital · Meru County, Kenya  
> Full-stack production website with React frontend and Node.js/Express backend.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6 |
| Styling | CSS-in-JS (design tokens), Google Fonts |
| Backend | Node.js 20, Express 4 |
| Database | PostgreSQL 15 (via pg) |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Email | Nodemailer (SMTP) |
| Reverse Proxy | Nginx |
| Containerisation | Docker + Docker Compose |
| CI/CD | GitHub Actions → VPS (SSH deploy) |

---

## 📁 Project Structure

```
meru-doctors-plaza/
├── frontend/          React + Vite app
├── backend/           Node.js + Express API
├── nginx/             Nginx server config
├── .github/workflows/ CI/CD pipelines
├── docker-compose.yml Full stack orchestration
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js ≥ 20
- PostgreSQL 15 running locally **or** Docker

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_ORG/meru-doctors-plaza.git
cd meru-doctors-plaza
```

### 2. Backend setup
```bash
cd backend
cp .env.example .env        # Fill in your values
npm install
npm run db:migrate          # Create tables
npm run dev                 # Starts on http://localhost:5000
```

### 3. Frontend setup
```bash
cd frontend
cp .env.example .env.local  # Fill in VITE_API_URL
npm install
npm run dev                 # Starts on http://localhost:5173
```

---

## 🐳 Docker Compose (Recommended)

```bash
# Copy and fill env files first
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

docker compose up --build
```

- Frontend → http://localhost:5173  
- Backend API → http://localhost:5000  
- PostgreSQL → localhost:5432

---

## 🌐 VPS Production Deployment

### Server Requirements
- Ubuntu 22.04 LTS
- 2 vCPU / 2 GB RAM minimum
- Ports 80, 443, 22 open
- Domain pointed to server IP

### One-time server setup
```bash
# On your VPS
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose nginx certbot python3-certbot-nginx

# Add your user to docker group
sudo usermod -aG docker $USER
```

### SSL Certificate
```bash
sudo certbot --nginx -d merudoctorsplaza.co.ke -d www.merudoctorsplaza.co.ke
```

### GitHub Secrets Required
Set these in **GitHub → Settings → Secrets → Actions**:

| Secret | Description |
|---|---|
| `VPS_HOST` | Your server IP or domain |
| `VPS_USER` | SSH username (e.g. `ubuntu`) |
| `VPS_SSH_KEY` | Private SSH key (full contents) |
| `VPS_PORT` | SSH port (default `22`) |
| `DB_PASSWORD` | PostgreSQL password |
| `JWT_SECRET` | 64-char random string |
| `SMTP_USER` | Email address for notifications |
| `SMTP_PASS` | Email app password |

Generate secrets:
```bash
openssl rand -base64 64   # For JWT_SECRET
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/appointments` | Book appointment | No |
| GET | `/api/appointments` | List appointments | Admin |
| GET | `/api/doctors` | List all doctors | No |
| GET | `/api/doctors/:id` | Doctor profile | No |
| POST | `/api/contact` | Submit inquiry | No |
| POST | `/api/auth/login` | Patient login | No |
| GET | `/api/auth/me` | Current patient | JWT |
| GET | `/api/patient/appointments` | My appointments | JWT |
| GET | `/health` | Health check | No |

---

## 📜 Database Schema

```sql
-- patients, appointments, doctors, contacts, departments
-- See backend/src/db/migrate.js for full schema
```

---

## 🔒 Security Features

- Helmet.js HTTP headers
- CORS restricted to allowed origins
- Rate limiting (100 req/15min per IP)
- JWT authentication with expiry
- bcrypt password hashing (12 rounds)
- Input validation (express-validator)
- SQL injection prevention (parameterised queries)
- HTTPS enforced via Nginx + Let's Encrypt

---

## 📞 Hospital Contact

**Meru Doctors' Plaza Hospital**  
Njuri-Ncheke Street, Meru Town, Kenya  
📞 +254 700 000 100 | 🚨 Emergency: +254 700 000 911  
✉️ info@merudoctorsplaza.co.ke

---

*© 2025 Meru Doctors' Plaza Hospital. All rights reserved.*
