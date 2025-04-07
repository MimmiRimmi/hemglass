import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Header from "../components/Header";
import { router } from 'expo-router';


import iceCreamImg from "@/assets/images/background-image.png";


export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header />
      <ImageBackground
        source={iceCreamImg}
        resizeMode="cover"
        style={styles.background}>

        <TouchableOpacity onPress={() => router.push('/products')} style={[ styles.buttonBase, styles.button1, ]}>
          <Text style={[ styles.text, styles.button1Text ]}>ALLA GLASSAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[ styles.buttonBase, styles.button2 ]}>
          <Text style={[ styles.text, styles.button2Text ]}>HITTA GLASSBILEN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[ styles.buttonBase, styles.button3 ]}>
          <Text style={[ styles.text, styles.button3Text ]}>KUNDKLUBB</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    fontFamily: 'Burbank',
    color: 'black',
    fontSize: 32,
    textAlign: 'center'
  },
  background: {
    flex: 1,
  },
  buttonBase: {
    width: 144,
    height: 144,
    borderRadius: 72,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button1: {
    backgroundColor: 'rgba(249, 197, 184, 0.75)',
    top: 75,
    left: 120,
    padding: 15,
  },
  button1Text: {
    color: "#DD0935",
  },
  button2: {
    backgroundColor: 'rgba(212, 229, 247, 0.75)',
    top: 90,
    left: 15,
  },
  button2Text: {
    color: "#007BC2",
  },
  button3: {
    backgroundColor: 'rgba(255, 233, 192, 0.75)',
    top: -55,
    left: 220,
  },
  button3Text: {
    color: "#D56E15",
  },
})