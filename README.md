Running the Demo App
--------------------

### 1\. Install Dependencies
`   npm install   `

### 2\. Start the Application

`   npm start   `

You should see:
`   🚀 User Registration Demo running on http://localhost:3000   `

### 3\. Test the Application

**Open your browser and go to:** http://localhost:3000

You'll see the registration form. Here are some test scenarios to try:

#### Valid Registration Test:

*   **Full Name:** John Doe
    
*   **Email:** john@example.com
    
*   **Phone:** 1234567890
    
*   **Age:** 25
    
*   **Country:** United States
    
*   Click "Register" → Should show success message
    

#### Validation Error Tests:

Try these to see error handling:

*   Leave fields empty and submit
    
*   Enter invalid email: invalid-email
    
*   Enter short phone: 123
    
*   Enter age under 18: 15
    
*   Leave country as "Select your country"
    

#### API Endpoints to Test:

*   **Health check:** http://localhost:3000/health
    
*   **View users:** http://localhost:3000/users (after registering some)
    

### 4\. Run Unit Tests
`npm test`

This runs the Jest test suite that validates the API endpoints.

### 5\. Development Mode (Optional)

If you want to make changes and see them automatically:
`   npm run dev   `

This uses nodemon to restart the server when files change.
