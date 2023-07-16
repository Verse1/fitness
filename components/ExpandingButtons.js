import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal
} from "react-native";
import React, { useEffect, useLayoutEffect, useState, useRef, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { AuthContext } from "../context/auth";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const ModalPop = ({visible, children}) =>{
  const [showModal, setShowModal] = useState(visible)


  const scaleValue = useRef(new Animated.Value(0)).current;

  

  useEffect(() =>{
    toggleModal(); 
  }), [visible]

  const toggleModal = () =>{
    if(visible){
      setShowModal(true)
      Animated.spring(scaleValue,{
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start()
    }else{
      setTimeout(() => setShowModal(false), 200)
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300, 
        useNativeDriver: true
      }).start()
    }

  }
  return  (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View style={[styles.modalContainer, {transform:[{scale:scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>

    </Modal>
  )
}

const ExpandingButtons = (props) => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false)

  const [icon_1] = useState(new Animated.Value(0));
  const [icon_2] = useState(new Animated.Value(0));
  const [icon_3] = useState(new Animated.Value(0));

  const [pop, setPop] = useState(false);
  const [rotation] = useState(new Animated.Value(0));
  const [lastButtonRotation] = useState(new Animated.Value(0));

  

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 75,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 150,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(icon_3, {
      toValue: 225,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(rotation, {
      toValue: 45,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(rotation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotateLastButton = () => {
    Animated.timing(lastButtonRotation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const plusButtonRotation = rotation.interpolate({
    inputRange: [0, 45],
    outputRange: ["0deg", "45deg"],
  });

  const [state, setState] = useContext(AuthContext);

  const [dailyProtein, setDailyProtein] = useState("")
  const [dailyCarbs, setDailyCarbs] = useState("")
  const [dailyFats, setDailyFats] = useState("")
  const [dailyCalories, setDailyCalories] = useState("")


  useEffect(() => {
    if (state) {
      setDailyCalories(state.user.dailyCalories.toString())
      setDailyProtein(state.user.dailyProtein.toString())
      setDailyCarbs(state.user.dailyCarbs.toString())
      setDailyFats(state.user.dailyFats.toString())

    }
  }, [state]);


  const handleMacroSet = async () =>{
    //Check if all are Numberic

    if(isNaN(dailyCalories) || isNaN(dailyCarbs) || isNaN(dailyFats) || isNaN(dailyProtein) ){
      Alert.alert(
        'Invalid Macros',
        'Please make sure all values are numberic.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]
      );

    }else{
      console.log("in")
      try{
         const resp = await axios.post("http://localhost:8000/api/macros", {
          dailyCalories: parseInt(dailyCalories), 
          dailyProtein: parseInt(dailyProtein),
          dailyFats: parseInt(dailyFats),
          dailyCarbs: parseInt(dailyCarbs),
          id: state.user._id,
         })
         if(resp.data.error){
            alert(resp.data.error);
         }else{
          setState(resp.data);
          console.log("This", resp.data);
          await AsyncStorage.setItem("auth-rn", JSON.stringify(resp.data));
          setVisible(false)

         }


      } catch (err) {
        console.log(err)
      }
    }

  }


  return (
    <View style={{ flex: 1 }}>
    <ModalPop visible={visible}>
        <View style={{width: '100%', flexDirection: "row", paddingBottom: 20}}>
          <Text style={{fontSize: 18, fontWeight: '700', width: '88%', paddingTop: 3}}>Customize your macros!</Text>
          <TouchableOpacity style={{backgroundColor: '#00A3FF',  justifyContent: 'center', alignItems: 'center', width: 30, height: 30, borderRadius: 15}} onPress={ () =>  setVisible(false)}>
            <EvilIcon name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.macroContainer}>
          <View style={styles.oneMacro}>
          <Text style={{fontSize: 15, fontWeight: '500', width: '95%'}}>Calories</Text>
          <TextInput style={styles.input}  onChangeText={setDailyCalories}  value={dailyCalories.toString()}    caretHidden={true} />
          </View>
          <View style={styles.oneMacro}>
          <Text style={{fontSize: 15, fontWeight: '500', width: '95%'}}>Protein</Text>
          <TextInput style={styles.input}  onChangeText={setDailyProtein}   value={dailyProtein.toString()}  caretHidden={true} />
          </View>
          <View style={styles.oneMacro}>
          <Text style={{fontSize: 15, fontWeight: '500', width: '95%'}}>Carbs</Text>
          <TextInput style={styles.input}   onChangeText={setDailyCarbs}  value={dailyCarbs.toString()}   caretHidden={true} />
          </View>
          <View style={styles.oneMacro}>
          <Text style={{fontSize: 15, fontWeight: '500', width: '95%'}}>Fats</Text>
          <TextInput style={styles.input}   onChangeText={setDailyFats} value={dailyFats.toString()} caretHidden={true} />

          </View>
          <View style={{ marginTop: 10}}>
          <TouchableOpacity onPress={() => handleMacroSet()} style={{backgroundColor: "#00A3FF", width: '120%', height: "50%", justifyContent: 'center', alignItems: 'center', borderRadius: 50,}} >
            <Text style={{color: 'white', fontSize: 20}}>Set Macros</Text>

          </TouchableOpacity>
          </View>


        </View>
        
      </ModalPop>
      <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate("LogMeal") 
          }}>
                    <Icon name="cloud-upload" size={25} color="white" />

        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.circle, { bottom: icon_2 }]}>
        <TouchableOpacity onPress={() => navigation.navigate("Reco")}>
          <Icon name="cloud-upload" size={25} color="white" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.circle, { bottom: icon_3 }]}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Icon name="cloud-upload" size={25} color="white" />
        </TouchableOpacity>
      </Animated.View>


      <TouchableOpacity
        style={[styles.circle, { transform: [{ rotate: plusButtonRotation }] }]}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}
        activeOpacity={1}>
        <Animated.View>
          <Icon name="plus" size={25} color="white" />
        </Animated.View>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "#00A3FF",
    width: 60,
    height: 60,
    position: "absolute",
    right: screenWidth * 0.05,
    bottom: screenHeight * 0,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalBackground:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'

  },
  modalContainer:{
    backgroundColor: 'white',
    width: '80%',
    height: '40%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,

  },
  macroContainer:{
    width: '80%',
    height: '60%',
  },
  oneMacro:{
    flexDirection: 'row',
    paddingVertical: 15
  },
  input:{
    backgroundColor: "rgb(220,220,220)",
    width: "25%",
    borderColor: "gray",
    fontSize: 12,
    textAlign: 'center',
    borderRadius: "10",
    height: 20
  }
});

export default ExpandingButtons;
