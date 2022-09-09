/* eslint-disable react/jsx-props-no-spreading */
import "react-native-gesture-handler";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { store } from "./src/store";
import Navigation from "./src/navigation";

const App = () => (
  <Provider store={store}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ApplicationProvider>
  </Provider>
);

export default App;
