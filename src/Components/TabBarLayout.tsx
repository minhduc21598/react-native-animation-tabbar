import React, { FunctionComponent } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// config
import R from '../assets/R';
import { HEIGHT, WIDTH } from '../config';

const SvgAnimated = Animated.createAnimatedComponent(Svg);

export type TabBarLayoutProps = {
  marginLeft: Animated.Value;
  tabBarBackgroundColor?: string;
};

const TabBarLayout: FunctionComponent<TabBarLayoutProps> = (
  props: TabBarLayoutProps,
) => {
  const { marginLeft, tabBarBackgroundColor } = props;
  return (
    <SvgAnimated
      width={WIDTH(721)}
      height={HEIGHT(93)}
      viewBox="0 0 721 93"
      style={[styles.shape, { marginLeft }]}>
      <Path
        d="M360.566 93h-360V0H314.57c24.221 0 18.43 38.627 45.996 38.627C388.14 38.627 382.349 0 406.57 0h313.996v93h-360z"
        fill={tabBarBackgroundColor || R.colors.white}
        stroke={R.colors.borderCE}
        strokeWidth={0.75}
      />
    </SvgAnimated>
  );
};

export default TabBarLayout;

const styles = StyleSheet.create({
  shape: {
    marginTop: -HEIGHT(10),
  },
});
