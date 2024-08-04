import * as React from "react";
import { Text, StyleSheet, View, Image, Touchable, TouchableOpacity } from "react-native";
import { Padding, FontFamily, Color, FontSize, Border } from "../../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
const MentorProfile = (props) => {
  const navigation=useNavigation();
  console.log(props);
  const signout=()=>{
    AsyncStorage.setItem('isLoggedInMentor', '');
    AsyncStorage.setItem('token', '');
    props.navigation.navigate('StackNav',{screen:"GetStarted"})
  }
  return (
    <View style={styles.settings}>
      <View style={styles.settings1}>
        <View style={[styles.listItem, styles.listItemFlexBox]}>
          <View style={styles.content}>
            <Text style={[styles.title, styles.titleTypo]}>Change Name</Text> 
          </View>    
        </View>
        <View style={[styles.listItem1, styles.dividerIconSpaceBlock]}>
          <View style={styles.content}>
            <TouchableOpacity >
            <Text style={[styles.title, styles.titleTypo]}>Notifications</Text>   
            </TouchableOpacity>
          </View>  
        </View>
        <View style={[styles.listItem1, styles.dividerIconSpaceBlock]}>
          <View style={styles.content}>
            <TouchableOpacity onPress={signout}>
            <Text style={[styles.title, styles.titleTypo]}>LogOut</Text>   
            </TouchableOpacity>
          </View>  
        </View>
        
      </View>
      <View style={styles.profileInfo}>
        <Image
          style={styles.avatarIcon}
          resizeMode="cover"
          source={require("../../assets/avatar.png")}
        />
        <View style={styles.name}>
          <Text style={styles.pranjalKole2302cs02}>{props.route.params.name}</Text>
        </View>
      </View>
      
     
      
    </View>
  )
}

const styles = StyleSheet.create({
  listItemFlexBox: {
    padding: Padding.p_base,
    flexDirection: "row",
    alignItems: "center",
  },
  titleTypo: {
    fontFamily: FontFamily.bodyBodyS,
    textAlign: "left",
    alignSelf: "stretch",
  },
  dividerIconSpaceBlock: {
    marginTop: 2,
    alignSelf: "stretch",
  },
  iosPosition: {
    right: 0,
    left: 0,
    position: "absolute",
  },
  timeTypo: {
    fontFamily: FontFamily.sFProText,
    color: Color.neutralDarkDarkest,
    position: "absolute",
  },
  pageTitlePosition: {
    left: "50%",
    position: "absolute",
  },
  title: {
    lineHeight: 20,
    textAlign: "left",
    color: Color.neutralDarkDarkest,
    fontSize: FontSize.headingH4_size,
  },
  description: {
    fontSize: FontSize.bodyBodyS_size,
    lineHeight: 16,
    color: Color.neutralDarkLight,
    display: "none",
    marginTop: 4,
    letterSpacing: 0.1,
    textAlign: "left",
  },
  content: {
    flex: 1,
  },
  rightButtonIcon: {
    width: 12,
    height: 12,
    marginLeft: 16,
    overflow: "hidden",
  },
  listItem: {
    alignSelf: "stretch",
    padding: Padding.p_base,
    flexDirection: "row",
  },
  dividerIcon: {
    maxHeight: "100%",
    maxWidth: "100%",
    marginTop: 2,
    overflow: "hidden",
    width: "100%",
  },
  dividerIcon1: {
    height: 0,
    maxWidth: "100%",
    marginTop: 2,
    overflow: "hidden",
    width: "100%",
  },
  listItem1: {
    padding: Padding.p_base,
    flexDirection: "row",
    alignItems: "center",
  },
  settings1: {
    top: 253,
    width: 375,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_5xl,
    left: 0,
    position: "absolute",
  },
  avatarIcon: {
    width: 82,
    height: 82,
  },
  pranjalKole2302cs02: {
    fontSize: FontSize.headingH3_size,
    fontWeight: "900",
    fontFamily: FontFamily.headingH3,
    textAlign: "center",
    letterSpacing: 0.1,
    color: Color.neutralDarkDarkest,
  },
  name: {
    marginTop: 16,
    alignItems: "center",
  },
  profileInfo: {
    top: 100,
    left: 1,
    width: 374,
    justifyContent: "center",
    paddingHorizontal: 140,
    paddingVertical: Padding.p_5xs,
    alignItems: "center",
    position: "absolute",
  },
  time: {
    marginTop: -9,
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    fontWeight: "600",
    width: 54,
    top: "50%",
    textAlign: "center",
    left: 0,
  },
  action: {
    height: "40.91%",
    width: "14.32%",
    top: "31.82%",
    right: "80.37%",
    bottom: "27.27%",
    left: "5.31%",
    position: "absolute",
    overflow: "hidden",
  },
  battery: {
    top: -3,
    left: 41,
    fontSize: FontSize.size_mid,
    textAlign: "left",
  },
  signalIcon: {
    width: 17,
    height: 11,
  },
  wiFi: {
    top: -1,
    left: 21,
    textAlign: "left",
    fontSize: FontSize.headingH4_size,
  },
  container: {
    marginTop: -6,
    right: 14,
    width: 68,
    height: 14,
    top: "50%",
    position: "absolute",
    overflow: "hidden",
  },
  iosStatusBar: {
    top: 0,
    height: 44,
    backgroundColor: Color.neutralLightLightest,
  },
  homeIndicator: {
    marginLeft: -66.5,
    bottom: 8,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.neutralDarkDarkest,
    width: 134,
    height: 5,
  },
  iosHomeIndicator: {
    bottom: 0,
    height: 34,
  },
  pageTitle: {
    marginTop: -8.5,
    marginLeft: -97,
    fontWeight: "800",
    fontFamily: FontFamily.headingH4,
    top: "50%",
    textAlign: "center",
    color: Color.neutralDarkDarkest,
    fontSize: FontSize.headingH4_size,
  },
  navBar: {
    top: 44,
    right: 67,
    left: -67,
    height: 56,
    position: "absolute",
    overflow: "hidden",
    backgroundColor: Color.neutralLightLightest,
  },
  settings: {
    height: 812,
    overflow: "hidden",
    width: "100%",
    flex: 1,
    backgroundColor: Color.neutralLightLightest,
  },
});

export default MentorProfile