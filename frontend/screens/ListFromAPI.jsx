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
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode'

const Stack = createNativeStackNavigator();
const apiPath = "http://10.0.2.2:3000/"
export const purpleThemeColour ="#662997"

const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ""

/**
 * 
 * @function ListFromAPI
 * @module ListFromAPI
 * @description full page of to display list of shelters and their details
 */
 function ListFromAPI({ query }) {
  const listName = capitalize(query) + "List";
  return (
    <Stack.Navigator initialRouteName={listName}>
      <Stack.Screen
        name={listName}
        options={{ headerShown: true, headerTintColor: "#662997", headerStyle: styles.header }}
      >
        {({ navigation }) => <ShelterList navigation={navigation} query={query} />}
      </Stack.Screen>
      <Stack.Screen
        name={capitalize(query) + "Details"}
        component={DisplayShelter}
        options={{ headerShown: true, headerTintColor: "#662997", headerStyle: styles.header }}
      />
      <Stack.Screen
      name = {"Review " + capitalize(query)}
      component = {WriteReview}
      options={{headerShown:true, headerTintColor:purpleThemeColour, headerStyle:styles.header}}
      />
    </Stack.Navigator>
  );
}

async function getInfoFromApi(query) {
  try {
    const response = await fetch(
      //ipv4 localhost since running emulator
      //10.0.2.2 is your machine's localhost when on an android emulator
      apiPath + query,
      //"http://192.168.2.49:3000/" + query,
      {
        method: "Get",
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getInfoFromApiById(query, id) {
  try {
    const response = await fetch(
      //ipv4 localhost since running emulator
      //10.0.2.2 is your machine's localhost when on an android emulator
      apiPath + query +'/' + id,
      //"http://192.168.2.49:3000/" + query,
      {
        method: "Get",
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getProfileIdFromToken(){
  let token = await SecureStore.getItemAsync('token')
  let decoded = await jwt_decode(token);
  return decoded.id;
}
/*

      */

/**
 * @function ShelterList display list of shelters
 * @module ShelterList ShelterList
 * @description display list of shelters
 * @param {*} navigation - screen navigator used to traverse between list of shelters and shelter details
 * 
 */
function ShelterList({ navigation, query }) {
  const [information, setInformation] = useState([
    { name: "Error " + query + " not loaded" },
  ]);
  const [sheltersRefreshing, setSheltersRefreshing] = useState(false)

  const onScreenLoad = () => {
    //when load grab shelters from api and put them into the shelters state
    getInfoFromApi(query)
      .then((response) => response.json())
      .then((json) => setInformation(json))
      .catch((error) => console.error(error));
  };
  //essentially componentWillMount
  useEffect(() => {
    onScreenLoad();
  }, []);

  async function refreshSheltersFromApi(){
    setSheltersRefreshing(true)
    getInfoFromApi(query)
    setSheltersRefreshing(false)
  }
  return (
    <FlatList
      data={information}
      refreshing={sheltersRefreshing}
      onRefresh={refreshSheltersFromApi}
      renderItem={({ item, index, separators }) => {
        return (
          <TouchableHighlight
            onPress={() => {
              navigation.navigate(capitalize(query) + "Details", {item:item, query:query});
            }}
          >
            <View style={styles.box}>
              {item.picture?<Image style={styles.icon} source={{ uri: item.picture }} /> : null}
              <View style={{ flex: 1 }}>
                <Text style={styles.text} numberOfLines={1}>
                  Name: {item.name}
                </Text>
                {item.address && <Text style={styles.text} numberOfLines={1}>
                  Address: {item.address}
                </Text>}
                <Text style={styles.text} numberOfLines={1}>
                  Phone: {item.phoneNumber}
                </Text>
                <Text style={styles.text} numberOfLines={1}>
                  Tags: {item.tags ? getTags(item.tags) : "None"}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )
      }}
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
const getTags = (tags) => {
  let toRet = ''
  for (let i = 0; i < tags.length; i++) {
    toRet += tags[i].tagName
    if (i != tags.length - 1) toRet += ", "
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
const DisplayShelter = ({ route, navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [info, setInfo] = useState(route.params.item)
  const query = route.params.query;

  
  async function refreshShelters(){
    setRefreshing(true)
    let res = await getInfoFromApiById(query, info._id)
    if(res.status == 200){
      res.json().then((json) => setInfo(json))
    }
    setRefreshing(false)
  }

  
  return (
    <>
      <FlatList
      refreshing={refreshing}
      onRefresh={refreshShelters}
        ListHeaderComponent={
          <>
          {info.picture?
            <ImageBackground
              style={styles.largePic}
              source={{ uri: info.picture }}
            >
            </ImageBackground>
          : null}
            <Text style={styles.expandedText}>Name: {info.name}</Text>
            {info.address ? <Text style={styles.expandedText}>
              Address: {info.address}
              {info.postalCode}
            </Text>: null}
            <Text style={styles.expandedText}>
              phoneNumber: {info.phoneNumber}
            </Text>
            <Text style={styles.expandedText}>Email: {info.email}</Text>
            <Text style={styles.expandedText}>
              Description: {info.description}
            </Text>
            {info.hours ? <Text style={styles.expandedText}>Hours: {info.hours}</Text>:null}
            {info.rating ? <View flexDirection='row'>
            <Text style={styles.expandedText}>Rating:</Text>
            <Rating readonly="true" startingValue={info.rating} tintColor={purpleThemeColour} imageSize={40} jumpValue={0.5}/>
            </View>: null}
            <DisplayTags tags={info.tags} />
            {info.reviews ?
            <Button onPress={() => {navigation.navigate("Review " + capitalize(query), {infoId:info._id, query:query})}} title="Review This Shelter" color={purpleThemeColour}/> :
            null}
            {info.website ? <Button title="Go to website" onPress={() => {
              Linking.openURL(info.website);
            }} />: null}
          </>
        }
        data={info.reviews}
        renderItem={({ item, index }) => (
          <View style={styles.reviewBox} key={item}>
            <Text style={styles.reviewText}>"{item.content}"</Text>
            <View flexDirection="row">
            <Text style={styles.reviewText}>Rating: </Text>
            <Rating readonly="true" startingValue={item.rating} tintColor={purpleThemeColour} imageSize={25} />
            </View>
            <Text style={styles.reviewText}>Written on {FormatDate(item.date)}</Text>
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
  const [reviewer, setReviewer] = useState(null)
  const reviewParams = route.params;
  
  async function onScreenLoad(){
    //when load grab shelters from api and put them into the shelters state
    let profId = await getProfileIdFromToken()
    setReviewer(profId)

  };
  //essentially componentWillMount
  useEffect(() => {
    onScreenLoad();
  }, []);

  useEffect(() =>{
    getReviewFromApi()
  }, [reviewer])

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
        apiPath + reviewParams.query +"/" + reviewParams.infoId + "/review/" + reviewer,
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

  async function DeleteReviewFromApi(){
    try {
      const response = await fetch(
        //ipv4 localhost since running emulator
        //10.0.2.2 is your machine's localhost when on an android emulator
        apiPath + reviewParams.query+"/"+ reviewParams.infoId + "/review/" + reviewer,
        {
          method: "DELETE",
        }
      );
      return
    } catch (error) {
      console.error(error);
    }
  }

  async function DeleteReview(){
    Alert.alert(
      "Are you sure",
      "Once you delete this review, you cannot get it back",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "OK", onPress: () => {DeleteReviewFromApi(); navigation.goBack()} }
      ]
    );
    //DeleteReviewFromApi()
    //navigation.goBack()
  }

  async function sendReviewToApi(body){
    try{
      let method
      if (editReview) method="PATCH"; else method = "POST"

      const response = await fetch(
        //ipv4 localhost since running emulator
        //10.0.2.2 is your machine's localhost when on an android emulator
        apiPath + reviewParams.query+"/" + reviewParams.infoId + "/review/" + reviewer,
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
      <View alignItems={"center"}><Text style={styles.writeReviewText}>Type Your Review Here</Text></View>
      
      <View style = {styles.writeReviewBox}>
        <TextInput
          multiline={true}
          defaultValue={review.content}
          placeholder="Enter Review Here"
          maxLength={400}
          onChangeText={(content)=> setReview({content:content, rating:review.rating, date:review.date})}/>
      </View>
      <View style={{padding:'1%'}}/>
      <View style={{flex:0.5, flexDirection:'row', justifyContent:'center'}}>
        <Rating startingValue={review.rating} 
        tintColor={purpleThemeColour} 
        jumpValue={0.5}
        onFinishRating={setTempRev}
      />
      </View>
      <Button title="publish review" color={purpleThemeColour} onPress={() => {
        setReadyToPublish(true)
      }}></Button>
      <Button title="Delete Review" color="red" onPress={DeleteReview}/>
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
      keyExtractor={(item, index) => index.toString()} />
  );
};

export const FormatDate = (dateString) => {
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
    borderColor: purpleThemeColour,
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
    borderColor: purpleThemeColour,
  },
  tagText: {
    fontSize: 12,
    color: purpleThemeColour,
  },
  expandedText: {
    //flex: 1,
    //flexWrap:'wrap',
    margin: 2,
    fontSize: 16,
    color: purpleThemeColour,
  },
  reviewText: {
    //flex: 1,
    //flexWrap:'wrap',
    margin: 2,
    fontSize: 16,
    color: purpleThemeColour,
    flexWrap: "wrap",
  },
  reviewButton:{
    color:"purple"
  },
  reviewBox: {
    // flexWrap: "wrap",
    backgroundColor: "white",
    borderColor: purpleThemeColour,
    borderWidth: 1,
  }, header:{
    
  },
  writeReviewBox:{
    backgroundColor: "white",
    borderColor: purpleThemeColour,
    borderWidth: 1,
    flex:0,
    width:'100%',
    height:'40%'
  },
  writeReviewText:{
    color:purpleThemeColour,
    fontSize:16,
  }
});

export default ListFromAPI;
;
