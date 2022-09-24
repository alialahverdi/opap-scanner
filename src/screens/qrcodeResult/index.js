import Layout from '../../components/Layout'



// Create a component
const QRCodeResultScreen = ({ navigation, route }) => {

    // ------- Constants ------- //
    const { event, scanner } = route.params

    // ------- Logic or Functions ------- //


    return (
        <Layout containerStyle={styles.container}>
            <Text style={{ marginBottom: 20, color: 'red' }}>{JSON.stringify(event)}</Text>
        </Layout>
    )
}

// Define your styles
const styles = StyleSheet.create({
    container: {
    }
})

//Make this component available to the app
export default QRCodeResultScreen
