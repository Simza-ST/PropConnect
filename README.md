# PropConnect

A property connection platform.

## Project Structure

```
PropConnect/
├── backend/        # Express.js API server
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/       # Frontend application
│   └── package.json
├── package.json    # Root - run both together
└── .gitignore
```

## Getting Started

### Install dependencies
```bash
npm run install:all
```

### Run in development
```bash
# Both together
npm run dev

# Individually
npm run backend
npm run frontend
```

### Backend only
```bash
cd backend
npm run dev
```
