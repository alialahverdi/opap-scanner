// import React, { Component } from "react";

// import { View, Dimensions, Text } from "react-native";
// import QRCodeScanner from "react-native-qrcode-scanner";
// import Icon from "react-native-vector-icons/Ionicons";
// import * as Animatable from "react-native-animatable"
// import { RNCamera } from "react-native-camera"

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const SCREEN_WIDTH = Dimensions.get("window").width;

// console.disableYellowBox = true;

// class QrCodeCamera extends Component {
//     onSuccess(e) {
//         alert(e);
//     }

//     makeSlideOutTranslation(translationType, fromValue) {
//         return {
//             from: {
//                 [translationType]: SCREEN_WIDTH * -0.18
//             },
//             to: {
//                 [translationType]: fromValue
//             }
//         };
//     }

//     render() {
//         return (
//             <QRCodeScanner
//                 showMarker
//                 onRead={this.onSuccess.bind(this)}
//                 cameraStyle={{ height: SCREEN_HEIGHT }}
//                 // zoom={.8}
//                 // flashMode={RNCamera.Constants.FlashMode.torch}
//                 customMarker={
//                     <View style={styles.rectangleContainer}>
//                         <View style={styles.topOverlay}>
//                             <Text style={{ fontSize: 30, color: "white" }}>
//                                 QR CODE SCANNER
//                             </Text>
//                         </View>

//                         <View style={{ flexDirection: "row" }}>
//                             <View style={styles.leftAndRightOverlay} />

//                             <View style={styles.rectangle}>
//                                 <Icon
//                                     name="ios-qr-scanner"
//                                     size={SCREEN_WIDTH * 0.73}
//                                     color={iconScanColor}
//                                 />
//                                 <Animatable.View
//                                     style={styles.scanBar}
//                                     direction="alternate-reverse"
//                                     iterationCount="infinite"
//                                     duration={1700}
//                                     easing="linear"
//                                     animation={this.makeSlideOutTranslation(
//                                         "translateY",
//                                         SCREEN_WIDTH * -0.54
//                                     )}
//                                 />
//                             </View>

//                             <View style={styles.leftAndRightOverlay} />
//                         </View>

//                         <View style={styles.bottomOverlay} />
//                     </View>
//                 }
//             />
//         );
//     }
// }

// const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

// const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
// const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
// const rectBorderColor = "red";

// const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
// const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
// const scanBarColor = "#22ff00";

// const iconScanColor = "blue";

// const styles = {
//     rectangleContainer: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "transparent"
//     },

//     rectangle: {
//         height: rectDimensions,
//         width: rectDimensions,
//         borderWidth: rectBorderWidth,
//         borderColor: rectBorderColor,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "transparent"
//     },

//     topOverlay: {
//         flex: 1,
//         height: SCREEN_WIDTH,
//         width: SCREEN_WIDTH,
//         backgroundColor: overlayColor,
//         justifyContent: "center",
//         alignItems: "center"
//     },

//     bottomOverlay: {
//         flex: 1,
//         height: SCREEN_WIDTH,
//         width: SCREEN_WIDTH,
//         backgroundColor: overlayColor,
//         paddingBottom: SCREEN_WIDTH * 0.25
//     },

//     leftAndRightOverlay: {
//         height: SCREEN_WIDTH * 0.65,
//         width: SCREEN_WIDTH,
//         backgroundColor: overlayColor
//     },

//     scanBar: {
//         width: scanBarWidth,
//         height: scanBarHeight,
//         backgroundColor: scanBarColor
//     }
// };

// export default QrCodeCamera;



import Layout from '../../components/Layout'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';



// Create a component
const ScannerScreen = ({ navigation }) => {

    // ------- Constants ------- //
    const qrcode = useRef(null)
    const isFocused = useIsFocused();

    // ------- Logic or Functions ------- //
    useEffect(() => {
        if (isFocused) {
            qrcode.current.reactivate()
        }
    }, [isFocused])

    const onSuccess = (event) => {
        navigation.navigate("QRCodeResultScreen", {
            event
        })
    };


    return (
        <Layout containerStyle={styles.container}>
            <QRCodeScanner
                ref={qrcode}
                onRead={onSuccess}
                checkAndroid6Permissions={true}
                showMarker
                useNativeZoom={true}
                zoom={.2}
                markerStyle={{ borderRadius: 10, height: 120, width: 120, borderColor: '#6f74dd' }}
                bottomContent={
                    <View style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>Please move your camera over the QR Code</Text>
                    </View>
                }
            />
        </Layout>
    )
}

// Define your styles
const styles = StyleSheet.create({
    container: {
    },
    buttonTouchable: {
        padding: 16
    },
    buttonText: {
        fontSize: 21,
        // color: 'rgb(0,122,255)'
    },
})

//Make this component available to the app
export default ScannerScreen
