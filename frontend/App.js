import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { render } from 'react-dom';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

//export default function App() {
export default function Shelter(){
  const[shelters, setShelters] = useState([{name:"Error shelters not loaded"}])


  const onScreenLoad = () => {
    //when load grab shelters from api and put them into the shelters state
    getSheltersFromApi()
    .then((response) => response.json())
    .then((json) => setShelters(json))
    .catch((error) => console.error(error))
  }
        //essentially componentWillMount
  useEffect(() => {
      onScreenLoad();
  }, [])
  
  //do fetch request to api to get all shelters
  async function getSheltersFromApi() {
    try {
      const response = await fetch(
        //ipv4 localhost since running emulator
        //10.0.2.2 is your machine's localhost when on an android emulator
        'http://10.0.2.2:3000/shelter', {
          method:'Get'
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

    return (
      <ScrollView contentContainerStyle={styles.background}>
        <Text>{shelters[0].name} </Text>
        {/*
        <View style={styles.box}>
          <Text> Testing </Text>
          </View>
          <View style={styles.box}>
          <Text> Testing </Text>
          </View>
          <View style={styles.box}>
          <Text> Testing </Text>
          </View>
          <View style={styles.box}>
          <Text> Testing </Text>
          </View>
          <View style={styles.box}>
          <Text> Testing testing Testing Testing</Text>
          </View>
          */}
      </ScrollView>)
}

const shelterList = (props) => {
  const listShelters = props.map((shelter) =>
  <li>{shelter.name}</li>
  );
  return(
    <div>{listShelters}</div>
  )

  /*
  const shelters = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
  */
}
const styles = StyleSheet.create({
  padding:{
    backgroundColor: "rebeccapurple",
  },
  background: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '10%',
    paddingBottom: '15%'
  },
  box: {
    flex: 1,
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    borderColor: "rebeccapurple",
    borderStyle: "solid",
    borderWidth: 1,
    margin:1
  }
});