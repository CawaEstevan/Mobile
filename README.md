


sudo apt update
sudo apt install -y nodejs npm
npm install --global expo-cli
npx create-expo-app projeto --template  blank@sdk-54

cd projeto
npx expo install react-dom react-native-web
npx expo start --tunnel