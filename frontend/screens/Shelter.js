import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { render } from 'react-dom';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, TouchableHighlight } from 'react-native';

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
      <View >
        <ShelterList shelters={shelters}/>
      </View>
    )
      {/*
      <ScrollView contentContainerStyle={styles.scrollBackground}>
        <ShelterList shelters={shelters}/>
        <Text>{shelters[0].name} </Text>
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
          
      </ScrollView>)*/}
}


const ShelterList = (props) => {
  const shelters = props.shelters
  try{
  return(
    <FlatList data={shelters}
    renderItem={({ item, index, separators }) => (
      <TouchableHighlight
        listkey={item.id}>
          <View style={styles.box}>
            <Image style={styles.icon} source={{uri:item.picture}}/>
            <Text style={styles.text} numberOfLines={1}>Name: {item.name}</Text>
            <Text style={styles.text} numberOfLines={1}>Address: {item.address}</Text>
            <Text style={styles.text} numberOfLines={1}>Phone: {item.phoneNumber}</Text>
            <Text style={styles.text} numberOfLines={2}>Description: {item.description}</Text>
          </View>
      </TouchableHighlight>
    )} style={styles.scrollBackground}/>)
  }catch(error){
    console.error(error)
    return(
      <Text>An Error has occured</Text>
    )
  }
  /*const listItems = shelters.map((shelter) =>
    <View style = {styles.box} key={shelter.id}>
      <Image source={{uri:shelter.picture}} style={styles.icon}/>
      <View style= {styles.boxText}>
        <Text>Name:{shelter.name}</Text>
        <Text>address: {shelter.address}</Text>
        <Text style = {{flexWrap: "wrap"}} numberOfLines={2} >Description: {shelter.description}</Text>
    </View>
    

    </View>
  );
  return(
    /*
    <View style = {styles.box}>
    <Image source={{uri: props.shelter.picture}} style={styles.icon}/>
    <Text>name:{props.shelter.name} {"\n"}address: {props.shelter.address}</Text>
    </View>
    
    <View style={styles.background}>{listItems}</View>\
    
  );*/
  /*
  const listShelters = props.map((shelter) =>
  <View style={styles.box}>
    <Text>{shelter.name}</Text>
  </View>
  );
  return(
    <View>{listShelters}</View>
  )
    */
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  scrollBackground:{
   // flex: 1,
    //backgroundColor: '#fff',
   // alignItems: 'center',
    //justifyContent: 'center',
    //flexDirection: 'row',
    //alignItems: 'flex-start',
   // justifyContent:'center',
    backgroundColor: 'grey',
    paddingTop: '15%',
    paddingBottom: '15%',
    flex:1
  },
  box: {
    flex: 1,
    //width: "120%",
    //height: "15%",
    backgroundColor: "white",
    borderColor: "rebeccapurple",
    borderStyle: "solid",
    justifyContent: 'flex-start',
    flexDirection:'column',
    flexWrap: 'wrap',
    borderWidth: 1,
    margin:1
  },
  icon: {
    width: '25%', 
    height:'99%'
  },
  text:{
    flex: 1, 
    flexWrap: 'wrap'
  }
});