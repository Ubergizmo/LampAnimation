import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
export default function App() {
  const { height } = Dimensions.get("window");

  const [value, setValue] = useState(0.15);
  const [isOn, setIsOn] = useState(false);

  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange((event) => {
      if (event.absoluteY >= 535) {
        offset.value = withSpring(0);
      } else {
        offset.value = event.translationY;
      }
    })
    .onFinalize(() => {
      offset.value = withSpring(0);
      runOnJS(setIsOn)(!isOn);
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <View style={styles.lampContainer}>
            <View style={styles.lampRope} />
            <View style={styles.lampBubble} />
            {isOn && (
              <LinearGradient
                colors={["#fff", "#333533"]}
                style={[styles.lightHole, { opacity: value }]}
              />
            )}
          </View>
          <View style={{ alignItems: "center", width: 150 }}>
            {isOn && (
              <>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: height * 0.05,
                    fontWeight: "600",
                  }}
                >
                  {value.toFixed(2)}
                </Text>
                <Slider
                  style={{ height: 40, width: 150, marginVertical: 10 }}
                  minimumValue={0.05}
                  maximumValue={0.25}
                  step={0.05}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="gray"
                  thumbTintColor="#fff"
                  value={value}
                  onValueChange={setValue}
                />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: height * 0.023,
                    letterSpacing: 4,
                  }}
                >
                  INTENSITY
                </Text>
              </>
            )}
          </View>
        </View>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.switchContainer, animatedStyles]}>
            <View style={styles.switchRope} />
            <View style={styles.switchHolder} />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333533",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  lampContainer: {
    width: "auto",
    alignItems: "center",
  },
  lampRope: {
    width: 5,
    height: 200,
    backgroundColor: "#ede0d4",
  },
  lampBubble: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#ede0d4",
  },
  lightHole: {
    width: 120,
    height: 200,
  },
  switchContainer: {
    height: 600,
    width: 20,
    alignItems: "center",
    position: "relative",
    top: "-60%",
  },
  switchRope: {
    width: 5,
    height: 600,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  switchHolder: {
    width: 50,
    height: 100,
    borderColor: "#fff",
    borderRadius: 30,
    borderWidth: 5,
    position: "relative",
    top: -40,
  },
});
