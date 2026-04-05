After downloading the zip file and unzipping it (you can put it in users/name/Desktop/): 
- open the command prompt and change directories to be in server
- type in the following commands: 
    cmd 
    npm install
    npm run dev 
- open another tab in command prompt and change directories to be in client: 
- run the same commands 
- in web browser, type in localhost:5173


a. How can the grader start the web server? 
b. Is there a second server needed for your React application? If so, explain how to start.

### 1. Server
```bash
cd server
npm install
npm run dev
```

### 2. Client
```bash
cd client
npm install
npm run dev
```

c. How can the grader navigate to the application? I.e., what port and/or URI?
http://localhost:5173

d. What Collections are needed in MongoDB?
movies
users
reviews
watchedlistentries
watchedentries


## Important note - Admin Account
To test admin account, 
login as 
-username: admin
-password: admin123