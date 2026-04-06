After downloading the zip file and unzipping it (you can copy/paste or put it in users/name/Desktop/): 
    - open the command prompt and change directories to be in server
    - type in the following commands: 
        cmd 
        npm install
        npm install cors 
        npm install mongodb 
        npm run dev 
    - open another tab in command prompt and change directories to be in client: 
    - run the same commands 
    - in web browser, type in localhost:5173

fyi: if you make changes to it and commit and you want to test those changes, you will have to do a merge request and download the zip file again to test if it works. Another way to test, is to test it locally by opening the local files in visual studio and making changes there. 


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
The .env file contains: 
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/movie_tracker
JWT_SECRET=secretkey

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
