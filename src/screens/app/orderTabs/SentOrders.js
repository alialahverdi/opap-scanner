import OrderTabsCard from '../../../components/OrderCard/OrderTabsCard'
import { useIsFocused } from '@react-navigation/native'
import OrderListModal from '../../../components/Modal/OrderListModal'
import useSnackbar from '../../../hooks/useSnackbar'
import api from '../../../services/axiosInstance'
import * as Animatable from 'react-native-animatable'
import Layout from '../../../components/Layout'

// create a component
const SentOrders = ({ navigation }) => {

    return (
        <Layout>
            <FlatList
                style={{ paddingHorizontal: 10 }}
                data={sentOrders}
                renderItem={showSentOrders}
                keyExtractor={(item, index) => index.toString()}
            />
            <OrderListModal
                type="show"
                title="جزییات سفارش"
                visible={isShowOrderListModal}
                onclose={() => setIsShowOrderListModal(false)}
                onRequestClose={() => setIsShowOrderListModal(false)}
                orders={orderDetail}
            />
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
export default SentOrders