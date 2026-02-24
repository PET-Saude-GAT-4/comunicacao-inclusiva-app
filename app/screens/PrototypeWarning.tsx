import React from "react";
import { Image, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const PrototypeWarningScreen = () => {
  // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // const handleTouch = () => {
  //     navigation.navigate('login-window');
  // }

  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{}}>
        <Text style={{ fontSize: 24, width: "auto", textAlign: "center" }}>
          Função Não Prototipada
        </Text>
      </View>
      <View style={{ marginBlock: 40, alignItems: "center" }}>
        <Image style={{}} source={require("../../assets/images/alert.png")} />
      </View>
    </SafeAreaView>
  );
};

export default PrototypeWarningScreen;
