import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface OfflineBannerProps {
  visible: boolean;
  onClose: () => void;
}

export function OfflineBanner({ visible, onClose }: OfflineBannerProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="cloud-off"
        size={16}
        color="white"
        style={styles.icon}
      />
      <Text style={styles.text}>
        Servidor indisponível. Exibindo dados salvos.
      </Text>
      <TouchableOpacity onPress={onClose} style={styles.close}>
        <MaterialIcons name="close" size={18} color="white" />
      </TouchableOpacity>
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
    flex: 1,
    textAlign: "center",
  },
  icon: {
    marginRight: 6,
  },
  close: {
    marginLeft: "auto",
  },
});
