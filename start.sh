echo 'Cleaning cache...'
rm data/image/*
echo 'Done'

echo 'Git pull...'
git pull
echo 'Done'

echo 'Updating dependencies...'
npm i
echo 'Done'

echo 'Start build...'
npm run build