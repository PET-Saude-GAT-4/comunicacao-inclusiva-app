import React from "react";
import { Image, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";


const PrototypeWarningScreen = () => {
    // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // const handleTouch = () => {
    //     navigation.navigate('login-window');
    // }

    const theme = useTheme();

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={{}}>
                <Text style={{ fontSize: 24, width: "auto", textAlign: "center" }}>
                    Função Não Prototipada
                </Text>
            </View>
            <View style={{ marginBlock: 40, alignItems: "center" }}>
                <Image style={{}}
                    source={require("../../assets/images/alert.png")}
                />
            </View>
        </View>
    )
};


export default PrototypeWarningScreen;