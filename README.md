Node Js set up Details:
# Step 1:
```bash
run => npm init -y

# Step 2: Install Required Dependencies

+ Express (for building the REST API)
+ MySQL (for connecting to the MySQL database)
+ JWT (jsonwebtoken) (for token-based authentication)
+ bcryptjs (for password hashing)
+ dotenv (for environment variable management)
+ nodemon (for auto-restarting the server during development)
```bash
run => npm install express mysql2 jsonwebtoken bcryptjs dotenv
run => npm install --save-dev nodemon

+ add this on package.json
```bash
 "scripts": {
    "start": "node server.js",  // Command to start the server
    "dev": "nodemon server.js"  // Command to start the server with nodemon for development
  },

+ Run the server 
run => npm run dev 


///////////////////////////////////////////////
## Handling image uploads in your Express application, you can use middleware such as multer to handle file uploads. Here’s how you can set up routes for uploading and retrieving images:

Install Multer (this for uploaded files)
```bash
run => npm install multer

and install this for save image on unquie name 
```bash
run => npm install uuid

