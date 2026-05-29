import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSession } from "@/hooks/useSession";
import { COLORS } from "@/styles/themes";

export function SpeakerToggleButton() {
  const { currentSpeaker, setCurrentSpeaker } = useSession();
  const animatedValue = useRef(
    new Animated.Value(currentSpeaker === "professional" ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: currentSpeaker === "professional" ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [currentSpeaker]);

  const handleToggle = () => {
    setCurrentSpeaker(
      currentSpeaker === "professional" ? "patient" : "professional"
    );
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.secondary, COLORS.primaryDark],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 34],
  });

  const patientIconOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const professionalIconOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleToggle}>
      <Animated.View style={[styles.track, { backgroundColor }]}>
        {/* Patient Icon (Visible on the right side when patient is active) */}
        <Animated.View
          style={[
            styles.iconContainer,
            styles.rightIconPos,
            { opacity: patientIconOpacity },
          ]}
        >
          <MaterialCommunityIcons name="account" size={18} color="#FFF" />
        </Animated.View>

        {/* Professional Icon (Visible on the left side when professional is active) */}
        <Animated.View
          style={[
            styles.iconContainer,
            styles.leftIconPos,
            { opacity: professionalIconOpacity },
          ]}
        >
          <MaterialCommunityIcons name="medical-bag" size={18} color="#FFF" />
        </Animated.View>

        {/* Knob */}
        <Animated.View style={[styles.knob, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 66,
    height: 32,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    position: "relative",
  },
  knob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFF",
    position: "absolute",
    left: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
  },
  leftIconPos: {
    left: 6,
  },
  rightIconPos: {
    right: 6,
  },
});
