import { COLORS } from "../../../styles/themes"; 
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 35,
  },
  boardImg: {
    width: 76,
    height: 76,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: "#E8D2E6",
  },
  boardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap:15
  },
  delete: {
    backgroundColor: "#ff0000b5",
    borderRadius: 50,
    padding: 10,
  },
  edit: {
    backgroundColor: COLORS.surface.secondary,
    borderRadius: 50,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 24,
  },
  pictrogramDiv: {
    flex: 1,
    backgroundColor: COLORS.surface.secondary,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    margin: 6,
    minWidth: "20%",
    maxWidth: "22%",
    aspectRatio: 0.85,
  },
  pictrogramImg: {
    width: 48,
    height: 48,
    marginBottom: 8,
    resizeMode: "contain",
  },
  pictrogramText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
});
