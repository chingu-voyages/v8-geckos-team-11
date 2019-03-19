# Budget Recipe App
Budget Recipe App | Voyage-8, Geckos-Team-11 | https://chingu.io/

## Team Members
Elizabeth
Chris
Simon
Alvaro

**Goal**  
Create an application enabling users to search for budget meal recipes. 

**Minimum Viable Product**  
TBD

**Stacks**
- VueJS
- Vuetify
- Edamam API
- indexDB API

# Getting Started
Clone team repo by running `git clone` command in your terminal with the URL from your repo. 
It should look something like this: 
`git clone https://github.com/chingu-voyages/v8-geckos-team-11.git`

This URL above is also referred to as `origin` on your local machine. 


# Git Workflow

1. From inside your local directory, get all branches and their commits from origin:  
`git fetch origin`

2. Merge changes from `origin/dev` to your local branch:  
`git merge origin/dev`

Now you are ready to make your own changes!

3. Create a working branch:   
`git checkout -b <branch name/short-description>`

**Naming branches**  
Name branches by type (**bug**, **feature**, **refactor**, or **style**) followed by a short description.  
Examples of branch names with descriptions: via [@Kornil](https://medium.com/@francesco.agnoletto/how-to-not-f-up-your-local-files-with-git-part-1-e0756c88fd3c):
 - bug/fixed-all-caps
 - feature/giant-duck-modal
 - refactor/add-prop-types
 - style/everything-is-black
 
4. Stage changes(there are 2 options):  
 a. stage and commit **all** new/modified/deleted files  
 `git add .`  
 b. stage and commit a **specific** new/modified/deleted file  
 `git add <file name>`
  
5. Commit changes:  
commit message should be atomic and written in imperative mood(giving a direct command or request)  
`git commit -m "message here"`

Example of commit message via: https://chris.beams.io/posts/git-commit/#imperative  
`git commit -m "update getting started documentation"`
   
6. Once you have saved and committed your changes, fetch the latest code again:
```
git checkout dev
git fetch origin
```
 
7. Switch back to the branch you were working on and merge
```
git checkout <your branch name>
git merge origin/dev
```
 
8. Fix any conflicts and push your new branch to origin  
`git push origin <your branch name>`

9. In your team repo on Github, make a pull request from working branch against `dev` branch. 
 
## Pulling an individual working branch 
1. Get all branches and commits from origin:  
`git fetch origin`
 
2. Create the working branch if it does not exist yet  
 `git checkout -b origin/<other branch name>`
 
3. If working branch already exist locally:  
`git checkout <other branch name>`
 
4. Make changes and repeat **step 4** to **step 9** from above  





