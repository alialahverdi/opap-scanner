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
//                 zoom={.8}
//                 flashMode={RNCamera.Constants.FlashMode.torch}
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
//     },makeSlideOutTranslation

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
import { Dimensions } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import * as Animatable from "react-native-animatable"
import api from '../../services/axiosInstance'

console.disableYellowBox = true;

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width


const rectDimensions = SCREEN_WIDTH * 0.6; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.003; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";
const scanBarHeight = SCREEN_WIDTH * 0.0055; //this is equivalent to 1 from a 393 device width


// Create a component
const ScannerScreen = ({ navigation, route }) => {

    // ------- Constants ------- //
    const qrcode = useRef(null)
    const isFocused = useIsFocused()
    const { product } = route.params

    // ------- States ------- //
    const [spinner, setSpinner] = useState(false)

    // ------- Logic or Functions ------- //
    useEffect(() => {
        if (isFocused) {
            qrcode.current.reactivate()
        }
    }, [isFocused])

    const onSuccess = async (event) => {
        setSpinner(true)
        // qrcode.current.reactivate()
        // navigation.navigate("QRCodeResultScreen", {
        //     event
        // })
        await api.get(`/uid/get?uid=${event.data}`).then(res => {
            const result = JSON.parse(res.content)
            navigation.navigate("QRCodeResultScreen", {
                productDetail: result.data,
                event
            })
        })
            .catch(() => { })
            .finally(() => {
                setSpinner(false)
            })
    }

    const makeSlideOutTranslation = (translationType, fromValue) => {
        return {
            from: {
                [translationType]: SCREEN_WIDTH * 0.3
            },
            to: {
                [translationType]: fromValue
            }
        };
    }


    return (
        <Layout containerStyle={styles.container}>
            <QRCodeScanner
                ref={qrcode}
                showMarker
                checkAndroid6Permissions
                onRead={onSuccess}
                cameraStyle={{ height: SCREEN_HEIGHT }}
                customMarker={
                    <View style={styles.rectangleContainer}>
                        <View style={styles.topOverlay}>
                            <Text style={styles.productName}>{product.ProductID}  {product.ProductName}</Text>
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.leftAndRightOverlay} />

                            <View style={styles.rectangle}>
                                <Animatable.View
                                    style={styles.scanBar}
                                    direction="alternate-reverse"
                                    iterationCount="infinite"
                                    duration={3000}
                                    easing="linear"
                                    animation={makeSlideOutTranslation(
                                        "translateY",
                                        SCREEN_WIDTH * -0.3
                                    )}
                                />
                            </View>

                            <View style={styles.leftAndRightOverlay} />
                        </View>

                        <View style={styles.bottomOverlay}>
                            {spinner && <ActivityIndicator size="large" color="#fff" />}
                        </View>
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
    rectangleContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        borderRadius: 10
    },
    topOverlay: {
        flex: 1,
        // height: 100,
        // flexDirection: 'row',
        width: SCREEN_WIDTH,
        backgroundColor: "rgba(0,0,0,0.5)",
        // backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomOverlay: {
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)",
        // backgroundColor: "red",
        // paddingBottom: SCREEN_WIDTH * 0.25
    },
    leftAndRightOverlay: {
        // height: SCREEN_WIDTH * 0.65,
        width: SCREEN_WIDTH,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    scanBar: {
        width: SCREEN_WIDTH * 0.55,
        height: scanBarHeight,
        backgroundColor: "#fff",
        borderRadius: 10
    },
    rectangle: {
        height: rectDimensions,
        width: rectDimensions,
        borderWidth: rectBorderWidth,
        borderColor: rectBorderColor,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        // borderRadius: 10
    },
    productName: {
        ...font.black,
        fontSize: 18,
        color: "#fff",
        textAlign: "right",
        marginHorizontal: 10
    },
})

//Make this component available to the app
export default ScannerScreen