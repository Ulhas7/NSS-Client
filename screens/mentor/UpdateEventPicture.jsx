
import * as React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, FontFamily, FontSize, Color } from "../../GlobalStyles";

const UpdateEventPicture = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.uploadEventPictures, styles.iconLayout]}>
      <View style={styles.contentSwitcher}>
        <View style={[styles.section1, styles.sectionFlexBox]}>
          <Text style={[styles.section, styles.sectionTypo]}>{`Hours 
Completed`}</Text>
        </View>
        <Image
          style={styles.dividerIcon}
          resizeMode="cover"
          source={require("../../assets/divider5.png")}
        />
        <Pressable
         onPress={() => navigation.navigate("MarkAttendance")}
        >

        <View style={[styles.section2, styles.sectionFlexBox]}>
          <Text style={[styles.section3, styles.sectionTypo]}>
            Mark Attendance
          </Text>
        </View>
        </Pressable>
        <Image
          style={styles.dividerIcon1}
          resizeMode="cover"
          source={require("../../assets/divider6.png")}
        />
        <View style={[styles.section31, styles.sectionFlexBox]}>
          <Text style={[styles.section, styles.sectionTypo]}>
            Upload Event Picture
          </Text>
        </View>
      </View>
      <Image
        style={styles.settingsIcon}
        resizeMode="cover"
        source={require("../../assets/settings.png")}
      />
      <Pressable
        style={styles.uploadEventPicturesChild}
        onPress={() => navigation.navigate("EventView1")}
      />
      <Text style={styles.paryatanWing}>Paryatan Wing</Text>
      <Text style={[styles.july24, styles.july24Typo]}>
        20 JULY , 24 7-8 pm
      </Text>
      <Text style={[styles.event1, styles.july24Typo]}>Event 1</Text>
      <Pressable
        style={[styles.zondiconsnotification, styles.rightButtonIconLayout]}
        onPress={() => navigation.navigate("UploadEventPictures1")}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../../assets/zondiconsnotification.png")}
        />
      </Pressable>
      <View style={[styles.iosStatusBar, styles.barBg]}>
        <View style={styles.action}>
          <Text style={[styles.time, styles.timeClr]}>9:41</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.battery, styles.timeClr]}>􀛨</Text>
          <Image
            style={styles.signalIcon}
            resizeMode="cover"
            source={require("../../assets/signal.png")}
          />
          <Text style={[styles.wiFi, styles.timeClr]}>􀙇</Text>
        </View>
      </View>
      <View style={[styles.navBar, styles.barBg]}>
        <Image
          style={[styles.rightButtonIcon, styles.rightButtonIconLayout]}
          resizeMode="cover"
          source={require("../../assets/right-button3.png")}
        />
        <Text style={[styles.pageTitle, styles.timeClr]}>Hey Pranjal!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: "100%",
    overflow: "hidden",
  },
  sectionFlexBox: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  sectionTypo: {
    fontFamily: FontFamily.headingH5,
    fontWeight: "700",
    textAlign: "center",
    fontSize: FontSize.bodyBodyS_size,
  },
  july24Typo: {
    fontFamily: FontFamily.bodyBodyS,
    textAlign: "right",
    position: "absolute",
  },
  rightButtonIconLayout: {
    height: 20,
    width: 20,
    position: "absolute",
  },
  barBg: {
    backgroundColor: Color.neutralLightLightest,
    position: "absolute",
  },
  timeClr: {
    color: Color.neutralDarkDarkest,
    position: "absolute",
  },
  section: {
    color: Color.neutralLightLightest,
    textAlign: "center",
  },
  section1: {
    zIndex: 4,
    display: "none",
    backgroundColor: Color.colorDarkslateblue_100,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_xs,
  },
  dividerIcon: {
    maxWidth: "100%",
    zIndex: 3,
    height: 10,
    overflow: "hidden",
  },
  section3: {
    color: Color.neutralDarkLight,
    textAlign: "center",
  },
  section2: {
    zIndex: 2,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_xs,
    backgroundColor: Color.neutralLightLight,
  },
  dividerIcon1: {
    width: 0,
    zIndex: 1,
    height: 10,
    display: "none",
  },
  section31: {
    zIndex: 0,
    backgroundColor: Color.colorDarkslateblue_100,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_xs,
  },
  contentSwitcher: {
    top: 182,
    right: 18,
    left: 14,
    borderRadius: Border.br_base,
    padding: Padding.p_9xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.neutralLightLight,
    position: "absolute",
  },
  settingsIcon: {
    top: 70,
    left: 327,
    width: 24,
    height: 24,
    position: "absolute",
    overflow: "hidden",
  },
  uploadEventPicturesChild: {
    top: 242,
    left: 18,
    borderRadius: Border.br_sm,
    backgroundColor: Color.colorGhostwhite_100,
    width: 335,
    height: 68,
    position: "absolute",
  },
  paryatanWing: {
    top: 280,
    fontSize: FontSize.size_4xs,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorLightsteelblue,
    width: 156,
    height: 17,
    textAlign: "left",
    left: 32,
    position: "absolute",
  },
  july24: {
    top: 258,
    left: 222,
    color: Color.colorSlateblue,
    textAlign: "right",
    fontSize: FontSize.bodyBodyS_size,
    fontFamily: FontFamily.bodyBodyS,
  },
  event1: {
    top: 255,
    color: Color.colorBlack,
    fontSize: FontSize.size_mini,
    textAlign: "right",
    left: 32,
  },
  icon: {
    height: "100%",
    overflow: "hidden",
  },
  zondiconsnotification: {
    left: 286,
    top: 74,
  },
  time: {
    marginTop: -9,
    letterSpacing: 0,
    fontWeight: "600",
    width: 54,
    fontFamily: FontFamily.sFProText,
    color: Color.neutralDarkDarkest,
    top: "50%",
    left: 0,
    fontSize: FontSize.size_mini,
    textAlign: "center",
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
    fontFamily: FontFamily.sFProText,
    color: Color.neutralDarkDarkest,
    textAlign: "left",
  },
  signalIcon: {
    width: 17,
    height: 11,
  },
  wiFi: {
    top: -1,
    left: 21,
    fontSize: FontSize.headingH4_size,
    fontFamily: FontFamily.sFProText,
    color: Color.neutralDarkDarkest,
    textAlign: "left",
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
    right: 0,
    height: 44,
    left: 0,
    position: "absolute",
  },
  rightButtonIcon: {
    marginTop: -10,
    right: 24,
    top: "50%",
    display: "none",
    overflow: "hidden",
  },
  pageTitle: {
    marginTop: -8.5,
    marginLeft: -113,
    left: "50%",
    fontSize: FontSize.size_6xl,
    fontWeight: "800",
    fontFamily: FontFamily.headingH4,
    top: "50%",
    textAlign: "right",
  },
  navBar: {
    top: 94,
    right: 76,
    left: -28,
    height: 88,
    position: "absolute",
    overflow: "hidden",
  },
  uploadEventPictures: {
    height: 812,
    overflow: "hidden",
    flex: 1,
    width: "100%",
    backgroundColor: Color.neutralLightLightest,
  },
});

export default UpdateEventPicture;
