import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useCart } from '@/context/CartContext';

type HeaderProps = {
    showBackButton?: boolean;
}

export default function Header(props: HeaderProps) {
    const router = useRouter();
    const { showBackButton } = props;
    const handleBackOrMenuPressed = () => {
        if (showBackButton) {
            router.back();
        }
    }
    const { cart } = useCart();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleBackOrMenuPressed()}>
                {showBackButton ? <Ionicons name="arrow-back-outline" size={50} color={Colors.hemglassBackgroundBlue} /> : <Ionicons name="menu" size={50} color={Colors.hemglassBackgroundBlue} />}
            </TouchableOpacity >
            <View style={styles.logoContainer}>
                <Image source={require('../assets/images/hemglass_text.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <Ionicons name="person-outline" size={40} color={Colors.hemglassBackgroundBlue} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="cart-outline" size={40} color={Colors.hemglassBackgroundBlue} />
                    {cart.length > 0 && <View style={styles.cartCountContainer}>
                        <Text style={styles.cartCount}>{cart.length}</Text>
                    </View>}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 54,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#003a70',
        height: 120,
    },
    logoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    cartCountContainer: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: Colors.jordgubbText,
        position: 'absolute',
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cartCount: {
        fontFamily: 'Burbank',
        fontSize: 18,
        color: Colors.jordgubbBackground,
    }
})