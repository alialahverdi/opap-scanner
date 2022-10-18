import Ripple from "react-native-material-ripple";
import { formatNumber } from "../utils/numbersUtils";
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductCard = ({ product, onExpand, onScann, onArchive }) => {

    return (
        <View style={styles.container}>
            <Ripple
                style={styles.header}
                onPress={onExpand}
            >
                <View style={styles.supplierInfo}>
                    <Text style={styles.supplierName}>{product.ProductName}</Text>
                    <Text>  </Text>
                    <Text style={styles.supplierName}>{product.ProductID}</Text>
                    <Text>  </Text>
                    <Material
                        name="account-check"
                        size={20}
                        color="green"
                    />
                </View>
            </Ripple>
            <View style={{ height: product.layoutHeight }}>
                <View style={styles.line} />
                <View style={styles.content}>
                    {/* <Ripple
                        style={styles.item}
                        onPress={onArchive}
                    >
                        <Ionicons name="stats-chart" size={22} color="#8000ff" />
                        <Text style={styles.textContent}>آرشیو</Text>
                    </Ripple> */}
                    <Ripple
                        style={styles.item}
                        onPress={onScann}
                    >
                        <Ionicons name="ios-cart" size={22} color="#00b300" />
                        <Text style={styles.textContent}>جدید (اسکن)</Text>
                    </Ripple>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 2,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginBottom: 5,
        padding: 1,
        padding: 1,
    },
    header: {
        // flexDirection: "row",
        paddingVertical: 15,
        flex: 1,
        height: '100%',
        // backgroundColor: 'red',
        alignItems: "flex-end",
    },
    supplierInfo: {
        width: '100%',
        justifyContent: "flex-end",
        paddingHorizontal: 10,
        flexDirection: 'row',
        padding: 1,
    },
    supplierName: {
        ...font.black,
        color: "#111",
        textAlign: "right",
    },
    customerID: {
        ...font.gray,
        textAlign: "right",
        color: "#2367ff",
        fontSize: 10,
        marginTop: 8
    },
    customerAddr: {
        ...font.gray,
        textAlign: "right",
        fontSize: 10
    },
    firstletter: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    customerPay: {
        flexDirection: 'row', paddingHorizontal: 10, color: '#3399ff'
        , padding: 2,
        marginVertical: 2
    },
    line: {
        height: 1,
        backgroundColor: '#f0f1f3',
        marginRight: 10,
        marginTop: 10
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        marginRight: 10
    },
    item: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textContent: {
        ...font.gray,
        fontSize: 12,
        marginTop: 6
    }

})

export default ProductCard