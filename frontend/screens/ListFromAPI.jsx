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
import * as Linking from 'expo-linking';

const Stack = createNativeStackNavigator();

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
function ShelterList({ navigation, query }) {
  const [information, setInformation] = useState([
    { name: "Error " + query + " not loaded" },
  ]);

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

  async function getInfoFromApi(query) {
    try {
      const response = await fetch(
        //ipv4 localhost since running emulator
        //10.0.2.2 is your machine's localhost when on an android emulator
        "http://192.168.2.49:3000/" + query,
        {
          method: "Get",
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <FlatList
      data={information}
      renderItem={({ item, index, separators }) => {
        return (
          <TouchableHighlight
            onPress={() => {
              navigation.navigate(capitalize(query) + "Details", item);
            }}
          >
            <View style={styles.box}>
              <Image style={styles.icon} source={{ uri: item.picture }} />
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
  const info = route.params;
  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            <ImageBackground
              style={styles.largePic}
              source={{ uri: info.picture }}
            >
            </ImageBackground>
            <Text style={styles.expandedText}>Name: {info.name}</Text>
            {info.address && <Text style={styles.expandedText}>
              Address: {info.address}
              {info.postalCode}
            </Text>}
            <Text style={styles.expandedText}>
              phoneNumber: {info.phoneNumber}
            </Text>
            <Text style={styles.expandedText}>Email: {info.email}</Text>
            <Text style={styles.expandedText}>
              Description: {info.description}
            </Text>
            {info.hours && <Text style={styles.expandedText}>Hours: {info.hours}</Text>}
            <Text style={styles.expandedText}>Rating: {info.rating}/5</Text>
            <DisplayTags tags={info.tags} />
            {info.website && <Button title="Go to website" onPress={() => {
              Linking.openURL(info.website);
            }} />}
          </>
        }
        data={info.reviews}
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
      keyExtractor={(item, index) => index.toString()} />
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
  }, header: {

  }
});

export default ListFromAPI;
