import { textInputAreaProps } from "@/styles/globalProps";
import styles from "./AuthShared.styles";

export const cpfInputProp = {
  ...textInputAreaProps,

  style: styles.textInput,

  placeholder: "CPF",
  autoCapitalize: "none",
  autoCorrect: false,
  autoComplete: "off",
  keyboardType: "numeric",

} as const;

export const passwordInputProp = {
  ...textInputAreaProps,

  style: styles.textInput,

  secureTextEntry: true,
  placeholder: "Senha",

} as const;
