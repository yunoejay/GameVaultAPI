# GameVault MySQL Integration Demo Script

**Student:** [Your Name]  
**Course:** [Course Name]  
**Project:** GameVault API - MySQL Integration Assignment  
**Date:** November 10, 2025

---

## Introduction (30 seconds)

"Hello Professor, this is my GameVault project with MySQL database integration. In this demo, I'll show you how I integrated MySQL into my game search API midterm project, created a form for user input, and implemented the full data flow from frontend to backend to database."

---

## 1. Project Overview (30 seconds)

**Show the project structure in VS Code:**
- Backend folder (NestJS with TypeORM)
- Frontend folder (React with Vite)
- Root package.json for concurrent dev server

**Say:**
"The project has a NestJS backend that connects to MySQL using TypeORM, and a React frontend that sends user data through REST API endpoints."

---

## 2. Backend - Database Configuration (1 minute)

### Show `.env` file
```bash
# Open backend/.env
```

**Point out:**
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=gamevault
```

**Say:**
"I configured the MySQL connection using environment variables for security and flexibility."

### Show `app.module.ts`
```typescript
// Navigate to backend/src/app.module.ts
```

**Highlight:**
- TypeORM configuration with MySQL
- Environment variable usage
- Entity registration
- `synchronize: true` for development

**Say:**
"The AppModule configures TypeORM to connect to MySQL using the environment variables, and I've registered the UserGame entity."

---

## 3. Database Entity & Schema (1 minute)

### Show `user-game.entity.ts`
```bash
# Open backend/src/games/user-game.entity.ts
```

**Point out the essential attributes:**
- `id` (auto-generated primary key)
- `title` (required, VARCHAR 200)
- `genre` (optional, VARCHAR 100)
- `platform` (optional, VARCHAR 100)
- `year` (optional, INT)
- `description` (optional, TEXT)
- `image` (optional, VARCHAR 500)
- `gameUrl` (optional, VARCHAR 500)
- `developer` (optional, VARCHAR 200)
- `publisher` (optional, VARCHAR 200)
- `createdAt` (auto-generated timestamp)

**Say:**
"I replicated the essential attributes from the FreeToGame API into this entity. These columns store all the important game information that users can submit."

---

## 4. Data Transfer Object & Validation (45 seconds)

### Show `create-game.dto.ts`
```bash
# Open backend/src/games/dto/create-game.dto.ts
```

**Highlight:**
- `@IsString()`, `@MaxLength()` decorators
- Title is required
- Year must be >= 1970
- Input validation rules

**Say:**
"I created a DTO with validation decorators to ensure data integrity. The backend validates all incoming data before saving to the database."

---

## 5. Backend API Endpoints (1 minute)

### Show `games.controller.ts`
```bash
# Open backend/src/games/games.controller.ts
```

**Point out the new endpoints:**
1. `POST /api/games` - Creates a new user game
2. `GET /api/games/user` - Retrieves all user-submitted games

**Say:**
"I added two new REST endpoints: one to create games via POST request, and another to retrieve all saved games from the database."

### Show `games.service.ts`
```bash
# Open backend/src/games/games.service.ts
```

**Highlight:**
- Repository injection
- `createUserGame()` method
- `getUserGames()` method
- TypeORM operations

**Say:**
"The service layer handles the business logic, using TypeORM's repository pattern to interact with MySQL."

---

## 6. Frontend - Add Game Form (1.5 minutes)

### Show `AddGame.tsx`
```bash
# Open frontend/src/pages/AddGame.tsx
```

**Highlight key features:**
- Form state management with React hooks
- All input fields (title, genre, platform, year, etc.)
- POST request to `/api/games`
- Success/error message handling
- Form reset after successful submission

**Say:**
"I created a user-friendly form where users can input game data. When submitted, it sends a POST request to the backend API, which then saves the data to MySQL."

### Show the route configuration
```bash
# Open frontend/src/App.tsx
```

**Point out:**
- Route `/add` registered
- AddGame component imported

### Show navbar
```bash
# Open frontend/src/components/Navbar.tsx
```

**Point out:**
- "Add" link in navigation

**Say:**
"I integrated the new page into the application routing and added a navigation link so users can easily access the form."

---

## 7. Live Demonstration (3-4 minutes)

### Step 1: Start the Application
```bash
# In the terminal, from project root:
npm run dev
```

**Say:**
"I'll now start both the backend and frontend servers simultaneously using the npm dev script."

**Wait for output:**
- Backend: "GameVault Backend is running on: http://localhost:3001"
- Frontend: "Local: http://localhost:3000/"

---

### Step 2: Show the Website Homepage
1. Open browser to `http://localhost:3000`
2. Show the homepage briefly
3. Point out the "Add" link in navbar

**Say:**
"Here's the GameVault homepage. Notice the new 'Add' link in the navigation bar."

---

### Step 3: Navigate to Add Game Page
1. Click "Add" in navbar
2. Show the form

**Say:**
"This is the new Add Game page where users can submit their own games to the database."

---

### Step 4: Fill Out the Form
**Enter sample data:**
- Title: "Call of Duty: Modern Warfare"
- Genre: "Shooter"
- Platform: "PC, PlayStation, Xbox"
- Year: "2019"
- Description: "A first-person shooter game featuring intense multiplayer combat and a gripping campaign."
- Developer: "Infinity Ward"
- Publisher: "Activision"
- (Leave Image URL and Game URL empty for now)

**Say:**
"I'll fill in the form with a sample game entry, demonstrating how users would input data."

---

### Step 5: Submit the Form
1. Click "Save Game" button
2. Show success message appearing
3. Note that form clears

**Say:**
"When I click Save Game, the data is sent to the backend API, validated, and saved to MySQL. The success message confirms the operation."

---

### Step 6: Add Another Game
**Enter second game:**
- Title: "Minecraft"
- Genre: "Sandbox"
- Platform: "PC, Mobile, Console"
- Year: "2011"
- Description: "A sandbox game where players can build and explore infinite worlds."
- Developer: "Mojang Studios"
- Publisher: "Microsoft"

**Submit and show success message**

**Say:**
"Let me add one more game to demonstrate multiple entries."

---

### Step 7: Verify in Database via API
**Open a new terminal and run:**
```bash
curl http://localhost:3001/api/games/user
```

**Say:**
"To verify the data was saved to MySQL, I'll query the API endpoint that retrieves user-submitted games."

**Show the JSON response containing both games with:**
- Auto-generated IDs
- All submitted fields
- Auto-generated timestamps

**Say:**
"As you can see, both games are stored in the database with unique IDs and timestamps. This confirms the complete data flow from frontend form to backend API to MySQL database."

---

### Step 8: Show MySQL Database Directly (Optional)
```bash
# Connect to MySQL
mysql -u root gamevault

# Show the table
SHOW TABLES;

# Query the data
SELECT id, title, genre, platform, year, created_at FROM user_games;

# Exit
exit;
```

**Say:**
"For additional verification, here's the actual MySQL database showing the user_games table and the records we just created."

---

## 8. Technical Implementation Summary (1 minute)

**Review what was implemented:**

### Backend Components:
1. ✅ MySQL database connection via TypeORM
2. ✅ UserGame entity with essential game attributes
3. ✅ CreateGameDto with validation rules
4. ✅ POST /api/games endpoint for creating games
5. ✅ GET /api/games/user endpoint for retrieving games
6. ✅ Repository pattern integration
7. ✅ Global validation pipe
8. ✅ Environment-based configuration

### Frontend Components:
1. ✅ AddGame.tsx page with comprehensive form
2. ✅ Form validation and error handling
3. ✅ Axios POST request to backend
4. ✅ Success/error message display
5. ✅ Routing integration (/add)
6. ✅ Navbar navigation link
7. ✅ Responsive CSS styling

### Data Flow:
1. ✅ User enters data in frontend form
2. ✅ React sends POST request to backend
3. ✅ NestJS validates input via DTO
4. ✅ TypeORM saves to MySQL database
5. ✅ User receives confirmation
6. ✅ Data retrievable via GET endpoint

**Say:**
"In summary, I successfully integrated MySQL into the GameVault project, created a complete CRUD operation for user-submitted games, and implemented the full stack from database schema to user interface."

---

## 9. Conclusion (30 seconds)

**Key Points:**
- ✅ Requirement met: MySQL database integrated
- ✅ Requirement met: Essential API attributes replicated as database columns
- ✅ Requirement met: New form page for user input
- ✅ Requirement met: Complete data flow (Frontend → Backend → Database)
- ✅ Extra: Validation, error handling, and professional UI

**Say:**
"This project demonstrates my understanding of full-stack development, database integration, REST API design, and modern web technologies including NestJS, React, TypeORM, and MySQL. Thank you for watching."

---

## Quick Recording Checklist

Before recording, ensure:
- [ ] MySQL service is running (`brew services start mysql`)
- [ ] Backend and frontend dependencies installed
- [ ] `.env` file configured in backend
- [ ] Database `gamevault` exists
- [ ] No other apps using ports 3000 or 3001
- [ ] Browser is open and ready
- [ ] Terminal ready for commands
- [ ] VS Code open with project loaded

---

## Backup Talking Points

If professor asks questions:

**Q: Why TypeORM?**  
A: "TypeORM is a mature ORM that integrates seamlessly with NestJS, provides type safety, and supports multiple databases. The `synchronize` feature is great for development."

**Q: Why separate frontend/backend?**  
A: "This follows modern architecture patterns, allowing independent scaling, easier maintenance, and separation of concerns."

**Q: How is data validated?**  
A: "I use class-validator decorators in the DTO. NestJS validation pipe checks all inputs before reaching the service layer."

**Q: Is it production-ready?**  
A: "For production, I'd disable `synchronize`, add migrations, implement proper error logging, add authentication, and secure environment variables."

---

## Time Estimates

- Introduction: 30s
- Project Overview: 30s
- Backend Config: 1m
- Entity & Schema: 1m
- DTO & Validation: 45s
- API Endpoints: 1m
- Frontend Form: 1.5m
- Live Demo: 3-4m
- Summary: 1m
- Conclusion: 30s

**Total: ~10-12 minutes**

---

Good luck with your presentation! 🎮
