import { RootStackParamList } from "@/navigation/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { View } from "react-native";

export default function FeedbackScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "FeedbackScreen">>();

  const { pictograms, message, senderSpeaker } = route.params;

  return <View></View>;
}
