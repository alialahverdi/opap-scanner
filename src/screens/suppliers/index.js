import { UIManager, LayoutAnimation } from 'react-native'
import api from '../../services/axiosInstance'
import Layout from '../../components/Layout'
import SearchbarHeader from '../../components/SearchbarHeader'
import SupplierCard from '../../components/SupplierCard'
import { toEnglishDigits } from '../../utils/numbersUtils'

// create a component
const SuppliersScreen = ({ navigation }) => {

    // ------- States ------- //
    const [allSuppliers, setAllSuppliers] = useState([])
    const [renderedSuppliers, setRenderedSuppliers] = useState([])
    const [supplierSpinner, setSupplierSpinner] = useState(true)
    const [searchedSupplierText, setSearchedSupplierText] = useState("")
    const [refreshing, setRefreshing] = useState(false)

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getSuppliers()
    }, [])

    const getSuppliers = async () => {
        await api.get('/supplier/get').then(res => {
            setAllSuppliers(res.content)
            setRenderedSuppliers(res.content)
            setSupplierSpinner(false)
        }).catch(() => { })
    }

    const onSearchSuppliers = (text) => {
        const clonedSuppliers = [...allSuppliers]
        const searchedSuppliers = clonedSuppliers.filter(item => {
            return contains(item, text)
        })
        setRenderedSuppliers(searchedSuppliers)
        setSearchedSupplierText(text)
    }

    const contains = (item, query) => {
        const { SupplierName, SupplierID } = item

        const textData1 = query.replace("ي", "ی")
        const textData2 = query.replace("ی", "ي")
        const textData3 = query.replace("ك", "ک")
        const textData4 = query.replace("ک", "ك")
        const formattedQuery = toEnglishDigits(query.toString())
        if (
            SupplierName.indexOf(textData1) > -1 ||
            SupplierName.indexOf(textData2) > -1 ||
            SupplierName.indexOf(textData3) > -1 ||
            SupplierName.indexOf(textData4) > -1 ||
            SupplierID.toString().includes(formattedQuery)
        ) return true
        return false
    }

    const showSuppliers = ({ item, index }) => {
        return (
            <SupplierCard
                supplier={item}
                onPress={() => navigation.navigate("ProductsScreen", { supplier: item })}
            />
        )
    }

    const handleRefresh = async () => {
        setRefreshing(true)
    }

    return (
        <Layout>
            {supplierSpinner && (
                <View style={styles.centerScreen}>
                    <ActivityIndicator size="small" color="#6f74dd" />
                </View>
            )}
            {!supplierSpinner && (
                <>
                    <View style={{ flexDirection: 'row' }}>
                        <SearchbarHeader text={searchedSupplierText} onChangeText={onSearchSuppliers} />
                    </View>
                    <FlatList
                        style={{ paddingHorizontal: 10 }}
                        data={renderedSuppliers}
                        renderItem={showSuppliers}
                        keyExtractor={(item, index) => index.toString()}
                    // refreshing={refreshing}
                    // onRefresh={handleRefresh}
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
export default SuppliersScreen
