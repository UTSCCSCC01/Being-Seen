import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { render } from "react-dom";
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
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//export default function App() {
const Stack = createNativeStackNavigator();

/**
 *
 * @function Merchant
 * @module Merchant
 * @description full page of to display list of merchants and their details
 */
function Merchant() {
  return (
    <Stack.Navigator
      initialRouteName="MerchantList"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="MerchantList"
        component={MerchantList}
        options={{
          headerTintColor: "#662997",
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name="ShelterDetails"
        component={DisplayMerchant}
        options={{
          headerTintColor: "#662997",
          headerStyle: styles.header,
        }}
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
function MerchantList({ navigation }) {
  const [merchants, setMerchants] = useState([
    { name: "Error merchants not loaded" },
  ]);

  const onScreenLoad = () => {
    //when load grab shelters from api and put them into the shelters state
    getMerchantsFromApi()
      .then((response) => response.json())
      .then((json) => setMerchants(json))
      .catch((error) => console.error(error));
  };
  //essentially componentWillMount
  useEffect(() => {
    onScreenLoad();
  }, []);

  async function getMerchantsFromApi() {
    try {
      const response = await fetch("http://10.0.2.2:3000/merchant", {
        method: "Get",
      });
      console.log("fetched");
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <FlatList
      data={merchants}
      renderItem={({ item, index, separators }) => (
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("MerchantDetails", item);
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
                Tags: {item.tags ? getTags(item.tags) : "None"}
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
const getTags = (tags) => {
  let toRet = "";
  for (let i = 0; i < tags.length; i++) {
    toRet += tags[i].tagName;
    if (i != tags.length - 1) toRet += ", ";
  }
  return toRet;
};

/**
 * @function DisplayShelter displays expanded details of a shelter
 * @module DisplayShelter DisplayShelter
 * @description displays expanded details of a shelter
 * @param {*} param0 recieves object containg route and navigation from react navigation
 *
 */
const DisplayMerchant = ({ route, navigation }) => {
  const shelter = route.params;
  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            <ImageBackground
              style={styles.largePic}
              source={{ uri: shelter.picture }}
            ></ImageBackground>
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
            <Text style={styles.expandedText}>Rating: {shelter.rating}/5</Text>
            <DisplayTags tags={shelter.tags} />
          </>
        }
        data={shelter.reviews}
        renderItem={({ item, index }) => (
          <View style={styles.reviewBox} key={item}>
            <Text style={styles.reviewText}>"{item.content}"</Text>
            <Text style={styles.reviewText}>Rating: {item.rating}/5</Text>
            <Text style={styles.reviewText}>Written on: {item.date}</Text>
          </View>
        )}
        keyExtractor={(item, index) => item.reviewer.toString()}
      />
    </>
  );
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
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

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
  reviewBox: {
    // flexWrap: "wrap",
    backgroundColor: "white",
    borderColor: "#662997",
    borderWidth: 1,
  },
  header: {},
});

export default Merchant;
