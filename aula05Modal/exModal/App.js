import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from "react-native-safe-area-context"; // Corrigido de SafeAreaFrameProvider
import CustomModalScreen from "./components/CustomModal";

// Inicializa o Navegador de Abas (Tabs)
const Tab = createBottomTabNavigator();

export default function App() { 
  return ( 
    <SafeAreaProvider> 
      <NavigationContainer> 
        <Tab.Navigator  
          screenOptions={{  
            headerShown: false, 
            tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' }, 
            tabBarActiveTintColor: '#000', 
          }} 
        > 
          {/*  
              Definição das três abas. Cada uma passa um animationType diferente  
              para o mesmo componente base, permitindo a comparação direta. 
          */} 
          <Tab.Screen name="SLIDE">
            {() => <CustomModalScreen animation="slide" themeColor="#2196F3" />}
          </Tab.Screen> 
           
          <Tab.Screen name="FADE">
            {() => <CustomModalScreen animation="fade" themeColor="#4CAF50" />}
          </Tab.Screen> 
           
          <Tab.Screen name="NONE">
            {() => <CustomModalScreen animation="none" themeColor="#FF9800" />}
          </Tab.Screen> 
        </Tab.Navigator> 
      </NavigationContainer> 
    </SafeAreaProvider> 
  ); 
}