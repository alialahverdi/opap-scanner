import Layout from '../../components/Layout'
import Header from '../../components/Header'
import IconButton from '../../components/Button/IconButton'
import Input from '../../components/Input'
import FullButton from '../../components/Button/FullButton'
import Ripple from 'react-native-material-ripple'


// Create a component
const QRCodeResultScreen = ({ navigation, route }) => {

    // ------- Constants ------- //
    const { productDetail, event, scanner } = route.params

    // console.log('productDetail =======>', productDetail)
    // ------- States ------- //
    const [count, setCount] = useState("")
    const [snackbarMessage, setSnackbarMessage] = useState(null)

    // ------- Logic or Functions ------- //

    const increase = () => {
        setCount(prev => {
            const numCount = Number(prev) + 1
            return numCount.toString()
        })
    }

    const decrease = () => {
        setCount(prev => {
            const numCount = Number(prev) - 1
            if (numCount <= 0) return ""
            return numCount.toString()
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
                            value={count}
                            onChangeText={setCount}
                        />
                    </View>
                    <View style={styles.basicContainer}>
                        <IconButton basic iconName="add" onPress={increase} />
                    </View>
                </View>
                <View style={styles.warehouseContainer}>
                    <Ripple style={styles.warehouse}>
                        <Text style={styles.warehouseText}>انبار قرنطینه</Text>
                        <Ionicons
                            // name={item.selected ? "checkbox-outline" : "square-outline"}
                            name="square-outline"
                            size={25}
                            color="#0351ff"
                        />
                    </Ripple>
                    <Ripple style={styles.warehouse}>
                        <Text style={styles.warehouseText}>انبار توزیع</Text>
                        <Ionicons
                            // name={item.selected ? "checkbox-outline" : "square-outline"}
                            name="checkbox-outline"
                            size={25}
                            color="#0351ff"
                        />
                    </Ripple>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={{ flex: .5 }}>
                    <FullButton
                        title="بازگشت"
                        onPress={onCancel}
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
    footer: {
        margin: 20,
        flexDirection: "row"
    }
})

//Make this component available to the app
export default QRCodeResultScreen