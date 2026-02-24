/*
        This file extends as a type safe way to ensure navigation between the right stacks
    defining exactly what params go through each stack or tab exchange, and what to do
    with all of that.
        Check more on this matter when searching "Type Checking The Navigator". Or, through the
    docs themselves (dynamic): https://reactnavigation.org/docs/typescript/#type-checking-the-navigator
 */

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// RootStackParamList is the default list of Params for useNavigation()
type RootStackParamList = {
  AuthNav: undefined;
  MainTabNav: undefined;
};

export type { RootStackParamList };

export type AuthStackParamList = {
  Placeholder: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  PasswordResetScreen: undefined;
};

export type MainTabParamList = {
  CommBoardStackNav: undefined;
};

export type CommBoardStackParamList = {};
