import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Linking, TouchableHighlight } from 'react-native';
import { tailwind } from 'tailwind';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

/**
 * @function RegisterAccountScreen
 * @module RegisterAccountScreen
 * @description Signup screen
 */
const RegisterAccountScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScreenHeader
        leftNode={
          <View>
            <TouchableHighlight onPress={() => navigation.goBack()} underlayColor="transparent">
              <Text style={styles.backButton}>Back</Text>
            </TouchableHighlight>
          </View>
        }
        headerText="Register"
      />
      <View style={styles.body}>
        <Text style={styles.text}>Don't have an account? Email us today and we will create one for you! 
        Don't miss out on the opportunities this app can give you!{'\n'}{'\n'}
        Click below to email us and tell us what you are looking for in this app. We will be contacting you shortly with next steps.</Text>
      <View style={styles.buttonView}>
        <Button 
          label="Register"
          onClick={() => Linking.openURL('mailto:support@beingseen.com?subject=Register An Account&body=') }
          disabled={false}
        />
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    ...tailwind('text-primaryPurple text-opacity-90 text-xl'),
  },
  body: {
    ...tailwind('px-4 py-6'),
  },
  text: {
    ...tailwind('text-primaryPurple text-base'),
  },
  buttonView: {
    ...tailwind('px-4 py-8'),
  },
});

export default RegisterAccountScreen;
