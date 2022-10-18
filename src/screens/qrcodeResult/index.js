import Layout from '../../components/Layout'
import Header from '../../components/Header'
import IconButton from '../../components/Button/IconButton'
import Input from '../../components/Input'
import FullButton from '../../components/Button/FullButton'
import Ripple from 'react-native-material-ripple'
import api from '../../services/axiosInstance'
import useSnackbar from '../../hooks/useSnackbar'
import { StackActions } from '@react-navigation/native'
import { ScrollView } from 'react-native'


// Create a component
const QRCodeResultScreen = ({ navigation, route }) => {

    // ------- Constants ------- //
    const { productDetail } = route.params
    console.log('productDetail', productDetail)
    const { showSnakbar } = useSnackbar()

    // ------- States ------- //
    const [spinner, setSpinner] = useState(false)
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

    const onSubmit = async () => {
        if (data.count === "") {
            return showSnakbar({
                variant: "error",
                message: "تعداد محصول را وارد کنید"
            })
        }
        setSpinner(true)
        const params = {
            ProductID: productDetail.ProductID,
            Qty: Number(data.count),
            StockID: data.warehouse === "distribution" ? 0 : 1,
            BatchCode: productDetail.BatchCode || "",
            EnglishProductName: productDetail.EnglishProductName || "",
            Expiration: productDetail.Expiration || "",
            GTIN: productDetail.GTIN || "",
            GenericCode: productDetail.GenericCode || 0,
            GenericName: productDetail.GenericName || "",
            IRC: productDetail.IRC || "",
            LicenseOwner: productDetail.LicenseOwner || "",
            Manufacturing: productDetail.Manufacturing || "",
            PackageCount: productDetail.PackageCount || 0,
            PersianProductName: productDetail.PersianProductName || "",
            ProductCategory: productDetail.ProductCategory || "",
            StatusCode: productDetail.StatusCode || 0,
            StatusMessage: productDetail.StatusMessage || "",
            UID: productDetail.UID || ""
        }
        await api.post('/uid/insert', params)
            .then(res => {
                showSnakbar({
                    variant: "success",
                    message: "محصول با موفقیت ثبت شد."
                })
                if (res.code === 1) {
                    navigation.navigate("ProductsScreen")
                }
            })
            .catch(error => { })
            .finally(() => {
                setSpinner(false)
            })
    }


    return (
        <Layout containerStyle={styles.container}>
            <Header
                title="جزییات کالا"
                goBack={() => navigation.navigate("ProductsScreen")}
            />
            <ScrollView style={styles.body}>
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
                        <Text style={styles.value}>{productDetail?.PersianProductName || "-"}</Text>
                        <Text style={styles.key}>نام کالا</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.rowContent}>
                        <Text style={styles.value}>{productDetail?.LicenseOwner || "-"}</Text>
                        <Text style={styles.key}>تامین کننده</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.rowContent}>
                        <Text style={styles.value}>{productDetail?.IRC || "-"}</Text>
                        <Text style={styles.key}>IRC</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.rowContent}>
                        <Text style={styles.value}>{productDetail?.BatchCode || "-"}</Text>
                        <Text style={styles.key}>سری ساخت</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.rowContent}>
                        <Text style={styles.value}>{productDetail?.GTIN || "-"}</Text>
                        <Text style={styles.key}>GTIN</Text>
                    </View>
                    <View style={styles.line} />
                    {/* <View style={styles.rowContent}>
                        <Text style={styles.value}>{productDetail?.StatusCode || "-"}</Text>
                        <Text style={styles.key}>StatusCode</Text>
                    </View> */}
                    {/* <View style={styles.line} /> */}
                    <View style={styles.rowContent}>
                        <Text style={styles.value}>{productDetail?.Expiration || "-"}</Text>
                        <Text style={styles.key}>تاریخ انقضا</Text>
                    </View>
                    {/* <View style={styles.line} />
                    <View style={styles.rowContent}>
                        <Text style={styles.value}>{productDetail.PackageCount}</Text>
                        <Text style={styles.key}>تعداد در بسته</Text>
                    </View> */}
                </View>
            </ScrollView>
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
                        isLoading={spinner}
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