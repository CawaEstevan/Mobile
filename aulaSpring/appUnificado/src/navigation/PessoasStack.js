import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PessoaListScreen from '../screens/pessoas/PessoaListScreen';
import PessoaDetailScreen from '../screens/pessoas/PessoaDetailScreen';
import PessoaFormScreen from '../screens/pessoas/PessoaFormScreen';

const Stack = createNativeStackNavigator();

export default function PessoasStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PessoaList" component={PessoaListScreen} />
      <Stack.Screen name="PessoaDetail" component={PessoaDetailScreen} />
      <Stack.Screen
        name="PessoaForm"
        component={PessoaFormScreen}
        options={({ route }) => ({
          title: route.params?.id ? 'Editar Pessoa' : 'Nova Pessoa',
        })}
      />
    </Stack.Navigator>
  );
}