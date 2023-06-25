import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import LoginRegister from "./screens/LoginRegister";
import Dashboard from "./screens/Dashboard";
import Navbar from "./components/Navbar";
import Workout from "./screens/Workout";
import Weight from "./screens/Weight";
import Nutrition from "./screens/Nutrition";

// Sign Up Process
import Name from "./screens/signupProcess/Name";
import Credentials from "./screens/signupProcess/Credentials";
import Metrics from "./screens/signupProcess/Metrics";
import Gender from "./screens/signupProcess/Gender";
import Age from "./screens/signupProcess/Age";

const withNavbar = (Component) => {
  return (props) => (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <Component {...props} />
      <Navbar navigation={props.navigation} />
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  // Currently set as true for testing, replace with actual auth state
  const isSignedIn = true;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Conditional rendering of screens based on sign-in state */}
        {isSignedIn ? (
          // User is signed in
          <>
            <Stack.Screen name="LoginRegister" component={LoginRegister} />
            {/* Sign Up Process */}
            <Stack.Screen name="Name" component={Name} />
            <Stack.Screen name="Gender" component={Gender} />
            <Stack.Screen name="Age" component={Age} />
            <Stack.Screen name="Metrics" component={Metrics} />
            <Stack.Screen name="Credentials" component={Credentials} />
            <Stack.Screen name="Dashboard" component={withNavbar(Dashboard)} />
            <Stack.Screen name="Workout" component={withNavbar(Workout)} />
            <Stack.Screen name="Weight" component={withNavbar(Weight)} />
            <Stack.Screen name="Nutrition" component={withNavbar(Nutrition)} />
          </>
        ) : (
          // User isn't signed in
          <>
            <Stack.Screen name="LoginRegister" component={LoginRegister} />
            <Stack.Screen name="Name" component={Name} />
            <Stack.Screen name="Gender" component={Gender} />
            <Stack.Screen name="Age" component={Age} />
            <Stack.Screen name="Metrics" component={Metrics} />
            <Stack.Screen name="Credentials" component={Credentials} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
