# Product-Review-App

## Introduction
Welcome to the Product Review App! This application is built using React Native (Expo) for the frontend, NestJS for the backend, and MongoDB as the database. The app enables users to share their experiences about products by adding, viewing, editing, and deleting reviews. It helps people make informed purchasing decisions by reading reviews from others.

## Features
✅ **Add Reviews** – Users can write and submit their own product reviews.  
✅ **View Reviews** – Users can read reviews shared by others.  
✅ **Edit Reviews** – Users can modify their own reviews if needed.  
✅ **Delete Reviews** – Users can remove their reviews if they want.  
✅ **Profile Management** – Users can navigate to their profile.

## Technology Stack
- **Frontend:** React Native (Expo) – Provides a smooth and interactive mobile experience.  
- **Backend:** NestJS – A robust and scalable Node.js framework for handling APIs.  
- **Database:** MongoDB – Efficiently stores user reviews and data.  
- **API Integration:** The frontend communicates with the backend using RESTful APIs built with NestJS.

## Installation & Setup

### Prerequisites
Ensure you have the following installed before proceeding:
- Node.js
- NestJS
- MongoDB
- Expo CLI

### Backend Setup (NestJS)
1. Clone the repository:
   ```sh
   git@github.com:Gadha777/Product-Review-App.git
   cd ProductReviewApp/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

4. Start the backend server:
   ```sh
   npm run start :dev
   ```

### Frontend Setup (React Native Expo)
1. Navigate to the frontend directory:
   ```sh
   cd MyApp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Expo development server:
   ```sh
   npx expo start
   ```
4. Run the app on a physical device or emulator:
   - Scan the QR code using the Expo Go app (Android/iOS)
   - Press `a` to run on an Android emulator
   - Press `i` to run on an iOS simulator (Mac only)

## API Endpoints
The backend provides the following API endpoints:
```sh
GET /reviews           # Fetch all product reviews
POST /reviews          # Add a new product review
PUT /reviews/:id       # Update an existing review
DELETE /reviews/:id    # Delete a review

```




