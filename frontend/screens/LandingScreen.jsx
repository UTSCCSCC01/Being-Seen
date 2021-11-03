/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-bind */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { tailwind } from "tailwind";

import Login from "./Login";

/**
 * @function LandingScreen
 * @module LandingScreen
 * @description The landing page (or "Home") of this App. It contains the newsreel.
 */
function LandingScreen({ navigation }) {
  function Header() {
    return (
      <View
        style={{
          paddingTop: 25,
          paddingBottom: 10,
          height: 75,
          backgroundColor: "#62299c",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: 20,
            justifyContent: "center",
            // backgroundColor: "purple",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Image
            source={require("../assets/user.png")}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function Body() {
    function Banner() {
      return (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          <ImageBackground
            style={{
              flex: 1,
              width: Dimensions.get("screen").width,
              justifyContent: "center",
              resizeMode: "cover",
              padding: 20,
            }}
            source={require("../assets/landing_page_bg1.png")}
          >
            <Text
              style={[
                styles.h1,
                {
                  color: "#665757",
                },
              ]}
            >
              Create a Being Seen Account
            </Text>
            <Text
              style={{
                color: "#DDE3B3",
                alignSelf: "baseline",
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
              }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
              doloremque facilis neque, voluptatum molestiae id repudiandae?
              Quasi eveniet consequatur aliquid?
            </Text>
          </ImageBackground>
          <ImageBackground
            style={{
              flex: 1,
              width: Dimensions.get("screen").width,
              justifyContent: "center",
              resizeMode: "cover",
              padding: 20,
            }}
            source={require("../assets/rickroll.jpg")}
          >
            <Text
              style={[
                styles.h1,
                {
                  color: "#ffffff",
                },
              ]}
            >
              The second Create a Being Seen Account
            </Text>
            <Text
              style={{
                color: "#DDE3B3",
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
              }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum
              doloribus, reprehenderit saepe commodi quam reiciendis enim,
              dolore fugiat eos facere ipsum deleniti maxime! Fuga qui, dolorem
              vitae perferendis ea dicta, quos illum repellat porro eos dolore
              quisquam adipisci aspernatur accusamus unde iste maxime, eum eius
              molestias blanditiis animi! Quod, doloremque.
            </Text>
          </ImageBackground>
        </ScrollView>
      );
    }

    return (
      <ScrollView>
        <Banner />
        <View
          style={{ backgroundColor: "#abc", borderRadius: 10, padding: 20 }}
        >
          <Text style={styles.h1}>Lorem ipsum dolor sit amet.</Text>
          <Text style={styles.h3}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iusto
            quasi saepe minus, exercitationem voluptatem similique debitis
            suscipit deserunt. Ipsum iusto rem, facilis adipisci odit vero
            incidunt saepe quas, omnis officia consequatur laboriosam, quibusdam
            tenetur. Saepe, unde blanditiis. Cum illo, fugit nisi dolores
            adipisci pariatur fuga blanditiis possimus ut sed?
          </Text>
          <Text style={[styles.h2, { marginVertical: 20 }]}>
            Lorem ipsum dolor sit amet.
          </Text>
          <Text style={styles.h3}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam et
            perspiciatis, illo adipisci, dolorum iusto quia officia molestiae
            sunt voluptatibus sit? Voluptatibus mollitia, nulla dolores soluta
            perferendis molestias debitis cum nesciunt beatae assumenda
            necessitatibus sint delectus suscipit unde veniam non? Perferendis
            esse expedita harum molestias voluptatum ducimus est sequi
            repellendus.
          </Text>
        </View>
      </ScrollView>
    );
  }

  const Stack = createNativeStackNavigator();

  function LandingPage() {
    return (
      <View style={styles.container}>
        <Header />
        <Body />
        <View style={{ flex: 50 }} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Page" component={LandingPage} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    ...tailwind("bg-white"),
    alignItems: "stretch",
    flex: 1,
    justifyContent: "flex-start",
  },
  h1: {
    fontSize: 30,
    lineHeight: 36,
  },
  h2: {
    fontSize: 24,
    lineHeight: 30,
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
  },
});

export default LandingScreen;
