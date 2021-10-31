import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { tailwind } from "tailwind";

import { PrimaryHeader } from "../components/Headers";
import UnderlinedLink from "../components/UnderlinedLink";
import images from "../constants/images";

const TutorialScreen = () => {
  const { width, height } = Dimensions.get("window");

  const [sliderState, setSliderState] = useState({ currentPage: 0 });

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.ceil(x / width);

    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;

  return (
    <View>
      <SafeAreaView style={styles({}).tutorialView}>
        <ScrollView
          style={styles({}).slideshowView}
          horizontal
          scrollEventThrottle={16}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            setSliderPage(event);
          }}
        >
          <View style={styles({ width, height }).slide}>
            <Image source={images.landing_page_bg_1} style={styles({}).image} />
            <View style={styles({}).textBox}>
              <PrimaryHeader text="Welcome" />
              <Text style={styles({}).description}>
                Being Seen aims to help you easily access resources relevant to
                the homeless community.
              </Text>
            </View>
          </View>
          <View style={styles({ width, height }).slide}>
            <Image source={images.landing_page_bg_1} style={styles({}).image} />
            <View style={styles({}).textBox}>
              <PrimaryHeader text="Newsreel" />
              <Text style={styles({}).description}>
                Check out recently posted services and events.
              </Text>
            </View>
          </View>
          <View style={styles({ width, height }).slide}>
            <Image source={images.landing_page_bg_1} style={styles({}).image} />
            <View style={styles({}).textBox}>
              <PrimaryHeader text="Profile" />
              <Text style={styles({}).description}>
                View your profile and edit your information.
              </Text>
            </View>
          </View>
          <View style={styles({ width, height }).slide}>
            <Image source={images.landing_page_bg_1} style={styles({}).image} />
            <View style={styles({}).textBox}>
              <PrimaryHeader text="Search" />
              <Text style={styles({}).description}>
                Search for services by tag name.
              </Text>
            </View>
          </View>
          <View style={styles({ width, height }).slide}>
            <Image source={images.landing_page_bg_1} style={styles({}).image} />
            <View style={styles({}).textBox}>
              <PrimaryHeader text="Merchants" />
              <Text style={styles({}).description}>
                Check out partnered stores for discounts and coupons.
              </Text>
            </View>
          </View>
          <View style={styles({ width, height }).slide}>
            <Image source={images.landing_page_bg_1} style={styles({}).image} />
            <View style={styles({}).textBox}>
              <PrimaryHeader text="Jobs" />
              <Text style={styles({}).description}>
                Browse through job postings and easily apply for jobs you are
                interested in.
              </Text>
            </View>
          </View>
          <View style={styles({ width, height }).slide}>
            <Image source={images.landing_page_bg_1} style={styles({}).image} />
            <View style={styles({}).textBox}>
              <PrimaryHeader text="Social Services" />
              <Text style={styles({}).description}>
                Get a list of relevant social services, such as shelters, food
                banks, and safe injection sites. You can also read and leave
                user reviews.
              </Text>
            </View>
          </View>
          <View style={styles({ width, height }).slide}>
            <Image source={images.landing_page_bg_1} style={styles({}).image} />
            <View style={styles({}).textBox}>
              <PrimaryHeader text="Education" />
              <Text style={styles({}).description}>
                View upcoming education and mentorship opportunities.
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles({}).sliderView}>
          {Array.from(Array(8).keys()).map((key, index) => (
            <View style={styles({ pageIndex, index }).sliderDot} key={key} />
          ))}
          <View style={styles({}).exit}>
            <UnderlinedLink text="Exit Tutorial" back />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = ({ width, height, pageIndex, index }) =>
  StyleSheet.create({
    description: {
      ...tailwind("text-base text-center m-2"),
    },
    exit: {
      ...tailwind("absolute inset-x-0 justify-center items-end"),
      right: 20,
    },
    image: {
      height: 450,
      width: "100%",
    },
    slide: {
      height,
      width,
    },
    sliderDot: {
      ...tailwind("w-2 h-2 mx-1 bg-gray-800 rounded-full"),
      opacity: pageIndex === index ? 1 : 0.2,
    },
    sliderView: {
      ...tailwind("absolute flex-row inset-x-0 justify-center items-center"),
      bottom: 75,
    },
    slideshowView: {
      ...tailwind(""),
    },
    textBox: {
      ...tailwind("justify-center items-center my-8"),
    },
    tutorialView: {
      ...tailwind(""),
    },
  });

export default TutorialScreen;
