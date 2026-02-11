import React from "react";
import {View, Text, StyleSheet} from "react-native";
import OlaMundo from "./components/OlaMundo";


export default function App(){
  return(
    <View style={styles.container}> 
      <OlaMundo nome = 'Cawa'/>  
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AAA',
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#000',
  }
});
