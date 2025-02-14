import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigation from "./src/navigation";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigation />
          <Toast />
        </PersistGate>
      </Provider>

    </SafeAreaProvider>
  );
}