import { UIManager, LayoutAnimation } from 'react-native'
import api from '../../services/axiosInstance'
import Layout from '../../components/Layout'
import SearchbarHeader from '../../components/SearchbarHeader'
import ProductCard from '../../components/ProductCard'
import { toEnglishDigits } from '../../utils/numbersUtils'

// create a component
const ProductsScreen = ({ route, navigation }) => {

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    // ------- Constants ------- //
    const { supplier } = route.params

    // ------- States ------- //
    const [allProducts, setAllProducts] = useState([])
    const [renderedProducts, setRenderedProducts] = useState([])
    const [prevIndex, setPrevIndex] = useState([])
    const [searchedProductText, setSearchedProductText] = useState("")
    const [refreshing, setRefreshing] = useState(false)
    const [productSpinner, setProductSpinner] = useState(true)

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        await api.get(`/product/get?supplierid=${supplier.SupplierID}`).then(res => {
            console.log('res ====>', res)
            const newProducts = res.content.map(item => {
                return {
                    ...item,
                    layoutHeight: 0
                }
            })
            setAllProducts(newProducts)
            setRenderedProducts(newProducts)
            setProductSpinner(false)
        }).catch(() => { })
    }

    const onSearchSuppliers = (text) => {
        const clonedProducts = [...allProducts]
        const searchedProducts = clonedProducts.filter(item => {
            return contains(item, text)
        })
        setRenderedProducts(searchedProducts)
        setSearchedProductText(text)
    }

    const contains = (item, query) => {
        const { ProductName, ProductID } = item

        const textData1 = query.replace("ي", "ی")
        const textData2 = query.replace("ی", "ي")
        const textData3 = query.replace("ك", "ک")
        const textData4 = query.replace("ک", "ك")
        const formattedQuery = toEnglishDigits(query.toString())
        if (
            ProductName.indexOf(textData1) > -1 ||
            ProductName.indexOf(textData2) > -1 ||
            ProductName.indexOf(textData3) > -1 ||
            ProductName.indexOf(textData4) > -1 ||
            ProductID.toString().includes(formattedQuery)
        ) return true
        return false
    }

    const showProducts = ({ item, index }) => {
        return (
            <ProductCard
                product={item}
                onExpand={() => openLayoutProduct(index)}
                onScann={() => navigation.navigate("ScannerScreen", { product: item })}
                // onScann={() => navigation.navigate("QRCodeResultScreen", { product: item, event: {} })}
                onArchive={() => navigation.navigate("ArchiveScreen")}
            />
        )
    }

    const openLayoutProduct = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

        const productsCloned = searchedProductText === "" ? [...renderedProducts] : [...allProducts]
        if (prevIndex.includes(index)) {
            productsCloned[index].layoutHeight = 0;
            setRenderedProducts(productsCloned)
            setPrevIndex([])
        } else {
            let newProducts = productsCloned.map(item => {
                return {
                    ...item,
                    layoutHeight: 0,
                }
            })
            newProducts[index].layoutHeight == 0
                ? newProducts[index].layoutHeight = null
                : newProducts[index].layoutHeight = 0;
            setRenderedProducts(newProducts)
            setPrevIndex([index])
        }
    }

    const handleRefresh = async () => {
        setRefreshing(true)
    }

    return (
        <Layout>
            {productSpinner && (
                <View style={styles.centerScreen}>
                    <ActivityIndicator size="small" color="#6f74dd" />
                </View>
            )}
            {!productSpinner && (
                <>
                    <View style={{ flexDirection: 'row' }}>
                        <SearchbarHeader text={searchedProductText} onChangeText={onSearchSuppliers} />
                    </View>
                    <FlatList
                        style={{ paddingHorizontal: 10 }}
                        data={renderedProducts}
                        renderItem={showProducts}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                </>
            )}
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
    centerScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

//make this component available to the app
export default ProductsScreen