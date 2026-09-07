// components/EmergencyPageIndicator.tsx
import { View, StyleSheet } from "react-native";
import { CONTAINERS } from "@/styles/themes";

const DOT_COLORS = [
  "#E8A0A0",
  "#F0B87A",
  "#F0DD8A",
  "#8ECFA6",
  "#9CB8DB",
];

type Props = {
  count: number;
  activeIndex: number;
};

export function ScrollIndicator({ count, activeIndex }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => {
        const isActive = index === activeIndex;
        const color = DOT_COLORS[index % DOT_COLORS.length];

        return (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: color,
                opacity: isActive ? 1 : 0.4,
                transform: [{ scale: isActive ? 1.3 : 1 }],
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: CONTAINERS.spacings.sm,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 100,
  },
});