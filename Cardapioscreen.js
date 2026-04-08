import React, {useRef, useState, useEffect} from 'react';
import { View, Text, FlatList, Image, StyleSheet,
 ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MENU = [
    { id: '1', nome: 'Café Expresso', preco: 'R$ 6,00', imagem: require('../assets/item1.png')},
    { id: '2', nome: 'Cappuccino', preco: 'R$ 10,00',  imagem: require('../assets/item2.png')},
    { id: '3', nome: 'Latte', preco: 'R$ 12,00', imagem: require('../assets/item3.png') },
    { id: '6', nome: 'Cafe Gelado', preco:'R$ 8,00', imagem: require('../assets/item6.png') },
    { id: '7', nome: 'Frappucino', preco:'R$ 11,00', imagem: require('../assets/item7.png') },
    { id: '12', nome: 'Água sem gás', preco:'R$ 4,00', imagem: require('../assets/item12.png') },
    { id: '13', nome: 'Água com gás', preco:'R$ 5,00', imagem: require('../assets/item13.png') },
    { id: '14', nome: 'Pão de queijo', preco:'R$ 3,00', imagem: require('../assets/item14.png') },
];

export default function App( ) {

  const listRef = useRef(null);

  const [avaliacoes, setAvaliacoes] = useState({}); // função pra salvar o estados das avalicoes

  const irParaItem = (index) => {
    listRef.current.scrollToIndex({
      index: index,
      animated: true,
    });
  };
  
 const avaliarItem = async (id, nota) => {  // função para fazer e gurda a avaliação
  const novasAvaliacoes = {
    ...avaliacoes,
    [id]: nota,
  };

  setAvaliacoes(novasAvaliacoes);

  try {   // try e catcher para previnir qualquer erro
    await AsyncStorage.setItem('avaliacoes', JSON.stringify(novasAvaliacoes));
  } catch (e) {
    console.log('Erro ao salvar avaliações');
  }
};

useEffect(() => {
  carregarAvaliacoes();
}, []);

const carregarAvaliacoes = async () => { // função para carregar as avaliações quando abrirr o app
  try {  // try e catcher para previnir qualquer erro
    const dados = await AsyncStorage.getItem('avaliacoes');
    if (dados !== null) {
      setAvaliacoes(JSON.parse(dados));
    }
  } catch (e) {
    console.log('Erro ao carregar avaliações');
  }
};

  const renderEstrelas = (itemId) => {  // funçao para renderizar estrelas
    const notaAtual = avaliacoes[itemId] || 0;
    return(
      <View style={{flexDirection: 'row', marginTop: 5}}>
        {[1,2,3,4,5].map((num) => 
          <TouchableOpacity key={num} onPress = {() => avaliarItem(itemId, num)}>
            <Text>
              {num <= notaAtual ? '⭐' : '☆'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
    <StatusBar hidden={false}/>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.barra}
      >
        <TouchableOpacity style={styles.botao} onPress={() => irParaItem(0)}>
          <Text>Cafes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => irParaItem(0)}>
          <Text>Cafes Quente</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.botao} onPress={() => irParaItem(4)}>
          <Text>Cafes Frio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => irParaItem(6)}>
          <Text>Outras Bebidas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => irParaItem(7)}>
          <Text>Comidas</Text>
        </TouchableOpacity>
      </ScrollView>

      <FlatList
        ref={listRef}
        data={MENU}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20 }}
        renderItem={( {item}) => (
          <View style={styles.card}>
            <Image source={item.imagem} style={styles.imagem} />
          <View style={styles.info}>
              <Text style={styles.textoflatlist}>{item.nome}</Text>
              <Text style={styles.preco}>{item.preco}</Text>
              {renderEstrelas(item.id)}
          </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C19A6B',
    paddingTop: StatusBar.currentHeight,
  },
  barra: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  botao: {
    backgroundColor: '#7E8C54',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 1,
    borderRadius: 5,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F3E5D8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 15,
    alignItems: 'center',
    elevation: 3,
  },
  imagem: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  textoflatlist: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  preco: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left'
  },
});
