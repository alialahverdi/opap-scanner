import { store } from '../../../model/query'
import snackbarContext from '../../../contexts/snackbarContext'
import Layout from '../../../components/Layout'
import { formatNumber } from '../../../utils/numbersUtils'
import api from '../../../services/axiosInstance'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Header from '../../../components/Header'
import { StackActions } from '@react-navigation/native'
const Info = ({ route, navigation }) => {



    return (
        <Layout containerStyle={styles.container}>
        </Layout>
    )

}

// define your styles
const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 20
    }, circle: {
        height: 30,
        width: 30,
        borderRadius: 1000,
        fontSize: 20,

    },
    workInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 4,
        marginTop: 10,
        marginHorizontal: 10,
        padding: 5,
        shadowColor: "gray",
        shadowOpacity: .5,
    },
    workInfoDetail: {
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    gauge: {
        position: 'absolute',
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // alignItems: ''
        // backgroundColor: 'yellow'
    },
    namValue: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'red'
    },

    nameValue: {
        ...font.blackBold,
        fontSize: 25
    },
    nameKey: {
        ...font.gray,
        fontSize: 11
    },
    dateStyle: {
        flexDirection: 'row',
        // backgroundColor: '#cce6ff',
        borderRadius: 5,
        elevation: 5,
        marginTop: 8,
        marginHorizontal: 5,
        padding: 10,
        shadowColor: "gray",
        shadowOpacity: .5,
    },
    openOrder: {
        // alignItems: 'flex-end',
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        marginTop: 8,
        marginHorizontal: 10,
        padding: 10,
        shadowColor: "gray",
        shadowOpacity: .5,
    },
    body: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'flex-end',
    },
    left: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor: 'yellow',
    },
    right: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor: 'green'
    },
    title: {
        ...font.blackBold,
        fontSize: 12
    },
    sellPerformance: {
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        marginTop: 5,
        marginHorizontal: 10,
        padding: 10,
        shadowColor: "gray",
        shadowOpacity: .5,
    },
    chartAndBack: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    valuePerformance: {
        ...font.blackBold,
        fontSize: 16
    },
    dateFont: {
        ...font.blackBold,
        color: '#0066ff',
        fontSize: 16
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#E0DEDE',
        marginVertical: 5
    },
    line2: {
        height: 1,
        backgroundColor: '#f0f1f3',
        marginRight: 15,
        marginTop: 10
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 8,
    },
    item: {

        justifyContent: "center",
        alignItems: "center"
    },
    textContent: {
        ...font.gray,
        fontSize: 12,
        marginTop: 6
    }
})

//make this component available to the app
export default Info
