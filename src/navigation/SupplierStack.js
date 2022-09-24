import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// Screens
import SuppliersScreen from '../screens/suppliers'
import ProductsScreen from '../screens/products'
import ScannerScreen from '../screens/scanner'
import ArchiveScreen from '../screens/archive'
import QRCodeResultScreen from '../screens/qrcodeResult'

// Transition for navigate between screen
const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS,
    // gestureEnabled: true,
};


// Create stack fro screens
const Stack = createStackNavigator();

const SupplierStack = () => {
    return (
        <Stack.Navigator
            headerMode="none"
            screenOptions={TransitionScreenOptions}
        >
            <Stack.Screen name="SuppliersScreen" component={SuppliersScreen} />
            <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
            <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
            <Stack.Screen name="ArchiveScreen" component={ArchiveScreen} />
            <Stack.Screen name="QRCodeResultScreen" component={QRCodeResultScreen} />
        </Stack.Navigator>
    )
}

export default SupplierStack;