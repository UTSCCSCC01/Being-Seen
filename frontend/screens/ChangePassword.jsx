/* eslint-disable react/jsx-no-bind */
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { tailwind } from "tailwind";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";
import TextField from "../components/TextField";
import apiHandler from "../util/APIHandler";
import { AlertError } from "./Alerts";

function ChangePassword() {
  const navigation = useNavigation();
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showError, setShowError] = useState(false);
  const alertMsg = useRef(""); // Assign to alertMsg.current to change the message

  async function decodeJWTPayload() {
    const token = await SecureStore.getItemAsync("token");
    const decoded = await jwt_decode(token);
    return decoded;
  }

  const updatePassword = async () => {
    try {
      if (newPassword !== confirm) {
        alertMsg.current = "New passwords do not match!";
        setShowError(true);
        return;
      } else{
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
        } else if(response.status === 401){
          alertMsg.current = "Incorrect password entered!";
          setShowError(true);
          return;
        }
        else {
          alert(`Http request failed, code ${response.status}`);
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AlertError
        isShown={showError}
        onCancel={() => {
          setShowError(false);
        }}
        onConfirm={() => {
          setShowError(false);
        }}
        customView={
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>{alertMsg.current}</Text>
          </View>
        }
      />
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
  alertContainer: {
    ...tailwind("items-center justify-center mt-2"),
  },
  alertText: {
    ...tailwind("text-center leading-5"),
  },
  changeButton: {
    marginTop: "5%",
  },
  changeScreen: {
    padding: "5%",
  },
});

export default ChangePassword;
