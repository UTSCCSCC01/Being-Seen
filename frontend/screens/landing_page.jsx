import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
} from "react-native";

function Header() {
  return (
    <View
      style={{
        flex: 3,
        paddingTop: 25,
        paddingBottom: 10,
        height: 75,
        backgroundColor: "#e65",
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
        onPress={() => alert(1)}
      >
        <Image
          source={require("./assets/user.png")}
          resizeMode="contain"
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
}

function Body() {
  return (
    <ImageBackground
      style={{
        flex: 24,
        justifyContent: "center",
        resizeMode: "cover",
        padding: 20,
      }}
      source={require("./assets/landing_page_bg1.png")}
    >
      <Text
        style={{
          fontSize: 30,
          lineHeight: 36,
          color: "#665757",
        }}
      >
        Create a Being Seen Account
      </Text>
      <Text
        style={{
          color: "#DDE3B3",
          textShadowColor: "rgba(0, 0, 0, 0.75)",
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10,
        }}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum doloribus,
        reprehenderit saepe commodi quam reiciendis enim, dolore fugiat eos
        facere ipsum deleniti maxime! Fuga qui, dolorem vitae perferendis ea
        dicta, quos illum repellat porro eos dolore quisquam adipisci aspernatur
        accusamus unde iste maxime, eum eius molestias blanditiis animi! Quod,
        doloremque.
      </Text>
    </ImageBackground>
  );
}

function LandingPage() {
  return (
    <View style={styles.container}>
      <Header />
      <Body />
      <View style={{ flex: 50 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});

export default LandingPage;
