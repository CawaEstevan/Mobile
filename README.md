sudo apt update
sudo apt install -y nodejs npm
npm install --global expo-cli
----------------------------------------------------------------------------------------------------------
npx create-expo-app ex01 --template  blank@sdk-54
cd ex01

npx expo start -c --tunnel

npx expo install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context

#navegação
npm install @react-navigation/native

npm install react-native-screens react-native-safe-area-context react-native-gesture-handler 
react-native-reanimated react-native-vector-icons 

npm install @react-navigation/drawer 


------------------------------------------------------------------------------------------------

# Criar o projeto
npx create-expo-app ex01 --template blank@sdk-54
npx expo install react-dom react-native-web
cd ex01

# Instalar navegação
npx expo install @react-navigation/native @react-navigation/drawer
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-gesture-handler


# gps

