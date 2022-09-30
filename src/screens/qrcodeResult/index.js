import Layout from '../../components/Layout'
import Header from '../../components/Header'
import IconButton from '../../components/Button/IconButton'
import Input from '../../components/Input'
import FullButton from '../../components/Button/FullButton'
import Ripple from 'react-native-material-ripple'
import { value } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes'


// Create a component
const QRCodeResultScreen = ({ navigation, route }) => {

    // ------- Constants ------- //
    const { productDetail, event, scanner } = route.params

    // console.log('productDetail =======>', productDetail)
    // ------- States ------- //
    const [data, setData] = useState({
        count: "",
        warehouse: "distribution"
    })

    // ------- Logic or Functions ------- //

    const increase = () => {
        setData(prev => {
            const numCount = Number(prev.count) + 1
            return {
                ...prev,
                count: numCount.toString()
            }
        })
    }

    const decrease = () => {
        setData(prev => {
            const numCount = Number(prev.count) - 1
            if (numCount <= 0) {
                return {
                    ...prev,
                    count: ""
                }
            }
            return {
                ...prev,
                count: numCount.toString()
            }
        })
    }

    const onSubmit = () => {

    }

    const onCancel = () => {

    }


    return (
        <Layout containerStyle={styles.container}>
            <Header
                title="جزییات کالا"
                goBack={{}}
            />
            <View style={styles.body}>
                <View style={styles.addToBasketContainer}>
                    <View style={styles.outlineContainer}>
                        <IconButton outline iconName="remove" onPress={decrease} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="تعداد"
                            keyboardType="numeric"
                            value={data.count}
                            onChangeText={value => setData(prev => {
                                return {
                                    ...prev,
                                    count: value
                                }
                            })}
                        />
                    </View>
                    <View style={styles.basicContainer}>
                        <IconButton basic iconName="add" onPress={increase} />
                    </View>
                </View>
                <View style={styles.warehouseContainer}>
                    <Ripple
                        style={styles.warehouse}
                        onPress={() => setData(prev => {
                            return {
                                ...prev,
                                warehouse: "quarantine"
                            }
                        })}
                    >
                        <Text style={styles.warehouseText}>انبار قرنطینه</Text>
                        <Ionicons
                            name={data.warehouse === "quarantine" ? "radio-button-on-outline" : "radio-button-off-outline"}
                            size={25}
                            color="#0351ff"
                        />
                    </Ripple>
                    <Ripple
                        style={styles.warehouse}
                        onPress={() => setData(prev => {
                            return {
                                ...prev,
                                warehouse: "distribution"
                            }
                        })}
                    >
                        <Text style={styles.warehouseText}>انبار توزیع</Text>
                        <Ionicons
                            name={data.warehouse === "distribution" ? "radio-button-on-outline" : "radio-button-off-outline"}
                            size={25}
                            color="#0351ff"
                        />
                    </Ripple>
                </View>

                <View style={styles.content}>
                    <View style={styles.rowContent}>
                        <Text style={styles.value}>{productDetail?.PersianProductName || ""}</Text>
                        <Text style={styles.key}>کالا</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.rowContent}>
                        <Text style={styles.value}>{productDetail?.LicenseOwner || ""}</Text>
                        <Text style={styles.key}>تامین کننده</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.rowContent}>
                        <Text style={styles.value}>{productDetail?.Expiration || ""}</Text>
                        <Text style={styles.key}>تاریخ انقضا</Text>
                    </View>
                    {/* <View style={styles.line} />
                    <View style={styles.rowContent}>
                        <Text style={styles.value}>{productDetail.PackageCount}</Text>
                        <Text style={styles.key}>تعداد در بسته</Text>
                    </View> */}
                </View>
            </View>
            <View style={styles.footer}>
                <View style={{ flex: .5 }}>
                    <FullButton
                        title="بازگشت"
                        onPress={() => navigation.navigate("ProductsScreen")}
                    />
                </View>
                <View style={{ flex: .5, marginLeft: 20 }}>
                    <FullButton
                        title="ارسال"
                        onPress={onSubmit}
                    />
                </View>
            </View>
        </Layout>
    )
}

// Define your styles
const styles = StyleSheet.create({
    container: {
    },
    body: {
        flex: 1,
        // backgroundColor: 'red'
    },
    addToBasketContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginTop: 20
    },
    outlineContainer: {
        flex: 2,
        alignItems: "center"
    },
    inputContainer: {
        flex: 6,
        height: 40
    },
    input: {
        // fontSize: 20
    },
    basicContainer: {
        flex: 2,
        alignItems: "center"
    },
    warehouseContainer: {
        flexDirection: "row",
        marginRight: 35,
        marginVertical: 30
    },
    warehouse: {
        flex: .5,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingVertical: 10
    },
    warehouseText: {
        ...font.gray,
        marginRight: 5
    },
    content: {
        paddingHorizontal: 35,
        paddingVertical: 10,
    },
    rowContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5
    },
    key: {
        ...font.gray,
        fontSize: 16
    },
    value: {
        ...font.black,
        color: "#2367ff",
        fontSize: 16
    },
    line: {
        height: .5,
        width: '100%',
        backgroundColor: 'gray',
        // backgroundColor: 'red',
        marginVertical: 5
    },
    footer: {
        margin: 20,
        flexDirection: "row"
    }
})

//Make this component available to the app
export default QRCodeResultScreen