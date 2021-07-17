import React, { FunctionComponent, ReactElement } from 'react';
import {
  Platform,
  View,
  Animated,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { SvgProps } from 'react-native-svg';

// config
import R from '../assets/R';
import { getWidth, HEIGHT, WIDTH } from '../config';

export type Icon = ImageSourcePropType | ReactElement<SvgProps>;

export type ItemCircleIconProps = {
  top: Array<Animated.Value>;
  opacity: Array<Animated.Value>;
  circleIconList:
    | [Icon, Icon, Icon, Icon, Icon]
    | [Icon, Icon, Icon, Icon]
    | [Icon, Icon, Icon]
    | [Icon, Icon]
    | [Icon]
    | [];
  backgroundCircleIcon?: string;
};

const ItemTabBar = ({
  item,
  top,
  opacity,
  backgroundColor,
  width,
}: {
  item: Icon;
  top: Animated.Value;
  opacity: Animated.Value;
  backgroundColor: string;
  width: number;
}) => {
  return (
    <Animated.View style={[styles.itemContainer, { top, opacity, width }]}>
      <View style={[styles.cirle, { backgroundColor }]}>{item}</View>
    </Animated.View>
  );
};

const ItemCircleIcon: FunctionComponent<ItemCircleIconProps> = (
  props: ItemCircleIconProps,
) => {
  const { top, opacity, circleIconList, backgroundCircleIcon } = props;

  return (
    <View style={styles.container}>
      {circleIconList.map((item: Icon, index: number) => (
        <ItemTabBar
          opacity={opacity[index]}
          top={top[index]}
          item={item}
          backgroundColor={backgroundCircleIcon || R.colors.redC81}
          key={index}
          width={getWidth() / circleIconList.length}
        />
      ))}
    </View>
  );
};

export default ItemCircleIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? HEIGHT(40) : HEIGHT(30),
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: R.colors.black0,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: WIDTH(2),
    shadowOpacity: 0.2,
  },
  cirle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH(40),
    height: WIDTH(40),
    borderRadius: WIDTH(40) / 2,
  },
});
