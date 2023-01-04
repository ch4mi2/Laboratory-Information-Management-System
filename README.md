# How to install 
Open a convenient folder with powershell/terminal and run these commands (do not run npm audit fix --force)
```
git clone https://github.com/Navojith/ProjectITP.git
cd ProjectITP/frontend
npm install
```
do not run npm audit fix --force . This will break the system !


# How to run
cd to the installation folder(ProjectITP/frontend) with terminal/cmd/powershell and run
```
npm start
```
        
        
# Instructions 

***Use the custom navbar, header, footer provided in your files ( Those files are yet to be created. Will update this when done . For now ignore this point )***

1. **Please check the package.json file before installing additional dependancies**. Chances are the dependancy that you are looking for, may have already installed in node_modules 
2. **If you wish to add additional dependancies, please mention the name and exact version in this document**. 
3. **Please dont upgrade package versions even if they are out-dated**. ( Most of the packages are depenedant on each other and every member should have the same versions,
 so it will break the system if one memeber were to upgrade a common package. The packages are installed with their Long-term-support(lts) version. Newer "alpha/beta" versions
 does not guarantee compatibality)
4. **Create a branch with your name-function in github repo. Commit only to this newly created branch.**
5. Create a new folder for your function in src/components to store your custom components
6. Use src/css folder to store your custom styles (create a new stylesheet with your function name)
