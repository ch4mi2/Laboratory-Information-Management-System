# Seting up
## Prerequisites
## Sign in to mongo db with google account. read credentials.txt
1. Install and configure git [Download](https://git-scm.com/downloads) <br/>
Please refer this [Tutorial](https://youtube.com/playlist?list=PL4cUxeGkcC9goXbgTDQ0n_4TBzOO0ocPR) to learn more about git.
2. Install Node.js `v18.12.1`. [Download](https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi)
  npm `9.2.0` is used
3. Make sure you installed correct Node.js and npm versions with
  ```
  node -v
  npm -v
  ```
# Installation
1. Fork the repo
2. Clone it to your machine (do not run npm audit fix --force)
```
git clone <repo link>
```
3. Run the below command twice on both frontend and backend folders to install node modules <br />
   - use `cd/folder-name` to move into folder <br />
   - use `cd..` to move up
```
npm install
```
do not run npm audit fix --force . This will break the system !


# How to run
## Frontend <br />
cd to frontend and run
```
npm start
```
## Backend <br />
cd to backend and run
```
nodemon server.js
```
press ctrl + c to stop the server

         
# Instructions 
1. **Please check the package.json file before installing additional dependancies**. Chances are the dependancy that you are looking for, may have already installed in node_modules 
2. **If you wish to add additional dependancies, please notify it to Pawara**. 
3. **Please dont upgrade package versions even if they are out-dated**. ( Most of the packages are depenedant on each other and every member should have the same versions,
 so it will break the system if one memeber were to upgrade a common package. The packages are installed with their Long-term-support(lts) version. Newer "alpha/beta" versions does not guarantee compatibality)
4. Follow coding standards, use comments. 

### Frontend
1. Use the custom navbar, header, footer provided in your files ( Those files are yet to be created. Will update this when done . For now ignore this point )
2. Create a new folder with the name of the function in src/components to store your custom components.  eg: Login/SignupComponent.js
3. Use src/css folder to store your custom styles (create a new stylesheet with your function name). eg: Login/loginFormStyles.css

### Backend
1. Read README.md , comments added for better understanding


# Git practices
1. After forking make sure your main branch is the origin 
```
git remote -v
```
Output should be like this:
```
origin  https://github.com/ch4mi2/ProjectITP.git (fetch)
origin  https://github.com/ch4mi2/ProjectITP.git (push)
```
If not, add it by running the below command
```
git remote add origin <your repo link>
```
### Step 2 & 3 is for all contributors except Pawara

2. Run the below command to refer to the original repo
```
git remote add upstream https://github.com/Navojith/ProjectITP.git
```
3. Make a habit to always keep your main branch synced with the original by running the below commands
```
git fetch upstream
git merge upstream/main
```
4. **Create a branch for every function with your name eg: `git switch -c "haritha-loginFunction"` . Commit only to this newly created branch. Commit whenever a new feature is developped**
```
git switch -c yourName-feature
```
5. Create a pull request when you are done with one branch.
