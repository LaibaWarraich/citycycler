## Running the Project

### Environment Variables

To run the backend, you need an OpenRouteService API key.

Create a `.env` file inside the `backend` folder:
```bash
ORS_API_KEY=your_api_key_here
```
You can get a free API key from:
https://openrouteservice.org/

### Start the Backend

Open a terminal in the project root and run:

```bash
cd .\backend\
node server.js
```
The backend will start on:
http://localhost:3000

### Start the Frontend

Open a second terminal in the project root and run:
```bash
cd .\frontend\
npm run dev
```
The frontend will start on:
http://localhost:5173/

### Features

- Mood-based bicycle route generation  
- A → B routes and round-trip routes  
- Route visualization on an interactive map  
- Save completed rides  
- Ride history and route detail view  
- Badge and progress tracking system  
- Difficulty-based route coloring  
- Light and Dark Mode theme support

### Tech Stack
Frontend:
- React
- Vite
- Leaflet

Backend
- Node.js
- Express
- OpenRouteService API## Running the Project
