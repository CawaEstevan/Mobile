import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import PessoasStack from './src/navigation/PessoasStack';
import ProdutosStack from './src/navigation/ProdutosStack';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Drawer.Navigator
          initialRouteName="Pessoas"
          screenOptions={{
            drawerActiveTintColor: '#2563eb',
            drawerInactiveTintColor: '#64748b',
            headerStyle: { backgroundColor: '#ffffff' },
            headerTitleStyle: { fontWeight: '700', fontSize: 18, color: '#0f172a' },
            headerTintColor: '#2563eb',
            headerShadowVisible: false,
          }}
        >
          <Drawer.Screen
            name="Pessoas"
            component={PessoasStack}
            options={{
              title: 'Pessoas',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="people-outline" size={size} color={color} />
              ),
              headerTitle: 'Gerenciar Pessoas',
            }}
          />
          <Drawer.Screen
            name="Produtos"
            component={ProdutosStack}
            options={{
              title: 'Produtos',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="cube-outline" size={size} color={color} />
              ),
              headerTitle: 'Gerenciar Produtos',
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}