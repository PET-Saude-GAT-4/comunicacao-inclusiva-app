import { MaterialIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";

interface OfflineBannerProps {
  visible: boolean;
}

export function OfflineBanner({ visible }: OfflineBannerProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <MaterialIcons name="cloud-off" size={16} color="white" style={styles.icon}/>
      <Text style={styles.text}>Servidor indisponível. Exibindo dados salvos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF3B30",
    paddingVertical: 4,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  icon: {
    marginRight: 6,
  },
});
