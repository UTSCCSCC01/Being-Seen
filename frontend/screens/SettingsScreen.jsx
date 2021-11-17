/* eslint-disable react/prop-types */
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { tailwind } from "tailwind";

import BackButton from "../components/BackButton";
import { SecondaryHeader } from "../components/Headers";
import ScreenHeader from "../components/ScreenHeader";
import settings from "../constants/settings";
import apiHandler from "../util/APIHandler";

/**
 * @function SettingsScreen
 * @module SettingsScreen
 * @description App and user settings screen
 */
const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.settingsView}>
      <ScreenHeader leftNode={<BackButton />} headerText="Settings" />
      <View style={styles.settingsList}>
        <View style={styles.settingsHeader}>
          <SecondaryHeader text="Logout" />
        </View>
        <Pressable
          style={
            settingsItemStyles({ isFirstElement: true, isLastElement: true })
              .settingsItem
          }
          onPress={() => apiHandler.logOut(navigation)}
        >
          <Text style={styles.settingsItemText}>Logout</Text>
        </Pressable>
        <SectionList
          sections={settings}
          showsVerticalScrollIndicator
          bounces
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => item + index}
          renderItem={(props) => {
            const isFirstElement = props.index === 0;
            const isLastElement = props.index === props.section.data.length - 1;

            return (
              <Pressable
                style={
                  settingsItemStyles({ isFirstElement, isLastElement })
                    .settingsItem
                }
                onPress={() => navigation.push(props.item.screen)}
              >
                <Text style={styles.settingsItemText}>{props.item.title}</Text>
              </Pressable>
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.settingsHeader}>
              <SecondaryHeader text={title} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  settingsHeader: {
    ...tailwind("my-4"),
  },
  settingsItemText: {
    ...tailwind("text-primary text-base"),
  },
  settingsList: {
    ...tailwind("mx-6 my-4"),
  },
  settingsView: {
    flex: 1,
  },
});

const settingsItemStyles = ({ isFirstElement, isLastElement }) =>
  StyleSheet.create({
    settingsItem: {
      ...tailwind(
        "flex-row p-2 border-b-2 border-l-2 border-r-2 border-solid border-grey"
      ),
      borderBottomLeftRadius: isLastElement ? 10 : 0,
      borderBottomRightRadius: isLastElement ? 10 : 0,
      borderTopLeftRadius: isFirstElement ? 10 : 0,
      borderTopRightRadius: isFirstElement ? 10 : 0,
      borderTopWidth: isFirstElement ? 2 : 0,
    },
  });

export default SettingsScreen;
