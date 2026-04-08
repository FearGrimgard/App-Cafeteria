import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function App({navigation}) {
  return (
      <View style={styles.container}>
      <Image source={require('../assets/logo6.png')} style={styles.logo} />
      <Text style={styles.titulo}></Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Cardapio')}
      >
        <Text style={styles.subtitulo}>Cardapio</Text>
      </TouchableOpacity>
      </View>
  )}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C19A6B',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
  },
    logo: {
      height: 200,
      width: 200,
      borderRadius: 1000,
    },
    botao: {
      backgroundColor:'#6F4E37',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 15,
      marginTop: 25,
  },
    titulo: {
      fontSize: 32,
      color: '#000',
      fontWeight: 'bold'
  },
    subtitulo: {
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold'
  },
  });
