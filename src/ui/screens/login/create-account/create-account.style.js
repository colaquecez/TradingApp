import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../helpers/'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',

    },
    backButton: {
        marginLeft: fonts.font6,
        marginTop: fonts.font6
    },
    font: {
        fontFamily: 'AvenirNextLTPro-Regular',
    },
    inputText: {
        height: fonts.inputHeight,
        borderColor: colors.greyDark,
        borderWidth: 1,
        marginBottom: fonts.superSmall,
        borderRadius: 3,
        backgroundColor: colors.white,
        fontSize: fonts.regular,
        paddingHorizontal: fonts.regular,
        color:colors.greyText,
        paddingTop:fonts.smallest
    },

    buttonRegistrar: {
        alignItems: 'center',
        marginBottom: fonts.font14,
        marginTop: fonts.font20,
        backgroundColor: '#7966fe',
        height: fonts.buttonHeight,
        borderRadius: fonts.mediumLarge,
        alignItems: 'center',
        justifyContent: 'center',

    },

    registerText: {
        marginTop: fonts.smallest,
        fontSize: fonts.font20,
        color: 'white',
        fontFamily: 'AvenirNextLTPro-Demi',
    },

    buttonFacebook: {
        backgroundColor: '#3b5998',
        height: fonts.buttonHeight,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: fonts.bigger,

    },

    textFacebook: {
        fontSize: fonts.regular,
        color: '#3b5998',
        fontFamily: 'AvenirNextLTPro-Demi',

    },

    createAccountView: {
        alignItems: 'center',
        marginBottom: fonts.font60,
    },

    createAccountText: {
        fontSize: fonts.bigger,
        color: 'black',
        fontFamily: 'AvenirNextLTPro-Demi',
    },


});

export default styles;