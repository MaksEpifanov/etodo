import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamsList {}
//   }
// }

export type RootStackParamsList = {
  Root: NativeStackScreenProps<RootDrawerParamList>;
  UpdateTodo: { todoId: string };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, Screen>;

export type RootDrawerParamList = {
  Home: undefined;
  AddTodo: undefined;
  Shredder: undefined;
};

export type RootDrawerScreenProps<Screen extends keyof RootDrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<RootDrawerParamList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >;
