import React, { FunctionComponent } from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Platform,
  View,
} from 'react-native';

// item
import TabBarLayout, { TabBarLayoutProps } from './TabBarLayout';
import ItemCircleIcon, { ItemCircleIconProps, Icon } from './ItemCircleIcon';

// config
import { getFont, getLineHeight, HEIGHT, getWidth } from '../config';
import R from '../assets/R';

export type CustomTabBarProps = Props & TabBarLayoutProps & ItemCircleIconProps;

export type TabViewRoutes = {
  key: string;
  icon?: string;
  title?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  testID?: string;
};

type Props = {
  onChangeTab: (index: number) => void;
  currentIndex: number;
  menuTabBar: Array<TabViewRoutes>;
  iconList:
    | [Icon, Icon, Icon, Icon, Icon]
    | [Icon, Icon, Icon, Icon]
    | [Icon, Icon, Icon]
    | [Icon, Icon]
    | [Icon]
    | [];
};

const ItemTabBar = ({
  item,
  index,
  onChange,
  currentIndex,
  icon,
  width,
}: {
  item: TabViewRoutes;
  index: number;
  onChange: () => void;
  currentIndex: number;
  icon: Icon;
  width: number;
}) => {
  const color = index === currentIndex ? R.colors.redText : R.colors.borderCE;
  const opacity = index === currentIndex ? 0 : 1;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.itemContainer, { width }]}
      onPress={onChange}>
      <View style={[styles.viewIcon, { opacity }]}>{icon}</View>
      <Text style={[styles.title, { color }]}>{item?.title}</Text>
    </TouchableOpacity>
  );
};

const CustomTabBar: FunctionComponent<CustomTabBarProps> = (
  props: CustomTabBarProps,
) => {
  const {
    onChangeTab,
    currentIndex,
    menuTabBar,
    marginLeft,
    top,
    opacity,
    tabBarBackgroundColor,
    circleIconList,
    iconList,
  } = props;
  return (
    <SafeAreaView style={styles.container}>
      <TabBarLayout
        marginLeft={marginLeft}
        tabBarBackgroundColor={tabBarBackgroundColor}
      />
      <ItemCircleIcon
        top={top}
        opacity={opacity}
        circleIconList={circleIconList}
      />
      <FlatList
        data={menuTabBar}
        extraData={currentIndex}
        keyExtractor={item => item?.key}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        horizontal
        renderItem={({ item, index }) => (
          <ItemTabBar
            width={getWidth() / menuTabBar.length}
            item={item}
            index={index}
            onChange={() => onChangeTab(index)}
            currentIndex={currentIndex}
            icon={iconList[index]}
          />
        )}
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    width: getWidth(),
    height: Platform.OS === 'ios' ? HEIGHT(60) : HEIGHT(50),
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: getFont(15),
    lineHeight: getLineHeight(24),
    textAlign: 'center',
  },
  contentContainerStyle: {
    flexGrow: 0,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  flatList: {
    position: 'absolute',
  },
  viewIcon: {
    height: HEIGHT(30),
    justifyContent: 'flex-end',
    paddingBottom: HEIGHT(5),
  },
});
