import React from 'react';
import { Text, View } from 'react-native';
import { homeStyles } from '../styles/homeStyles';

export default function TelaHome() {
  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.titulo}>
        Bem-vindo! 
      </Text>
      
      <Text style={homeStyles.mensagem}>
        Utilize o menu de navegação para acessar as telas de modais e as listas com rolagem.
      </Text>
    </View>
  );
}