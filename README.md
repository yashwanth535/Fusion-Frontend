# Flavour Fusion Frontend

This is the frontend for the Flavour Fusion application.

## Features
- Modern React (Vite + TypeScript)
- Authentication and protected routes
- Recipe input, output, and management
- Responsive UI with Tailwind CSS
- Integration with backend API

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm (v6 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173` by default.

## Project Structure
```
frontend/
  public/         # Static assets (images, icons)
  src/            # Source code
    components/   # Reusable UI components
    context/      # React context providers
    lib/          # Utility functions
    pages/        # Page components
    index.css     # Global styles
    main.tsx      # App entry point
```

## Deployment
This frontend is deployed at: [https://fusion.yashwanth.site/](https://fusion.yashwanth.site/)

## Backend
Make sure the backend server is running and accessible. See the backend README for setup instructions.

## License
MIT 