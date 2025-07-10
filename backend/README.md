# World Cuisines Backend

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (recommended) or local MongoDB installation

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - **IMPORTANT**: Update the MONGODB_URI with your actual MongoDB connection string
   - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/world-cuisines?retryWrites=true&w=majority`
   - For local MongoDB: `mongodb://localhost:27017/world-cuisines`

4. **For MongoDB Atlas (Recommended)**:
   - Create an account at https://www.mongodb.com/atlas
   - Create a new cluster
   - Get your connection string and update the .env file
   - Make sure to whitelist your IP address in Atlas

   **For Local MongoDB** (if you have MongoDB installed locally):
```bash
mongod
```

5. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### API Endpoints

#### Contact Messages
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages
- `PUT /api/contact/:id/status` - Update message status

#### Cuisine Suggestions
- `POST /api/suggestions` - Submit cuisine suggestion
- `GET /api/suggestions` - Get all suggestions

### Database Models

#### Contact
- name (required)
- email (required)
- phone (optional)
- subject (required)
- message (required)
- status (new/read/responded)
- createdAt

#### CuisineSuggestion
- cuisineName (required)
- country (required)
- category (required)
- description (required)
- keyIngredients (required)
- popularDishes (required)
- culturalSignificance (optional)
- suggestedBy (required)
- email (required)
- status (pending/approved/rejected)
- createdAt