import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import { StatusBar, Platform } from 'react-native';
import { fadeIn, fadeOut } from 'react-navigation-transitions';
import { Icon } from '../../components';
import { colors, fonts } from '../../styles';
import SplashScreenViewContainer from '../splashScreen/SplashScreenViewContainer';
import AuthenticationViewContainer from '../authentication/AuthenticationViewContainer';

export function ResetNavigator(navigation, routeName, params) {
  const resetAction = StackActions.reset({
    index: 0,
    key: null,
    actions: [
      NavigationActions.navigate({ routeName, params }),
    ],
  });
  navigation.dispatch(resetAction);
}

export const DefaultNavOptions = ({
  titleStyle: {
    fontFamily: fonts.primaryLight,
  },
  headerStyle: {
    backgroundColor: colors.primary,
    borderBottomWidth: 0,
    paddingTop: Platform.select({ ios: 0, android: StatusBar.currentHeight }),
    height: 55 + StatusBar.currentHeight
  },
  headerTitleStyle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
  },
  headerTintColor: colors.white,
  headerLeft: (props) => {
    const { onPress, tintColor } = props;
    return (
      <Icon
        style={{
          padding: 12,
        }}
        name="arrow-left"
        type="Feather"
        size={24}
        color={tintColor}
        onPress={onPress}
      />
    );
  },
});

let currentIndex = 0;

export const DefaultRouteConfig = ({
  transitionConfig: (sceneProps) => {
    if (currentIndex < sceneProps.index) {
      currentIndex = sceneProps.index;
      return fadeIn();
    }
    currentIndex = sceneProps.index;
    return fadeOut();
  },
  defaultNavigationOptions: DefaultNavOptions,
});

const stackNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreenViewContainer,
      navigationOptions: {
        header: null,
      }
    },
    Authentication: {
      screen: AuthenticationViewContainer,
      navigationOptions: {
        header: null,
      }
    }
  },
  DefaultRouteConfig,
);

export default createAppContainer(stackNavigator);