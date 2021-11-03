import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";

import ServiceList from "../components/screen_components/ServiceList";
import ScreenHeader from "../components/ScreenHeader";
import SearchBar from "../components/SearchBar";
import apiHandler from "../util/APIHandler";
import { capitalize, getScreenNameFromQuery } from "../util/FormatHelper";
import SearchScreen from "./SearchScreen";
import ServiceDetails from "./ServiceDetails";
import WriteReview from "./WriteReview";

const Stack = createNativeStackNavigator();

/**
 *
 * @function ListFromAPI
 * @module ListFromAPI
 * @description full page of to display list of shelters and their details
 * @prop {string} [query] The type of service this page is going to display. This prop determines
 *                        to which api endpoint every sub-component's http request will be sent.
 */
function ListFromAPI({ query }) {
  const screenName = getScreenNameFromQuery(query);
  const listName = `${capitalize(query)}List`;
  return (
    <>
      <Stack.Navigator initialRouteName={listName}>
        <Stack.Screen
          name={listName}
          options={{
            headerShown: false,
          }}
        >
          {({ navigation }) => (
            <>
              <ScreenHeader headerText={screenName} />
              <ServiceList
                navigation={navigation}
                query={query}
                infoGetter={() => {
                  return apiHandler.getInfoFromApi(query);
                }}
                listHeader={
                  <SearchBar
                    navigation={navigation}
                    resultScreenName="searchResult"
                    serviceType={query}
                  />
                }
              />
            </>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={`${capitalize(query)} Details`}
          component={ServiceDetails}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name={`Review ${capitalize(query)}`}
          component={WriteReview}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name={`Map ${capitalize(query)}`}
          component={Map}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="searchResult"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

ListFromAPI.propTypes = {
  query: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({});

export default ListFromAPI;
