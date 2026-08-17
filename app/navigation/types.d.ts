import { Pictogram } from "@/types/pictogram.types";
import { Profession } from "@/types/Profession.types";

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

export type Speaker = "patient" | "professional";

// RootStackParamList is the default list of Params for useNavigation()
export type RootStackParamList = {
  AuthNav: undefined;
  MainTabNav: undefined;
  FeedbackScreen: {
    pictograms: Pictogram[];
    textContent?: string;
    senderSpeaker: Speaker;
  };
  ReportScreen: undefined;
  TutorialStackNav: undefined;
};

export type AuthStackParamList = {
  Placeholder: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  PasswordResetScreen: undefined;
};

export type MainTabParamList = {
  CommBoardStackNav: undefined;
};

export type CommBoardStackParamList = {
  NoConsultationScreen: undefined;
  CommBoardScreen: undefined;
  SelectProfessionScreen: undefined;
  SelectSpecialityScreen: { profession: Profession };
  ConfirmConsultationScreen:  { profession: Profession, speciality: Speciality };
  FeedbackScreen: {
    pictograms: Pictogram[];
    textContent?: string;
    senderSpeaker: Speaker;
  };
};

export type MyCollectionStackParamList = {
  BoardCollectionTab: undefined;
  BoardDetails: { board: Board };
};

export type BoardStackParamList = {
  placeholder: undefined;
};

export type LibraryBoardStackParamList = {
  LibraryTab: undefined;
  PublicBoards: undefined;
  PublicBoardDetails: { board: Board };
};

export type EmergencyStackParamList = {
  EmergencyTab: undefined;
  ModuleVisualization: { board: Board };
};
