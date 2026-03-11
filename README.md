sudo apt update
sudo apt install -y nodejs npm
npm install --global expo-cli
----------------------------------------------------------------------------------------------------------
npx create-expo-app exModal --template  blank@sdk-54
cd exModal
npx expo install react-dom react-native-web
npx expo start -c  --tunnel

npx expo install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context