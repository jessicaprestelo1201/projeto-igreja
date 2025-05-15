import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const livrosOriginais = [
    { sigla: "Gn", nome: "Gênesis", cor: "#f88", cap: 50, vers: 1533 },
    { sigla: "Êx", nome: "Êxodo", cor: "#f88", cap: 40, vers: 1213 },
    { sigla: "Lv", nome: "Levítico", cor: "#f88", cap: 27, vers: 859 },
    { sigla: "Nm", nome: "Números", cor: "#f88", cap: 36, vers: 1288 },
    { sigla: "Dt", nome: "Deuteronômio", cor: "#f88", cap: 34, vers: 959 },
    { sigla: "Js", nome: "Josué", cor: "#f66", cap: 24, vers: 658 },
    { sigla: "Jz", nome: "Juízes", cor: "#f66", cap: 21, vers: 618 },
    { sigla: "Rt", nome: "Rute", cor: "#f66", cap: 4, vers: 85 },
    { sigla: "1Sm", nome: "I Samuel", cor: "#f66", cap: 31, vers: 811 },
    { sigla: "2Sm", nome: "II Samuel", cor: "#f66", cap: 24, vers: 695 },
    { sigla: "1Rs", nome: "I Reis", cor: "#f66", cap: 22, vers: 817 },
    { sigla: "2Rs", nome: "II Reis", cor: "#f66", cap: 25, vers: 719 },
    { sigla: "1Cr", nome: "I Crônicas", cor: "#f66", cap: 29, vers: 942 },
    { sigla: "2Cr", nome: "II Crônicas", cor: "#f66", cap: 36, vers: 822 },
    { sigla: "Ed", nome: "Esdras", cor: "#f66", cap: 10, vers: 280 },
    { sigla: "Ne", nome: "Neemias", cor: "#f66", cap: 13, vers: 406 },
    { sigla: "Et", nome: "Ester", cor: "#f66", cap: 10, vers: 167 },
    { sigla: "Jó", nome: "Jó", cor: "#9f9", cap: 42, vers: 1070 },
    { sigla: "Sl", nome: "Salmos", cor: "#9f9", cap: 150, vers: 2461 },
    { sigla: "Pv", nome: "Provérbios", cor: "#9f9", cap: 31, vers: 915 },
    { sigla: "Ec", nome: "Eclesiastes", cor: "#9f9", cap: 12, vers: 222 },
    { sigla: "Ct", nome: "Cantares", cor: "#9f9", cap: 8, vers: 117 },
    { sigla: "Is", nome: "Isaías", cor: "#6f6", cap: 66, vers: 1292 },
    { sigla: "Jr", nome: "Jeremias", cor: "#6f6", cap: 52, vers: 1364 },
    { sigla: "Lm", nome: "Lamentações", cor: "#6f6", cap: 5, vers: 154 },
    { sigla: "Ez", nome: "Ezequiel", cor: "#6f6", cap: 48, vers: 1273 },
    { sigla: "Dn", nome: "Daniel", cor: "#6f6", cap: 12, vers: 357 },
    { sigla: "Os", nome: "Oseias", cor: "#ff8", cap: 14, vers: 197 },
    { sigla: "Jl", nome: "Joel", cor: "#ff8", cap: 3, vers: 73 },
    { sigla: "Am", nome: "Amós", cor: "#ff8", cap: 9, vers: 146 },
    { sigla: "Ob", nome: "Obadias", cor: "#ff8", cap: 1, vers: 21 },
    { sigla: "Jn", nome: "Jonas", cor: "#ff8", cap: 4, vers: 48 },
    { sigla: "Mq", nome: "Miqueias", cor: "#ff8", cap: 7, vers: 105 },
    { sigla: "Na", nome: "Naum", cor: "#ff8", cap: 3, vers: 47 },
    { sigla: "Hc", nome: "Habacuque", cor: "#ff8", cap: 3, vers: 56 },
    { sigla: "Sf", nome: "Sofonias", cor: "#ff8", cap: 3, vers: 53 },
    { sigla: "Ag", nome: "Ageu", cor: "#ff8", cap: 2, vers: 38 },
    { sigla: "Zc", nome: "Zacarias", cor: "#ff8", cap: 14, vers: 211 },
    { sigla: "Ml", nome: "Malaquias", cor: "#ff8", cap: 4, vers: 55 },
    { sigla: "Mt", nome: "Mateus", cor: "#fc3", cap: 28, vers: 1071 },
    { sigla: "Mc", nome: "Marcos", cor: "#fc3", cap: 16, vers: 678 },
    { sigla: "Lc", nome: "Lucas", cor: "#fc3", cap: 24, vers: 1151 },
    { sigla: "Jo", nome: "João", cor: "#fc3", cap: 21, vers: 879 },
    { sigla: "At", nome: "Atos", cor: "#f88", cap: 28, vers: 1007 },
    { sigla: "Rm", nome: "Romanos", cor: "#8ff", cap: 16, vers: 433 },
    { sigla: "1Co", nome: "I Coríntios", cor: "#8ff", cap: 16, vers: 437 },
    { sigla: "2Co", nome: "II Coríntios", cor: "#8ff", cap: 13, vers: 256 },
    { sigla: "Gl", nome: "Gálatas", cor: "#8ff", cap: 6, vers: 149 },
    { sigla: "Ef", nome: "Efésios", cor: "#8ff", cap: 6, vers: 155 },
    { sigla: "Fp", nome: "Filipenses", cor: "#8ff", cap: 4, vers: 104 },
    { sigla: "Cl", nome: "Colossenses", cor: "#8ff", cap: 4, vers: 95 },
    { sigla: "1Ts", nome: "I Tessalonicenses", cor: "#8ff", cap: 5, vers: 89 },
    { sigla: "2Ts", nome: "II Tessalonicenses", cor: "#8ff", cap: 3, vers: 47 },
    { sigla: "1Tm", nome: "I Timóteo", cor: "#8ff", cap: 6, vers: 113 },
    { sigla: "2Tm", nome: "II Timóteo", cor: "#8ff", cap: 4, vers: 83 },
    { sigla: "Tt", nome: "Tito", cor: "#8ff", cap: 3, vers: 47 },
    { sigla: "Fm", nome: "Filemon", cor: "#8ff", cap: 1, vers: 25 },
    { sigla: "Hb", nome: "Hebreus", cor: "#6cf", cap: 13, vers: 303 },
    { sigla: "Tg", nome: "Tiago", cor: "#6cf", cap: 5, vers: 108 },
    { sigla: "1Pe", nome: "I Pedro", cor: "#6cf", cap: 5, vers: 105 },
    { sigla: "2Pe", nome: "II Pedro", cor: "#6cf", cap: 3, vers: 61 },
    { sigla: "1Jo", nome: "I João", cor: "#6cf", cap: 5, vers: 105 },
    { sigla: "2Jo", nome: "II João", cor: "#6cf", cap: 1, vers: 13 },
    { sigla: "3Jo", nome: "III João", cor: "#6cf", cap: 1, vers: 14 },
    { sigla: "Jd", nome: "Judas", cor: "#6cf", cap: 1, vers: 25 },
    { sigla: "Ap", nome: "Apocalipse", cor: "#c6f", cap: 22, vers: 404 },
];

function embaralharArray(array) {
  return array
    .map(item => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export default function Home() {
  const [livros, setLivros] = useState([]);
  const [ordemAtual, setOrdemAtual] = useState("embaralhada");

  useEffect(() => {
    setLivros(embaralharArray(livrosOriginais));
  }, []);

  const ordenar = (criterio) => {
    let novaLista = [...livros];

    if (criterio === 'nome') {
      novaLista.sort((a, b) => a.nome.localeCompare(b.nome));
      setOrdemAtual("nome");
    } else if (criterio === 'cap') {
      novaLista.sort((a, b) => b.cap - a.cap);
      setOrdemAtual("capítulos");
    } else if (criterio === 'vers') {
      novaLista.sort((a, b) => b.vers - a.vers);
      setOrdemAtual("versículos");
    } else {
      novaLista = embaralharArray(livrosOriginais);
      setOrdemAtual("embaralhada");
    }

    setLivros(novaLista);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={() => ordenar('nome')}>
          <Text style={styles.buttonText}>A-Z</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => ordenar('cap')}>
          <Text style={styles.buttonText}>Capítulos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => ordenar('vers')}>
          <Text style={styles.buttonText}>Versículos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => ordenar('reset')}>
          <Text style={styles.buttonText}>Embaralhar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {livros.map((livro, index) => (
          <View key={index} style={[styles.card, { backgroundColor: livro.cor }]}>
            <Text style={styles.sigla}>{livro.sigla}</Text>
            <Text style={styles.versiculo}>Cap {livro.cap}</Text>
            <Text style={styles.versiculo}>Vers {livro.vers}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingVertical: 10,
    backgroundColor: '#eee',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    width: 70,
    height: 70,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  sigla: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  versiculo: {
    fontSize: 10,
    color: '#fff',
  },
});
