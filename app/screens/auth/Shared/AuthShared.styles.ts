import { COLORS, CONTAINERS } from "@/styles/themes";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textInput: {
    borderRadius: CONTAINERS.radius.md,
    marginBlock: CONTAINERS.spacings.md,
    backgroundColor: COLORS.surface.secondary,
  },
});

export default styles;