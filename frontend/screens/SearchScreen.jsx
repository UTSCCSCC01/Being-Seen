import PropTypes from "prop-types";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import ServiceList from "../components/screen_components/ServiceList";
import SearchBar from "../components/SearchBar";
import apiHandler from "../util/APIHandler";

/**
 * @function SearchScreen
 * @module SearchScreen
 * @description The screen used to display the result of a search activity
 * @prop {object} route Must contain {searchKeys, serviceType} in route.params. searchKeys is a plain
 *                        string the user typed and serviceType corresponds to the api end point to which
 *                        this component will make http requests.
 * @prop {object} navigation The navigation object provided by react navigation library.
 */
function SearchScreen({ route, navigation }) {
  const { searchKeys, serviceType } = route.params;

  return (
    <>
      <SafeAreaView>
        <SearchBar
          navigation={navigation}
          resultScreenName="searchResult"
          serviceType={serviceType}
          prefill={searchKeys}
          isSecondary
        />
      </SafeAreaView>
      <ServiceList
        navigation={navigation}
        query={serviceType}
        infoGetter={() => {
          return apiHandler.getSearchResult(searchKeys.split(","), serviceType);
        }}
      />
    </>
  );
}

SearchScreen.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default SearchScreen;
