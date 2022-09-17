import OrderTabsCard from '../../../components/OrderCard/OrderTabsCard'
import useSnackbar from '../../../hooks/useSnackbar'
import { useIsFocused } from '@react-navigation/native'
import api from '../../../services/axiosInstance'
import * as Animatable from 'react-native-animatable'
import Layout from '../../../components/Layout'

// create a component
const UnSentOrders = ({ navigation }) => {


    return (
        <Layout>
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
})

//make this component available to the app
export default UnSentOrders