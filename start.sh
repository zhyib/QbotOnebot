echo 'Cleaning cache...'
rm data/image/*
echo 'Done'
echo;
echo 'Git pull...'
git reset -f HEAD
git pull
echo 'Done'
echo;
echo 'Updating dependencies...'
npm i
echo 'Done'
echo;
echo 'Start build...'
npm run build