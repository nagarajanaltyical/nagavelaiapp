import * as SplashScreen from "expo-splash-screen";
import { I18n } from "i18n-js";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AUthReducer, Inital_State } from "./app/Authreducer";
import { Inital_State2, LongTimeFilter } from "./app/LongtimeFilter";
import { persistor, store } from "./app/Redux/store";
import LottieViewfor from "./app/Rootstack/Noconnection";
import { Inital_State1, ShortTimeFilter } from "./app/shortTimefilter";
// import {
//   createSwitchNavigator,
//   createStackNavigator,
//   createAppContainer,
// } from "react-navigation";
// you can also import from @react-navigation/native
// import { createSwitchNavigator } from "@react-navigation/compat";
import NetInfo from "@react-native-community/netinfo";
import translations from "./app/Pages/translations";
import Root from "./app/Rootstack/Rootstack";
export const LocalizationContext = createContext();
export const AuthContext = createContext();
export const S_FILTER = createContext();
export const L_FILTER = createContext();
//To make the splash screen to stay
SplashScreen.preventAutoHideAsync();
const i18n = new I18n(translations);
// define HOC
export const withNetworkConnectivity = (WrappedComponent) => (props) => {
  //
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <WrappedComponent {...props} isConnected={isConnected} />;
};
// export default withNetworkConnectivity;
export const NoConnection = () => {
  return (
    <View>
      <Text>Oops! You lost internet connection.</Text>
    </View>
  );
};
const App = (props) => {
  const { isConnected } = props;
  const [language, setlanguage] = useState("English");
  const [userDetails, setuserdetails] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [state, dispatch] = useReducer(AUthReducer, Inital_State);
  const [state1, dispatch1] = useReducer(ShortTimeFilter, Inital_State1);
  const [state2, dispatch2] = useReducer(LongTimeFilter, Inital_State2);

  //for otp frontEnd
  //to get the localize at first
  const localizationContext = useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { language, ...options }),
      language,
      setlanguage,
      userDetails: userDetails,
      setuserdetails: (userDetails) => setuserdetails(userDetails),
    }),
    [language, userDetails]
  );
  const authContext = useMemo(
    () => ({
      isdetails: () => {
        dispatch({ type: "IS_Deatils_given" });
      },
      getstate: () => {},
    }),
    [state]
  );

  i18n.locale = language;
  //to run at first
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 10));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  if (!isConnected) {
    return <LottieViewfor />;
  }
  if (!appIsReady) {
    return null;
  }
  return (
    <View style={styles.main} onLayout={onLayoutRootView}>
      <LocalizationContext.Provider value={localizationContext}>
        <S_FILTER.Provider value={{ state1, dispatch1 }}>
          <L_FILTER.Provider value={{ state2, dispatch2 }}>
            <AuthContext.Provider value={{ state, dispatch }}>
              <Provider store={store}>
                <PersistGate
                  loading={<Text>Loading...</Text>}
                  persistor={persistor}
                >
                  <Root />
                </PersistGate>
              </Provider>
            </AuthContext.Provider>
          </L_FILTER.Provider>
        </S_FILTER.Provider>
      </LocalizationContext.Provider>
    </View>
  );
};
export default withNetworkConnectivity(App);
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
// import LottieView from "lottie-react-native";
// import React, { useRef } from "react";
// import { Animated, SafeAreaView, StatusBar, Text, View } from "react-native";
// import { ImageCard } from "./app/Lottie/assets/ImageCard";
// import styles from "./app/Lottie/assets/AppStyles";
// import Assets from "./app/Lottie/assets";
// import { StaticData } from "./app/Lottie/StaticData";
// const App = () => {
//   const scrollPosition = useRef(new Animated.Value(0)).current;
//   const handleScroll = ({ nativeEvent }) => {
//     const calculatedScrollPosition =
//       nativeEvent.contentOffset.y /
//       (nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height);
//     scrollPosition.setValue(calculatedScrollPosition);
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         backgroundColor={"rgb(255, 255, 255)"}
//         barStyle={"dark-content"}
//       />
//       <View style={styles.header}>
//         <LottieView
//           progress={scrollPosition.interpolate({
//             inputRange: [0, 1],
//             outputRange: [0, 1],
//             extrapolate: "clamp",
//           })}
//           source={Assets.lottieFiles.planePath}
//           colorFilters={[{ keypath: "Plane", color: "rgb(255, 100, 0)" }]}
//         />
//         <Text style={styles.infoText}>
//           {"Long Press Image to Like / Unlike"}
//         </Text>
//       </View>
//       <Animated.FlatList
//         bounces={false}
//         showsVerticalScrollIndicator={false}
//         scrollEventThrottle={1}
//         onScroll={handleScroll}
//         data={StaticData}
//         keyExtractor={(item) => item?.key}
//         renderItem={({ item }) => <ImageCard data={item} />}
//         contentContainerStyle={styles.list}
//       />
//     </SafeAreaView>
//   );
// };
// export default App;
