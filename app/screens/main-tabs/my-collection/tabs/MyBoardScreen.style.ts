import { COLORS } from "@/styles/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  boardBackground: {
    backgroundColor: COLORS.surface.secondary,
    height: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    padding: 20,
    flexDirection: "row",
  },
  boardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  divider: {
    width: 2,
    height: 80,
    backgroundColor: COLORS.outlineCommon,
    marginHorizontal: 8,
  },
  boradTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
