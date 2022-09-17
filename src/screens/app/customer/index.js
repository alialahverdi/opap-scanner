import Layout from '../../../components/Layout'
import { UIManager, LayoutAnimation, Switch } from 'react-native'
import api from '../../../services/axiosInstance'
import { storeArray, storeObj, deleteAllDataFromSchema } from '../../../model/query'
import CustomerCard from '../../../components/CustomerCard'
import SearchbarHeader from '../../../components/SearchbarHeader'
import { toEnglishDigits } from '../../../utils/numbersUtils'
import { generatorID } from '../../../utils/IDUtils'
import AlertModal from '../../../components/Modal/AlertModal'
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useSnackbar from '../../../hooks/useSnackbar'



// create a component
const Customer = ({ navigation }) => {



    // ------- States ------- //


    // ------- Logic or Functions ------- //



    return (
        <Layout>

        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginHorizontal: 10
    },
    centerScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    dalyVisit: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 5
    },
    dalyVisitTitle: {
        ...font.gray,
        fontSize: 12
    }
})

//make this component available to the app
export default Customer
