/* eslint-disable react/prop-types */
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
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
import { AlertWarning } from "./Alerts";

/**
 * @function SettingsScreen
 * @module SettingsScreen
 * @description App and user settings screen
 */
const SettingsScreen = () => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const alertMsg = useRef("");

  return (
    <SafeAreaView style={styles.settingsView}>
      <AlertWarning
        isShown={showAlert}
        onCancel={() => {
          setShowAlert(false);
        }}
        onConfirm={() => {
          apiHandler.logOut(navigation);
        }}
        customView={
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>{alertMsg.current}</Text>
          </View>
        }
      />
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
          onPress={() => {
            alertMsg.current = "Are you sure you want to log out?";
            setShowAlert(true);
          }}
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
  alertContainer: {
    ...tailwind("items-center justify-center mt-2"),
  },
  alertText: {
    ...tailwind("text-center leading-5"),
  },
  settingsHeader: {
    ...tailwind("my-4"),
  },
  settingsItemText: {
    ...tailwind("text-primary text-base font-bold"),
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
        "flex-row p-2 border-b-2 border-l-2 border-r-2 border-solid border-gray-400"
      ),
      borderBottomLeftRadius: isLastElement ? 10 : 0,
      borderBottomRightRadius: isLastElement ? 10 : 0,
      borderTopLeftRadius: isFirstElement ? 10 : 0,
      borderTopRightRadius: isFirstElement ? 10 : 0,
      borderTopWidth: isFirstElement ? 2 : 0,
    },
  });

export default SettingsScreen;
