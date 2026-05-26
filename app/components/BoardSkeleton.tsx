import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";

export function BoardSkeleton() {
  const fadeAnim = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={styles.container}>
      <View style={styles.boardsContainer}>
        {[1, 2, 3, 4].map((i) => (
          <View key={`board-${i}`} />
        ))}
      </View>

      <ScrollView>
        <View style={styles.gridContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <View key={`pic-${i}`} style={styles.pictogramCard}>
              <View style={styles.pictogramImage} />
              <View style={styles.pictogramText} />
            </View>
          ))}
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  boardsContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  boardTab: {
    width: 80,
    height: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    marginRight: 12,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
  },
  pictogramCard: {
    width: "25%",
    padding: 8,
    alignItems: "center",
  },
  pictogramImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 8,
  },
  pictogramText: {
    width: "70%",
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
});
