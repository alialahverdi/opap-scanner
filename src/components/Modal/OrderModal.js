import { memo } from 'react'
import { formatNumber } from '../../utils/numbersUtils'
import IconButton from '../Button/IconButton'
import Input from '../Input'
import FullButton from '../Button/FullButton'
import { storeArray, updateArray, updateObj } from '../../model/query'
import { toEnglishDigits } from '../../utils/numbersUtils'
import Header from '../Header'
import Snackbar from "../../components/Snakbar"


const OrderModal = ({ type, title, visible, product, customer, onRequestClose, onclose }) => {



    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <SafeAreaView style={styles.container}>
                <View>
                    <Header
                        title={title}
                        goBack={() => {
                            onclose()
                            setCount("")
                        }}
                    />
                    <View style={styles.content}>
                        {type !== "show" && (
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
                        )}
                        <Text
                            style={[
                                styles.productName,
                                type !== "show" && { marginTop: 30 }
                            ]}
                        >
                            {product.ProductID} - {product.ProductName}
                        </Text>
                        <View style={styles.detailContainer}>
                            <Text style={styles.value}>{product.SupplierName}</Text>
                            <Text style={styles.key}>تامین کننده</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.detailContainer}>
                            <Text style={styles.value}>{product.ExprDate}</Text>
                            <Text style={styles.key}>تاریخ انقضا</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.detailContainer}>
                            <Text style={styles.value}>{product.StockQty}</Text>
                            <Text style={styles.key}>موجودی</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.detailContainer}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.toman}>تومان</Text>
                                <Text style={styles.value}>{formatNumber(product.SalesPrice)}</Text>
                            </View>
                            <Text style={styles.key}>قیمت فروش</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.detailContainer}>
                            <Text style={styles.value}>{product.PayDay}</Text>
                            <Text style={styles.key}>فرجه</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.detailContainer}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.toman}>تومان</Text>
                                <Text style={styles.value}>{formatNumber(product.CustomerPrice)}</Text>
                            </View>
                            <Text style={styles.key}>قیمت مصرف کننده</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.detailContainer}>
                            <Text style={styles.value}>{product.UnitQty}</Text>
                            <Text style={styles.key}>تعداد در بسته</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.detailContainer}>
                            <Text style={styles.value}>{product.SupplierName}</Text>
                            <Text style={styles.key}>گروه کالایی</Text>
                        </View>
                        <View style={styles.line} />
                        <View>
                            <Text style={styles.stairText}>{product.PromotionDesc}</Text>
                        </View>
                    </View>
                </View>

                {type !== "show" && (
                    <View style={styles.footer}>
                        <FullButton
                            title={type == "create" ? "ثبت" : "ویرایش"}
                            disabled={count != "" ? false : true}
                            onPress={onOrder}
                        />
                    </View>
                )}

                {snackbarMessage && <Snackbar content={snackbarMessage} />}
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    content: {
        // flex: 8.5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    footer: {
        justifyContent: "center",
        marginHorizontal: 15,
        marginBottom: 10
    },
    productName: {
        ...font.black,
        fontSize: 15,
        color: "#18277a",
        marginBottom: Platform.OS == "ios" ? 30 : 10,
        textAlign: 'right'
    },
    detailContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#f7f7f9',
        marginBottom: 5
    },
    key: {
        ...font.gray,
        fontSize: Platform.OS == "android" ? 12 : 14
    },
    value: {
        ...font.black,
        color: "#2367ff",
        fontSize: Platform.OS == "android" ? 12 : 14
    },
    toman: {
        ...font.gray,
        color: "#2367ff",
        fontSize: 8,
        marginRight: 5,
        marginTop: 5
    },
    stairText: {
        ...font.gray,
        fontSize: 12,
        marginVertical: 15,
        textAlign: 'right'
    },
    addToBasketContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15
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
    }
})

export default OrderModal