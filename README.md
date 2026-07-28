# PropConnect

A property connection platform for buying and renting properties.

## Tech Stack

- **Backend** — Node.js, Express 5, Helmet, CORS
- **Frontend** — React 18, Vite, Tailwind CSS 4

## Project Structure

```
PropConnect/
├── backend/
│   ├── controllers/
│   │   └── propertyController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── routes/
│   │   └── properties.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### 1. Install dependencies
```bash
npm run install:all
```

### 2. Configure environment
```bash
cp backend/.env.example backend/.env
```

### 3. Run in development
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/properties` | List all properties |
| GET | `/api/properties?type=sale` | Filter by type (`sale` or `rent`) |
| GET | `/api/properties/:id` | Get single property |
