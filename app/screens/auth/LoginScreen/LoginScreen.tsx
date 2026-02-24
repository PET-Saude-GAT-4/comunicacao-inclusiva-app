import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  keyboardAvoidantView,
  primaryButtonProps,
  textInputAreaProps,
} from "@/styles/globalProps";

import styles from "./LoginScreen.styles";

export default function LoginScreen() {
  const [cpf, setCPF] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {};
  const handlePasswordReset = () => {};
  const handleSignIn = () => {};

  return (
    <SafeAreaView style={styles.backgroundContainer}>
      <ScrollView {...keyboardAvoidantView}>
        <KeyboardAvoidingView
          style={styles.backgroundContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={{ flex: 5 }}>
            <View style={styles.contentContainer}>
              <Image source={require("../../../../assets/images/icon.png")} />
            </View>
          </View>
          <View style={styles.generalContainer}>
            <Text style={styles.headerText}>Entrar</Text>
            <TextInput
              style={styles.textInput}
              placeholder="CPF"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              keyboardType="numeric"
              {...textInputAreaProps}
              onChangeText={(cpf) => setCPF(cpf)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Senha"
              secureTextEntry
              onChangeText={(password) => setPassword(password)}
              {...textInputAreaProps}
            />
            <TouchableWithoutFeedback onPress={() => handlePasswordReset()}>
              <Text style={styles.hyperlinkText}>Esqueci minha senha!</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handleSignIn()}>
              <Text style={styles.hyperlinkText}>
                Não está cadastrado ainda? Cadastre-se!
              </Text>
            </TouchableWithoutFeedback>
            <Button
              style={styles.button}
              onPress={() => handleLogin()}
              {...primaryButtonProps}
              // Props for these components can and should be managed in a separate file
            >
              Entrar
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
