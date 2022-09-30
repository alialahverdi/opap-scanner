import Layout from '../../components/Layout'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { useRef } from 'react';
import { Dimensions } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import * as Animatable from "react-native-animatable"
import api from '../../services/axiosInstance'
import useSnackbar from '../../hooks/useSnackbar'

console.disableYellowBox = true;

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width


const rectDimensions = SCREEN_WIDTH * 0.5; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.003; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";
const scanBarHeight = SCREEN_WIDTH * 0.0055; //this is equivalent to 1 from a 393 device width


// Create a component
const ScannerScreen = ({ navigation, route }) => {

    // ------- Constants ------- //
    const qrcode = useRef(null)
    const isFocused = useIsFocused()
    const { product } = route.params
    const { showSnakbar } = useSnackbar()

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
        await api.get(`/uid/get?uid=${event.data}`).then(res => {
            const result = JSON.parse(res.content)
            if (result.data === null) {
                showSnakbar({
                    variant: "error",
                    message: result.statusMessage
                })
                return qrcode.current.reactivate()
            }
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
                [translationType]: SCREEN_WIDTH * 0.2
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
                                        SCREEN_WIDTH * -0.2
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
        width: SCREEN_WIDTH * 0.47,
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