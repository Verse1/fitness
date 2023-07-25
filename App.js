import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider } from "./context/auth";

// Screens
import LoginRegister from "./screens/LoginRegister";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Navbar from "./components/Navbar";
import Weight from "./screens/Weight";
import Nutrition from "./screens/Nutrition";
import InputWeight from "./screens/InputWeight";
import Reco from "./screens/Reco";
import LogMeal from "./screens/LogMeal";
import GeneratedMeals from "./screens/GeneratedMeals";
// Sign Up Process
import Name from "./screens/signupProcess/Name";
import Credentials from "./screens/signupProcess/Credentials";
import Metrics from "./screens/signupProcess/Metrics";
import Gender from "./screens/signupProcess/Gender";
import Age from "./screens/signupProcess/Age";
import Loading from "./screens/Loading";
import GeneratedWorkout from "./screens/workout/GeneratedWorkout";
import Macros from "./screens/signupProcess/Macros";

// New Changes
import AddWorkout from "./screens/workout/AddWorkout";
import Workout from "./screens/workout/Workout";
import WorkoutView from "./screens/workout/WorkoutView";
import WorkoutSplit from "./screens/workout/WorkoutSplit";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Conditional rendering of screens based on sign-in state */}
            {isSignedIn ? (
              // User is signed in
              <>
                <Stack.Screen name="LoginRegister" component={LoginRegister} />
                <Stack.Screen name="Login" component={Login} />
                {/* Sign Up Process */}
                <Stack.Screen name="Name" component={Name} />
                <Stack.Screen name="Gender" component={Gender} />
                <Stack.Screen name="Age" component={Age} />
                <Stack.Screen name="Metrics" component={Metrics} />
                <Stack.Screen name="Macros" component={Macros} />
                <Stack.Screen name="Credentials" component={Credentials} />

                {/* Workout Pages */}
                <Stack.Screen name="Workout" component={withNavbar(Workout)} />
                <Stack.Screen name="AddWorkout" component={AddWorkout} />
                <Stack.Screen name="WorkoutView" component={WorkoutView} />
                <Stack.Screen name="WorkoutSplit" component={WorkoutSplit} />

                <Stack.Screen name="Dashboard" component={withNavbar(Dashboard)} />
                <Stack.Screen name="Weight" component={withNavbar(Weight)} />
                <Stack.Screen name="Nutrition" component={withNavbar(Nutrition)} />
                <Stack.Screen name="InputWeight" component={InputWeight} />
                <Stack.Screen name="Reco" component={Reco} />
                <Stack.Screen name="LogMeal" component={LogMeal} />
                <Stack.Screen name="GeneratedMeals" component={GeneratedMeals} />
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="GeneratedWorkout" component={GeneratedWorkout} />
              </>
            ) : (
              // User isn't signed in
              <>
                <Stack.Screen name="LoginRegister" component={LoginRegister} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Name" component={Name} />
                <Stack.Screen name="Gender" component={Gender} />
                <Stack.Screen name="Age" component={Age} />
                <Stack.Screen name="Metrics" component={Metrics} />
                <Stack.Screen name="Credentials" component={Credentials} />
                <Stack.Screen name="Macros" component={Macros} />
              </>
            )}
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
