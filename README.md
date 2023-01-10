# Seting up
Prerequisites <br />
1.Install and configure git <br />
2.Install Node.js `v18.12.1`. <br />
  Download from here : https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi <br />
  npm `9.2.0` is used <br />
3.Make sure you installed correct Node.js and npm versions with
  ```
  node -v
  npm -v
  ```
# Installation
1.Fork the repo <br />
2.Clone it to your machine (do not run npm audit fix --force)
```
git clone <repo link>
```
3.Run the below command twice on both frontend and backend folders to install node modules <br />
&ensp use cd/folderName to move into folder <br />
&ensp use cd.. to move up
```
npm install
```
do not run npm audit fix --force . This will break the system !


# How to run
1.Frontend <br />
&ensp cd to frontend and run
```
npm start
```
2.Backend <br />
&ensp cd to backend and run
```
nodemon server.js
```
&ensp press ctrl + c to stop the server

        
        
# Instructions 

***Use the custom navbar, header, footer provided in your files ( Those files are yet to be created. Will update this when done . For now ignore this point )***

1. **Please check the package.json file before installing additional dependancies**. Chances are the dependancy that you are looking for, may have already installed in node_modules 
2. **If you wish to add additional dependancies, please mention the name and exact version in this document**. 
3. **Please dont upgrade package versions even if they are out-dated**. ( Most of the packages are depenedant on each other and every member should have the same versions,
 so it will break the system if one memeber were to upgrade a common package. The packages are installed with their Long-term-support(lts) version. Newer "alpha/beta" versions does not guarantee compatibality)
4. **Create a branch with your name with `git switch -c "yourName-feature" ` eg: `git switch -c "haritha-loginFunction"` . Commit only to this newly created branch. Commit whenever a new feature is developped**
   
<details><summary>Basic Git commands</summary>
<p>

#### Add files to git hub ( cd to ProjectITP folder and run)

```
  git switch "your-branch-name"      
  git add .
  git commit -m "your-message"
  git push origin your-branch-name
```
replace `your-branch-name` and `your-message` with appopriate names <br />
Always confirm you are in the correct branch with `git status`
</p>
</details>

5. Create a new folder with the name of the function in src/components to store your custom components.  eg: Login/SignupComponent.js
6. Use src/css folder to store your custom styles (create a new stylesheet with your function name). eg: Login/loginFormStyles.css

# Useful info and links 

Node.js `v18.12.1` is used - Download from here : https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi <br />
Git : https://git-scm.com/downloads <br />
npm `9.2.0` is used <br />
Refer to the `package.json` file for more details

