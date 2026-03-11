import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomModalScreen from "./components/CustomModal.js"

export default function App() {
  return (
    <SafeAreaProvider>
      <CustomModalScreen animation="slide" themeColor="#2196F3"/>
    </SafeAreaProvider>
  );
}


