/* eslint-disable react/jsx-no-bind */
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { tailwind } from "tailwind";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import QuotationBlock from "../components/QuotationBlock";
import ScreenHeader from "../components/ScreenHeader";
import TextField from "../components/TextField";
import apiHandler from "../util/APIHandler";

function ChangePassword() {
  const navigation = useNavigation();
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function decodeJWTPayload() {
    const token = await SecureStore.getItemAsync("token");
    const decoded = await jwt_decode(token);
    return decoded;
  }

  const updatePassword = async () => {
    try {
      if (newPassword !== confirm) {
        Alert.alert("passwords do not match");
        return;
      }
      const decoded = await decodeJWTPayload();
      const { username } = decoded;
      console.log(username, curPassword, newPassword, confirm);
      const response = await apiHandler.updatePassword(
        username,
        curPassword,
        newPassword
      );
      if (response.status === 200) {
        navigation.goBack();
      } else {
        alert(`Http request failed, code ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScreenHeader leftNode={<BackButton />} headerText="Change Password" />
      <View style={styles.changeScreen}>
        <TextField
          placeholder="Current Password"
          secure
          onChangeText={setCurPassword}
          onSubmitEditing={updatePassword}
        />
        <TextField
          placeholder="New Password"
          secure
          onChangeText={setNewPassword}
          onSubmitEditing={updatePassword}
        />
        <TextField
          placeholder="Confirm New Password"
          secure
          onChangeText={setConfirm}
          onSubmitEditing={updatePassword}
        />
        <View style={styles.changeButton}>
          <Button
            label="Change Password"
            disabled={false}
            onClick={updatePassword}
          />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  changeButton: {
    paddingTop: "3%",
  },
  changeScreen: {
    padding: "5%",
  },
});

export default ChangePassword;
