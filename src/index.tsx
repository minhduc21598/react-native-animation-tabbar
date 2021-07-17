import React, { FunctionComponent, useState, ReactNode, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { TabView, SceneRendererProps } from 'react-native-tab-view';

// config
import {
  WIDTH,
  HEIGHT,
  VISIBLE,
  HIDDEN,
  getWidth,
  TAB_MAX_LENGTH,
} from './config';

import CustomTabBar, {
  TabViewRoutes,
  CustomTabBarProps,
} from './Components/CustomTabBar';

type AnimationTabBarProps = Props &
  Pick<
    CustomTabBarProps,
    | 'backgroundCircleIcon'
    | 'circleIconList'
    | 'tabBarBackgroundColor'
    | 'iconList'
  >;

type Props = {
  tabViewRoutes:
    | [
        TabViewRoutes,
        TabViewRoutes,
        TabViewRoutes,
        TabViewRoutes,
        TabViewRoutes,
      ]
    | [TabViewRoutes, TabViewRoutes, TabViewRoutes, TabViewRoutes]
    | [TabViewRoutes, TabViewRoutes, TabViewRoutes]
    | [TabViewRoutes, TabViewRoutes]
    | [TabViewRoutes]
    | [];
  renderScene: (
    props: SceneRendererProps & { route: TabViewRoutes },
  ) => ReactNode;
  onChangeTab?: (index: number) => void;
};

const AnimationTabBar: FunctionComponent<AnimationTabBarProps> = (
  props: AnimationTabBarProps,
) => {
  const {
    tabViewRoutes,
    renderScene,
    circleIconList,
    backgroundCircleIcon,
    tabBarBackgroundColor,
    onChangeTab,
    iconList,
  } = props;
  const [index, setIndex] = useState(0);

  const getWidthValue = (length: number) => {
    switch (length) {
      case 5:
        return 0;
      case 4:
        return WIDTH(8);
      case 3:
        return WIDTH(12);
      case 2:
        return WIDTH(17.7);
      case 1:
        return WIDTH(36);
      default:
        return 0;
    }
  };

  const initialMarginLeft = useRef(
    -WIDTH(324) -
      (tabViewRoutes.length - TAB_MAX_LENGTH) *
        getWidthValue(tabViewRoutes.length),
  );
  const distance = useRef(getWidth() / tabViewRoutes.length);
  const marginLeft = useRef(new Animated.Value(initialMarginLeft.current));
  const top = useRef(
    tabViewRoutes.map((_routes: TabViewRoutes, ind: number) => {
      if (ind === 0) {
        return new Animated.Value(0);
      } else {
        return new Animated.Value(HEIGHT(80));
      }
    }),
  );
  const opacity = useRef(
    tabViewRoutes.map((_routes: TabViewRoutes, ind: number) => {
      if (ind === 0) {
        return new Animated.Value(VISIBLE);
      } else {
        return new Animated.Value(HIDDEN);
      }
    }),
  );

  const onChangeIndex = (ind: number) => {
    if (index !== ind) {
      Animated.parallel([
        Animated.timing(opacity.current[index], {
          toValue: HIDDEN,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.spring(top.current[index], {
          toValue: HEIGHT(80),
          bounciness: 9,
          useNativeDriver: false,
          speed: 6,
        }),
        Animated.spring(marginLeft.current, {
          toValue: distance.current * ind + initialMarginLeft.current,
          bounciness: 9,
          useNativeDriver: false,
          speed: 6,
        }),
        Animated.timing(opacity.current[ind], {
          toValue: VISIBLE,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.spring(top.current[ind], {
          toValue: 0,
          bounciness: 9,
          useNativeDriver: false,
          speed: 6,
        }),
      ]).start();
      setIndex(ind);
      onChangeTab && onChangeTab(ind);
    }
  };

  return (
    <View style={styles.container}>
      <TabView
        lazy
        renderTabBar={() => null}
        navigationState={{
          index,
          routes: tabViewRoutes,
        }}
        renderScene={renderScene}
        tabBarPosition="bottom"
        swipeEnabled={false}
        onIndexChange={(ind: number) => setIndex(ind)}
      />
      <CustomTabBar
        onChangeTab={onChangeIndex}
        currentIndex={index}
        menuTabBar={tabViewRoutes}
        marginLeft={marginLeft.current}
        top={top.current}
        opacity={opacity.current}
        circleIconList={circleIconList}
        iconList={iconList}
        backgroundCircleIcon={backgroundCircleIcon}
        tabBarBackgroundColor={tabBarBackgroundColor}
      />
    </View>
  );
};

export default AnimationTabBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
