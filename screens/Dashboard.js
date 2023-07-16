import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useLayoutEffect, useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/Navbar";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContext } from "../context/auth";

// Screen dimensions
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

let utubeAPIKEY = "AIzaSyCEuZka21EnXBF0yM217BQRw7mpAertXEs";
let videoSearchArray = [
  "CBUM workout routine",
  "CBUM diet plan",
  "Fitness influencers workout",
  "Best bodybuilding exercises",
  "Shoulder day workout",
  "CBUM training tips",
  "Fitness influencer transformations",
  "Bodybuilding motivational videos",
  "Nutrition tips for bodybuilders",
  "Muscle recovery techniques",
  "Leg Day",
  "Back Day",
  "Cutting and Bulking Strategies",
  "Fitness Influencer Challenge",
  "HIIT Workouts",
  "Protein-rich recipes for bodybuilders",
  "Strength training workouts",
  "CBUM lifestyle",
  "Bodybuilding competitions",
  "Bodybuilding poses tutorial",
  "CBUM supplement routine",
  "Bodybuilding meal prep",
  "Best gym equipment for bodybuilding",
  "Bodybuilding myths debunked",
  "Bodybuilder day in the life",
  "Bodybuilding documentary",
  "Female fitness influencers",
  "Bodybuilding motivation",
  "Bodybuilder interview",
  "Fitness influencer gym routine",
  "How to start bodybuilding",
  "Bodybuilding vs Powerlifting",
  "Bodybuilding tips for beginners",
  "Fitness influencers cardio routine",
  "CrossFit workouts",
  "Bodybuilding home workouts",
  "Fitness influencers Q&A",
  "Bodybuilder vlogs",
  "Bodybuilder travel routine",
  "Workout playlists",
  "Fitness model workout routine",
  "How to become a fitness influencer",
  "Bodybuilder skincare routine",
  "Fitness influencers diet",
  "Bodybuilding grocery haul",
  "Bodybuilding stretching routine",
  "Pre-workout vs Post-workout meals",
  "Bodybuilder workout and diet",
  "Bodybuilding cooking tips",
  "Bodybuilder workout music",
];

let search = `https://www.googleapis.com/youtube/v3/search?key=${utubeAPIKEY}&q=pull day&type=video&maxResults=5&part=snippet`;

let hardCodedPlaylists = [
  {
    image: "https://i.scdn.co/image/ab67706c0000da841aeb5e4c64f71bb6dc97dd1c",
    url: "https://open.spotify.com/playlist/6hwjHl90iQXO8JdBAbA3ky",
  },
  {
    image: "https://i.scdn.co/image/ab67706c0000da842f2eff7da6b035f1fb1ea4f7",
    url: "https://open.spotify.com/playlist/7kfohPIiBUM4tF2B8YEn85",
  },
  {
    image: "https://i.scdn.co/image/ab67706c0000da8444b3ae92f2d4e13759ff819d",
    url: "https://open.spotify.com/playlist/4zbcJeMb3ERz7IXg8GrlMB",
  },
  {
    image: "https://i.scdn.co/image/ab67706c0000da842284acb61f89ef8ab9775c8f",
    url: "https://open.spotify.com/playlist/0Ss1MAeS8AiwQylR6C21cj",
  },
  {
    image: "https://i.scdn.co/image/ab67706c0000da84bea7dd2872555605bf4860c7",
    url: "https://open.spotify.com/playlist/1BelNbncQam23oXyJBICsy",
  },
  {
    image: "https://i.scdn.co/image/ab67706c0000da84a2d8311f2300d23baac12f0e",
    url: "https://open.spotify.com/playlist/3iPLJ8T1TRjElEPOsNUISN",
  },
  {
    image: "https://i.scdn.co/image/ab67706c0000da84622c36e105af4aac83c34e77",
    url: "https://open.spotify.com/playlist/7JIGfa0KkCTDxUPOQySODP",
  },
];

handleClick = (link) => {
  Linking.canOpenURL(`${link}`).then((supported) => {
    if (supported) {
      Linking.openURL(`${link}`);
    } else {
      console.log("Don't know how to open URI: " + "https://google.com");
    }
  });
};

const chooseGymplaylist = () => {
  const result = [];
  const copiedArr = [...hardCodedPlaylists];

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * copiedArr.length);
    const randomItem = copiedArr[randomIndex];
    result.push(randomItem);
    copiedArr.splice(randomIndex, 1); // Splice out the selected item from the copied array
  }

  return result;
};

const Dashboard = (props) => {
  const [url, setUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [name, setName] = useState("");
  const [state, setState] = useContext(AuthContext);

  useEffect(() => {
    if (state) {
      const { name, email, gender, weight, height, age } = state.user;
      setName(name);
    }
  }, [state]);
  const navigation = useNavigation();

  // Date details
  const today = new Date();
  const currentDate = today.toDateString();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      const randomTopics = getRandomTopics(videoSearchArray, 5);

      for (let i = 0; i < randomTopics.length; i++) {
        const currentTopic = randomTopics[i];
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${utubeAPIKEY}&q=${currentTopic}&type=video&maxResults=1&part=snippet`;

        try {
          const response = await fetch(apiUrl);
          const json = await response.json();

          // Filter videos so there are no duplicates cus I added a key to each video but then I got duplicate key warning
          if (json.items && json.items.length > 0) {
            setVideos((prevVideos) => [...prevVideos, json.items[0]]);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    const retrieveVideos = async () => {
      try {
        const storedVideos = await AsyncStorage.getItem("videos");
        if (storedVideos) {
          // Filter videos so that they are unique so there is no duplicate key warning
          const videosFromStorage = JSON.parse(storedVideos);
          const uniqueVideos = [
            ...new Map(videosFromStorage.map((item) => [item.id.videoId, item])).values(),
          ];
          setVideos(uniqueVideos);
        } else {
          fetchVideos();
        }
      } catch (error) {
        console.error(error);
      }
    };

    const scheduleVideoUpdate = () => {
      const now = new Date();
      const targetTime = new Date(now);
      targetTime.setHours(0, 5, 40); // Set the target time to 11:32:30 PM today

      let timeDiff = targetTime.getTime() - now.getTime();
      if (timeDiff < 0) {
        // If the target time has already passed, move it to 11:32:30 PM tomorrow
        targetTime.setDate(targetTime.getDate() + 1);
        timeDiff = targetTime.getTime() - now.getTime();
      }

      setTimeout(() => {
        fetchVideos();
        setInterval(fetchVideos, 24 * 60 * 60 * 1000); // Update videos every 24 hours
      }, timeDiff);
    };

    retrieveVideos();
    scheduleVideoUpdate();
  }, []);

  useEffect(() => {
    const storeVideos = async () => {
      try {
        await AsyncStorage.setItem("videos", JSON.stringify(videos));
      } catch (error) {
        console.error(error);
      }
    };

    storeVideos();
  }, [videos]);

  const getRandomTopics = (array, count) => {
    const shuffledArray = array.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  };

  const gymPlaylistArray = props.gymPlaylistArray;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Profle Picture */}
      <View style={styles.user}>
        <Image style={styles.pfp} source={require("../images/cole.jpeg")}></Image>

        {/* Welcome Text and Date */}
        <View style={styles.innerText}>
          <Text style={styles.userText}>Welcome, {name}!</Text>

          <Text style={styles.date}>
            {currentDate.slice(4, 10)},{currentDate.slice(10)}
          </Text>
        </View>
      </View>

      {/* Dashboard */}
      {/* <View style={styles.middleSection}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
        </View>
      </View> */}

      {/* <Pressable>
        <Text onPress={() => navigation.navigate("LoginRegister")}>
          LoginRegister (Temporary)
        </Text>
      </Pressable> */}

      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          paddingLeft: 20,
          paddingTop: 10,
          paddingBottom: 10,
        }}>
        Recommended Gym Playlists
      </Text>
      <View style={styles.playListSection}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => handleClick(gymPlaylistArray[0].url)}>
            <Image
              style={styles.playlistPicture}
              source={{ uri: gymPlaylistArray[0].image }}></Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleClick(gymPlaylistArray[1].url)}>
            <Image
              style={styles.playlistPicture}
              source={{ uri: gymPlaylistArray[1].image }}></Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleClick(gymPlaylistArray[2].url)}>
            <Image
              style={styles.playlistPicture}
              source={{ uri: gymPlaylistArray[2].image }}></Image>
          </TouchableOpacity>
        </View>
      </View>

      {/*THis is the video sextion*/}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          paddingLeft: 20,
          paddingBottom: 5,
          paddingTop: 5,
        }}>
        Fitness Videos
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.videoSection}>
        {videos.map((video) => (
          // I added a key to each video so the error is gone but now getting duplicate error cus the YoutubeAPi has duplicate videos
          // To fix we need to filter out but later
          <View key={video.id.videoId} style={styles.videoCard}>
            <Image
              source={{ uri: video.snippet.thumbnails.medium.url }}
              style={{
                width: 240,
                height: 120,
                top: -10,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <Text style={{ width: "90%", paddingLeft: 15 }}>{video.snippet.title}</Text>
          </View>
        ))}

        {/* <TouchableOpacity activeOpacity={1} style={styles.videoCard} onPress={() => handleClick('https://google.com')}>
          <Image
            source={require("../images/place.jpg")}
            style={{ width: 240, height: 120 ,top :-10, borderTopLeftRadius: 20,  borderTopRightRadius: 20}}
          />

                  <Text style={{paddingLeft: 10,  paddingRight: 10, fontSize: 14, fontWeight: '400', paddingTop: 5}}>Spring Bulk Day 158 - Back</Text>

        </TouchableOpacity>
        <View style={styles.videoCard}>
          <Image
            source={require("../images/place.jpg")}
            style={{ width: 240, height: 120 ,top :-10, borderTopLeftRadius: 20,  borderTopRightRadius: 20}}
          />
                  <Text style={{paddingLeft: 10,  paddingRight: 10, fontSize: 14, fontWeight: '400', paddingTop: 0}}>The Ultimate PULL Workout For Muscle Growth [Back, Biceps, Rear Delts] (2023)
</Text>

        </View>
        <View style={styles.videoCard}>
          <Image
            source={require("../images/place.jpg")}
            style={{ width: 240, height: 120 ,top :-10, borderTopLeftRadius: 20,  borderTopRightRadius: 20}}
          />
                  <Text style={{paddingLeft: 10,  paddingRight: 10, fontSize: 14, fontWeight: '400', paddingTop: 8}}>Push Day with Mustafa the BUM ej fww !</Text>

        </View> */}
      </ScrollView>

      {/* Log Button */}

      {/* I commented this out because I declared it in the App.js so we can
      choose which pages got a navbar
      <View style={styles.bottom}>
        <Navbar />
      </View> */}
    </SafeAreaView>
  );
};

const gymPlaylistArray = chooseGymplaylist();

const styles = StyleSheet.create({
  user: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 20,
    paddingTop: 10,
    alignItems: "center",
  },
  pfp: {
    width: 75,
    height: 75,
    borderRadius: 60,
  },
  date: {
    paddingLeft: 21,
    paddingTop: 5,
    color: "gray",
    fontWeight: "500",
  },
  userText: {
    paddingLeft: 20,
    fontSize: 25,
  },
  // Navbar styling also moved to App.js
  // bottom: {
  //   position: "absolute",
  //   right: 0,
  //   left: 0,
  //   bottom: 0,
  // },
  button: {
    position: "absolute",
    backgroundColor: "#0081CF",
    right: screenWidth * 0.05,
    bottom: screenHeight * 0.02,
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 40,
    marginLeft: 2,
    marginBottom: 3,
  },
  middleSection: {
    paddingTop: 30,
  },
  header: {},
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 20,
  },
  videoSection: {
    paddingLeft: 8.5,
    height: screenHeight * 0.3,
  },
  videoCard: {
    borderRadius: 20,
    marginHorizontal: 7.5,
    backgroundColor: "white",
    paddingTop: 10,
    width: 240,
    height: screenHeight * 0.225,
    marginTop: 10,
    borderTopStartRadius: 300,
    borderTopEndRadius: 300,
    shadowOffset: { width: -5, height: 3 },
    shadowColor: "gray",
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  playListSection: {
    height: screenHeight * 0.15,
    paddingLeft: 15,
    paddingTop: 5,
  },
  playlistPicture: {
    width: screenWidth * 0.275,
    height: screenWidth * 0.275,
    borderRadius: 25,
    marginHorizontal: 7.5,
  },
});

export default (chooseGymplaylist) => <Dashboard gymPlaylistArray={gymPlaylistArray} />;
