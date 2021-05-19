import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate

} from 'react-native-reanimated';

import Loading from './src/Loading';

import delivery from './src/icon/delivery.png'

export default function App() {
  const titlePosition = useSharedValue(-60);
  const imagePosition = useSharedValue(-60)

  useEffect(() => {
    titlePosition.value = withTiming(0, {
      duration: 1000,
      easing: Easing.bounce,
    },
      () => {
        imagePosition.value = withTiming(0, {
          duration: 2000,
          easing: Easing.out(Easing.exp),
        });
      },
    );
  }, [])

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: titlePosition.value }],
      opacity: interpolate(
        titlePosition.value,
        [30, 0],
        [0, 1],
        Extrapolate.CLAMP,

      ),
    };
  });

  const deliveryStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: imagePosition.value }],
    }
  })


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#13131A" />
      <Animated.Text style={[styles.title, titleStyle]}>
        Loading ...
      </Animated.Text>
      <Animated.Image style={[styles.delivery, deliveryStyle]} source={delivery} />

      <Loading />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#030303'
  },
  delivery: {
    width: 100,
    height: 100,

  }
});
