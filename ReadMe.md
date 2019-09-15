npm install --save @loopback/authenticationv
npm install isemail

npm i bcryptjs
npm install jsonwebtoken

# Install node.js Using Ubuntu
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clear cashes if you are using another node.js version 
npm cache clean --force

# Install Loopback4 Cli Interface 
npm i -g @loopback/cli

### to fetch data from a branch 
git fetch
git pull origin branchname


### To 
git reset HEAD~1
git stash
[
git reset HEAD~#
'#' is number of commits you want to reset to
git stash
Will remove any changes that isn't committed and save them like on a shelf
If you want those changes you type
git stash apply
]