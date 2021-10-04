import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { render } from 'react-dom';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, TouchableHighlight, Dimensions, Button, ImageBackground } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//export default function App() {
const Stack = createNativeStackNavigator();
function Shelter(){
    return (
      <Stack.Navigator initialRouteName='ShelterList' >
          <Stack.Screen name='ShelterList' component={ShelterList} options={{headerShown:false}}/>
          <Stack.Screen name='ShelterDetails' component={DisplayShelter} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

function ShelterList({navigation}){
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
  return(
    <FlatList data={shelters}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight
            listkey={item._id} onPress={()=> {navigation.navigate('ShelterDetails', item)}}>
              <View style={styles.box}>
              <Image style={styles.icon} source={{uri:item.picture}}/>
                <View style={{flex:1}}>
                <Text style={styles.text} numberOfLines={1}>Name: {item.name}</Text>
                <Text style={styles.text} numberOfLines={1}>Address: {item.address}</Text>
                <Text style={styles.text} numberOfLines={1}>Phone: {item.phoneNumber}</Text>
                <Text style={styles.text} numberOfLines={1}>Tags: {item.tags}</Text>
                </View>
              </View>
          </TouchableHighlight>
        )} style={styles.scrollBackground}/>
  )
}
/*
const ShelterList = (props) => {
  const [overlay, setOverlay]=useState(false)
  const [currShelter, setCurrShelter] =useState({id:"", name:"error has occured"})
  const shelters = props.shelters

  const toggleOverlay = () =>{
    setOverlay(!overlay)
  }

  try{  
    if(!overlay){
      return(
        <FlatList data={shelters}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight
            listkey={item._id} onPress={()=> {toggleOverlay(); setCurrShelter(item)}}>
              <View style={styles.box}>
              <Image style={styles.icon} source={{uri:item.picture}}/>
                <View style={{flex:1}}>
                <Text style={styles.text} numberOfLines={1}>Name: {item.name}</Text>
                <Text style={styles.text} numberOfLines={1}>Address: {item.address}</Text>
                <Text style={styles.text} numberOfLines={1}>Phone: {item.phoneNumber}</Text>
                <Text style={styles.text} numberOfLines={1}>Tags: {item.tags}</Text>
                </View>
              </View>
          </TouchableHighlight>
        )} style={styles.scrollBackground}/>)
    }
    else{
      return(
      <View style={styles.displayBackground}>
        <TouchableHighlight onPress={() => {toggleOverlay()}}>
          <Text>Back</Text>
        </TouchableHighlight>
        <DisplayShelter shelter={currShelter}/>
      </View>
      )
    }
  }catch(error){
    console.error(error)
    return(
      <View>
        <Text>Test</Text>
      </View>
    )
  }
}*/

const DisplayShelter = ({route, navigation})=>{
    const shelter = route.params
    return(
        <ScrollView contentContainerStyle={styles.displayBackground}>
          <ImageBackground style={styles.largePic} source={{uri:shelter.picture}}>
            <Button color= "#66299780" title="Go back" onPress={() => navigation.goBack()} />
          </ImageBackground>
          <Text style={styles.expandedText}>Name: {shelter.name}</Text>
          <Text style={styles.expandedText}>Address: {shelter.address}{shelter.postalCode}</Text>
          <Text style={styles.expandedText}>phoneNumber: {shelter.phoneNumber}</Text>
          <Text style={styles.expandedText}>Email: {shelter.email}</Text>
          <Text style={styles.expandedText}>Description: {shelter.description}</Text>
          <Text style={styles.expandedText}>Hours: {shelter.hours}</Text>
          <Text style={styles.expandedText}>Rating: {shelter.rating}/5</Text>
          <DisplayTags tags={shelter.tags}/>
          <DisplayReviews reviews={shelter.reviews}/>
        </ScrollView>
    )
}

export const DisplayReviews = (props) => {
  const reviews = props.reviews
  return(
   <FlatList  data={reviews} renderItem={({ item, index, separators }) => (
     <View style={styles.reviewBox}>
          <Text style={styles.reviewText}>"{item.content}"</Text>
          <Text style={styles.reviewText}>Rating: {item.rating}/5</Text>
          <Text style={styles.reviewText}>Written on: {item.date}</Text>
      </View>
   )}/>
  )
}

export const DisplayTags = (props) => {
   const tags = props.tags
   return(
    <FlatList horizontal={true} data={tags} renderItem={({ item, index, separators }) => (
      <View style={styles.tagBox}><Text >{item}</Text></View>
    )}/>
   )
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
  displayBackground: {
    flex: 1,
    backgroundColor: '#fffefc',
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
    backgroundColor: 'white',
    flex:1
  },
  box: {
    flex: 1,
    //width: "120%",
    //height: "15%",
    backgroundColor: "white",
    borderColor: "#662997",
    borderStyle: "solid",
    justifyContent: 'flex-start',
    flexDirection:'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    margin:1
  },
  icon: {
    width: '25%', 
    height:'99%',
    flex:0.25
  },
  largePic:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 4,
    resizeMode:'cover'

  },
  text:{
    flex: 1, 
    flexWrap: 'wrap'
  },
  tagBox:{
    margin: 2,
    borderRadius:5,
    backgroundColor:'gainsboro',
    borderColor:"#662997",
  },
  tagText:{
    fontSize:12,
    color:"#662997"
  },
  expandedText:{
    //flex: 1,
    //flexWrap:'wrap',
    margin:2,
    fontSize: 16,
    color: "#662997"
  },
  reviewText:{
    //flex: 1,
    //flexWrap:'wrap',
    margin:2,
    fontSize: 16,
    color: "#662997",
    flexWrap:'wrap'
  },
  reviewBox:{
    //flex:1,
    flexWrap:'wrap',
    backgroundColor:'white',
    borderColor: "#662997",
    borderWidth:1
  }
});

export default Shelter