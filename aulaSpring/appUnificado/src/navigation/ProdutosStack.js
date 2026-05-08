import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/produtos/ProductListScreen';
import ProductDetailScreen from '../screens/produtos/ProductDetailScreen';
import ProductFormScreen from '../screens/produtos/ProductFormScreen';

const Stack = createNativeStackNavigator();

export default function ProdutosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen
        name="ProductForm"
        component={ProductFormScreen}
        options={({ route }) => ({
          title: route.params?.id ? 'Editar Produto' : 'Novo Produto',
        })}
      />
    </Stack.Navigator>
  );
}