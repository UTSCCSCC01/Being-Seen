import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Rating} from 'react-native-ratings';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableHighlight,
  Dimensions,
  Button,
  ImageBackground,
  TextInput,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//export default function App() {
const Stack = createNativeStackNavigator();
const apiPath = "http://10.0.2.2:3000/shelter"
/**
 * 
 * @function Shelter
 * @module Shelter
 * @description full page of to display list of shelters and their details
 */
function Shelter() {
  return (
    <Stack.Navigator initialRouteName="ShelterList">
      <Stack.Screen
        name="Shelter List"
        component={ShelterList}
        options={{ headerShown: true, headerTintColor: "#662997", headerStyle:styles.header}}
      />
      <Stack.Screen
        name="Shelter Details"
        component={DisplayShelter}
        options={{ headerShown: true, headerTintColor: "#662997", headerStyle:styles.header}}
      />
      <Stack.Screen
      name = "Review Shelter"
      component = {WriteReview}
      options={{headerShown:true, headerTintColor:"#662997", headerStyle:styles.header}}
      />

    </Stack.Navigator>
  );
}

/**
 * @function ShelterList display list of shelters
 * @module ShelterList ShelterList
 * @description display list of shelters
 * @param {*} navigation - screen navigator used to traverse between list of shelters and shelter details
 * 
 */
function ShelterList({ navigation }) {
  const [shelters, setShelters] = useState([
    { name: "Error shelters not loaded" },
  ]);
  const [sheltersRefrshing, setSheltersRefreshing] = useState(false)

  const onScreenLoad = () => {
    //when load grab shelters from api and put them into the shelters state
    getSheltersFromApi()
      .then((response) => response.json())
      .then((json) => setShelters(json))
      .catch((error) => console.error(error));
  };
  //essentially componentWillMount
  useEffect(() => {
    onScreenLoad();
  }, []);

  async function getSheltersFromApi() {
    try {
      const response = await fetch(
        //ipv4 localhost since running emulator
        //10.0.2.2 is your machine's localhost when on an android emulator
        apiPath,
        {
          method: "Get",
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  async function refreshSheltersFromApi(){
    setSheltersRefreshing(true)
    getSheltersFromApi()
    setSheltersRefreshing(false)
  }
  return (
    <FlatList
      data={shelters}
      onRefresh={refreshSheltersFromApi}
      refreshing={sheltersRefrshing}
      renderItem={({ item, index, separators }) => (
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("Shelter Details", item._id);
          }}
        >
          <View style={styles.box}>
            <Image style={styles.icon} source={{ uri: item.picture }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.text} numberOfLines={1}>
                Name: {item.name}
              </Text>
              <Text style={styles.text} numberOfLines={1}>
                Address: {item.address}
              </Text>
              <Text style={styles.text} numberOfLines={1}>
                Phone: {item.phoneNumber}
              </Text>
              <Text style={styles.text} numberOfLines={1}>
                Tags: {item.tags ? getTags(item.tags): "None"}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      )}
      keyExtractor={(item, index) => index.toString()}
      style={styles.scrollBackground}
    />
  );
}
/**
 * @function getTags function responsible for extracting and formatting names of tags for a shelter
 * @module getTags getTags
 * @description function responsible for extracting and formatting names of tags for a shelter
 * @param {Tag[]} tags array of tags for a shelter
 * 
 */
const getTags = (tags) =>{
  let toRet = ''
  for(let i = 0; i < tags.length; i++){
    toRet += tags[i].tagName
    if(i != tags.length - 1) toRet += ", "
  }
  return toRet
}

/**
 * @function DisplayShelter displays expanded details of a shelter
 * @module DisplayShelter DisplayShelter
 * @description displays expanded details of a shelter
 * @param {*} param0 recieves object containg route and navigation from react navigation
 * 
 */
function DisplayShelter({ route, navigation }) {
  const shelterId = route.params
  const [shelter, setShelter] = useState({})
  const [refreshingShelter, setRefreshingShelter] = useState(false)

  const onScreenLoad = () => {
    //when load grab shelters from api and put them into the shelters state
    getShelterByIdFromApi()
  };
  //essentially componentWillMount
  useEffect(() => {
    onScreenLoad();
  }, []);
  async function getShelterByIdFromApi() {
    try {
      const response = await fetch(
        //ipv4 localhost since running emulator
        //10.0.2.2 is your machine's localhost when on an android emulator
        apiPath+"/"+shelterId,
        {
          method: "GET",
        }
      );
      if(response.status == 200){
        response.json().then((json) => setShelter(json))
      }else{
        console.log(apiPath+"/"+shelterId)
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  async function refreshShelterFromApi(){
    setRefreshingShelter(true)
    await getShelterByIdFromApi()
    setRefreshingShelter(false)
  }
  return (
    <>
      <FlatList
        onRefresh={refreshShelterFromApi}
        refreshing={refreshingShelter}
        ListHeaderComponent={
          <>
            <ImageBackground
              style={styles.largePic}
              source={{ uri: shelter.picture }}
            >
            </ImageBackground>
            <Text style={styles.expandedText}>Name: {shelter.name}</Text>
            <Text style={styles.expandedText}>
              Address: {shelter.address}
              {shelter.postalCode}
            </Text>
            <Text style={styles.expandedText}>
              phoneNumber: {shelter.phoneNumber}
            </Text>
            <Text style={styles.expandedText}>Email: {shelter.email}</Text>
            <Text style={styles.expandedText}>
              Description: {shelter.description}
            </Text>
            <Text style={styles.expandedText}>Hours: {shelter.hours}</Text>
            <View flexDirection='row'>
            <Text style={styles.expandedText}>Rating:</Text>
            <Rating readonly="true" startingValue={shelter.rating} tintColor={"#662997"} imageSize={40}/>
            </View>
            <DisplayTags tags={shelter.tags} />
            <Button onPress={() => {navigation.navigate("Review Shelter", {shelterId:shelterId, reviewer:"215322c038ded1fcd0cfdae6"})}} title="Review This Shelter" color="#662997"/>
          </>
        }
        data={shelter.reviews}
        renderItem={({ item, index }) => (
          <View style={styles.reviewBox} key={item}>
            <Text style={styles.reviewText}>"{item.content}"</Text>
            <View flexDirection="row">
            <Text style={styles.reviewText}>Rating: </Text>
            <Rating readonly="true" startingValue={item.rating} tintColor={"#662997"} imageSize={25} />
            </View>
            <Text style={styles.reviewText}>Written on {DisplayDate(item.date)}</Text>
          </View>
        )}
        keyExtractor={(item, index) => item.reviewer.toString()}
      />
    </>
  );
};
/**
 * @function WriteReview
 * @module WriteReview
 * @description displays the page responsible for handling the creation/editing of reviews
 * @param {*} param0 recieves object containing navigation and routing params
 * @returns 
 */
function WriteReview({route, navigation}){
  const [review, setReview] = useState(
    { content: "",
      rating: 0,
      date: new Date()},
  );
  //local version of review rating since onFinishRating has unwanted effects on whole object
  const [tempRev, setTempRev] = useState(0)
  const [editReview, setEditReview] = useState(false)
  const [readyToPublish, setReadyToPublish] = useState(false)
  const reviewParams = route.params;
  
  const onScreenLoad = () => {
    //when load grab shelters from api and put them into the shelters state
    getReviewFromApi()

  };
  //essentially componentWillMount
  useEffect(() => {
    onScreenLoad();
  }, []);

  useEffect(() =>{
    if(readyToPublish){
      sendReviewToApi(JSON.stringify({content: review.content, rating:review.rating}))
      navigation.goBack()
    }
    setReadyToPublish(false)
  }, [readyToPublish])

  useEffect(()=>{
    if(tempRev != -1){
      setReview({content:review.content, rating:tempRev, date:new Date()})
    }
  },[tempRev])

  async function getReviewFromApi() {
    try {
      const response = await fetch(
        //ipv4 localhost since running emulator
        //10.0.2.2 is your machine's localhost when on an android emulator
        apiPath +"/" + reviewParams.shelterId + "/review/" + reviewParams.reviewer,
        {
          method: "Get",
        }
      );
      if(response.status == 200){ 
        response.json().then((json) => setReview(json))
        setEditReview(true)
      }
      return
    } catch (error) {
      console.error(error);
    }
  }

  async function sendReviewToApi(body){
    try{
      let method
      if (editReview) method="PATCH"; else method = "POST"

      const response = await fetch(
        //ipv4 localhost since running emulator
        //10.0.2.2 is your machine's localhost when on an android emulator
        apiPath +"/" + reviewParams.shelterId + "/review/" + reviewParams.reviewer,
        {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: body
        })
    }catch(error){
      console.error(error)
    }
  }
  
  
  return(
    <View>
      <Text>Content</Text>
      <View style = {styles.reviewBox}>
        <TextInput
          defaultValue={review.content}
          placeholder="Enter Review Here"
          onChangeText={(content)=> setReview({content:content, rating:review.rating, date:review.date})}/>
      </View>
      <Text> Rating: {review.rating}</Text>
      <Rating startingValue={review.rating} 
      tintColor="#662997" 
      jumpValue={0.5}
      onFinishRating={setTempRev}
      />
      <Text>Test: {editReview.toString()}</Text>
      <Button title="publish review" color="#662997" onPress={() => {
        setReadyToPublish(true)
      }}></Button>
    </View>
  )
};


/**
 * @function DisplayTags
 * @module DisplayTags
 * @description displays given tags within a flatlist of boxes
 * @param {*} props propety object which contains tags
 * 
 */
export const DisplayTags = (props) => {
  const tags = props.tags;
  return (
    <FlatList
      horizontal={true}
      data={tags}
      renderItem={({ item, index, separators }) => (
        <View style={styles.tagBox}>
          <Text>{item.tagName}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}/>
  );
};

export const DisplayDate = (dateString) => {
  let date = new Date(dateString);
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return weekdays[date.getDay()] + " " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  displayBackground: {
    flex: 1,
    backgroundColor: "#fffefc",
    alignItems: "flex-start",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  scrollBackground: {
    // flex: 1,
    //backgroundColor: '#fff',
    // alignItems: 'center',
    //justifyContent: 'center',
    //flexDirection: 'row',
    //alignItems: 'flex-start',
    // justifyContent:'center',
    backgroundColor: "white",
    flex: 1,
  },
  box: {
    flex: 1,
    //width: "120%",
    //height: "15%",
    backgroundColor: "white",
    borderColor: "#662997",
    borderStyle: "solid",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    margin: 1,
  },
  icon: {
    width: "25%",
    height: "99%",
    flex: 0.25,
  },
  largePic: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 4,
    resizeMode: "cover",
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
  },
  tagBox: {
    margin: 2,
    borderRadius: 5,
    backgroundColor: "gainsboro",
    borderColor: "#662997",
  },
  tagText: {
    fontSize: 12,
    color: "#662997",
  },
  expandedText: {
    //flex: 1,
    //flexWrap:'wrap',
    margin: 2,
    fontSize: 16,
    color: "#662997",
  },
  reviewText: {
    //flex: 1,
    //flexWrap:'wrap',
    margin: 2,
    fontSize: 16,
    color: "#662997",
    flexWrap: "wrap",
  },
  reviewButton:{
    color:"purple"
  },
  reviewBox: {
    // flexWrap: "wrap",
    backgroundColor: "white",
    borderColor: "#662997",
    borderWidth: 1,
  }, header:{
    
  },
  writeReviewBox:{
    backgroundColor: "white",
    borderColor: "#662997",
    borderWidth: 1,
    flex:1
  }
});

export default Shelter;
