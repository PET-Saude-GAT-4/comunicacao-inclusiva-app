import { useSession } from "@/hooks/useSession";
import { formatDateBR, formatTimeBR } from "@/utils/dateFormatter";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./ReportScreen.styles";
import { useClipboard } from "@/hooks/useClipboard";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ReportScreen() {
  const navigation = useNavigation();
  const { interactions, endConsultation } = useSession();

  const consultationDate =
    interactions.length > 0
      ? formatDateBR(interactions[0].timestamp)
      : formatDateBR(new Date().toISOString());


  const text = useClipboard(interactions);
  const copyToClipboard = async () => {
    console.log("Relatorio copiado")
    await Clipboard.setStringAsync(text);
    Alert.alert("Sucesso", "Relatório copiado para a área de transferência.")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Atendimento — {consultationDate}</Text>
      <FlatList
        data={interactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isPatient = item.speaker === "patient";
          const speaker = isPatient ? "Paciente" : "Profissional";
          const bubbleStyle = isPatient
            ? styles.bubblePatient
            : styles.bubbleProfessional;

          function renderContent() {
            return (
              <>
                {item.type === "pictogram" && Array.isArray(item.content) ? (
                  <View style={styles.pictogramScroll}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {item.content.map((pictogram, index) => (
                        <View
                          key={`${pictogram.uuid}-${index}`}
                          style={styles.pictogramDiv}
                        >
                          <Image
                            source={{ uri: pictogram.imageSource }}
                            style={styles.pictogramImage}
                          />
                          <Text style={styles.pictogramText} numberOfLines={1}>
                            {pictogram.description.toUpperCase()}
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                ) : (
                  <Text style={styles.text}>{item.content as string}</Text>
                )}
                {!item.understood && (
                  <Text style={styles.confusionText}>❓ Não entendi</Text>
                )}
              </>
            );
          }

          return (
            <View style={bubbleStyle}>
              <Text style={styles.title}>{speaker}</Text>
              {renderContent()}
              <Text style={styles.timestamp}>
                {formatTimeBR(item.timestamp)}
              </Text>
            </View>
          );
        }}
      ></FlatList>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.newConsultationButton}
          onPress={() => {
            endConsultation();
            navigation.goBack();
          }}
        >
          <Text style={styles.newConsultationText}>Finalizar atendimento</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.clipboardButton}
          onPress={copyToClipboard}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons name="copy-outline" size={20} color="black" />
            <Text style={styles.clipboardText}>Copiar</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
}
