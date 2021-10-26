import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import ScreenHeader from "../components/ScreenHeader";
import colors from "../constants/colors";

// const apiPath = "http://10.0.2.2:3000/";
const apiPath = "http://192.168.0.13:3000/";

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

function SearchScreen({ route, navigation }) {
  const [result, setResult] = useState([]);
  const { searchKeys, serviceType } = route.params;
  useEffect(() => {
    const keys = searchKeys.split(" ");
    const payload = JSON.stringify({
      tagList: keys,
    });
    try {
      fetch(`${apiPath}${serviceType}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: payload,
      })
        .then((response) => {
          const r = response.json();
          return r;
        })
        .then((resJson) => {
          setResult(resJson);
        })
        .then(() => {
          console.log("=========");
          console.log(`result == ${result}`);
        });
    } catch (error) {
      console.error(error);
    }
  }, [searchKeys, serviceType]);
  return (
    <>
      <ScreenHeader
        headerText="Test"
        leftNode={<Icon name="arrowleft" style={styles.backButton} />}
        leftContainerStyle={styles.backButtonContainer}
        handleOnPressLeftNode={() => {
          navigation.pop();
        }}
      />
      <FlatList
        data={result}
        renderItem={({ item, index, separators }) => {
          return (
            <TouchableHighlight
              underlayColor="none"
              onPress={() => {
                navigation.navigate(`${capitalize(serviceType)}Details`, {
                  item,
                  query: serviceType,
                });
              }}
            >
              <View style={styles.box}>
                {item.picture ? (
                  <Image style={styles.icon} source={{ uri: item.picture }} />
                ) : null}
                <View style={styles.description}>
                  <Text style={styles.text} numberOfLines={1}>
                    Name: {item.name}
                  </Text>
                  {item.address && (
                    <Text style={styles.text} numberOfLines={1}>
                      Address: {item.address}
                    </Text>
                  )}
                  <Text style={styles.text} numberOfLines={1}>
                    Phone: {item.phoneNumber}
                  </Text>
                  <Text style={styles.text} numberOfLines={1}>
                    Tags: {item.tags ? getTags(item.tags) : "None"}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        style={styles.scrollBackground}
      />
    </>
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
    if (i !== tags.length - 1) toRet += ", ";
  }
  return toRet;
};

SearchScreen.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  backButton: {
    color: colors.themeMain,
    fontSize: 30,
  },
  backButtonContainer: {
    height: 30,
    margin: 10,
    width: 30,
  },
  box: {
    borderColor: colors.themeMain,
    borderStyle: "solid",
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    margin: 1,
  },
  description: {
    flex: 4,
  },
  icon: {
    flex: 1,
  },
  scrollBackground: {
    flex: 1,
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
  },
});

export default SearchScreen;
