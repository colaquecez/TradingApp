import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native'

import { fonts, colors } from '../../helpers'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    containerIntro: {
        alignItems: 'center',
        flex: 0.8,
        justifyContent: 'space-around'
    },

    textIntro: {
        textAlign:'left',
        fontSize: fonts.bigger,
        fontFamily: 'AvenirNextLTPro-Regular',
    },

    marginBottom: {
        marginBottom: fonts.font10
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
    font: {
        fontFamily: 'AvenirNextLTPro-Regular',
    }
    ,
    containerInput: {
        flex: 2,
        padding: fonts.font20,
    },

    textForgot: {
        alignItems: 'flex-end',
        marginBottom: fonts.font20,
    },

    containerAccount: {
        alignItems: 'center',
    },

    textPassword: {
        fontFamily: 'AvenirNextLTPro-Regular',
        fontSize: fonts.small,
        color: colors.primary
    },

    buttonLogin: {
        alignItems: 'center',
        marginBottom: fonts.small,
        marginTop: fonts.font20,
        backgroundColor: colors.primary,
        height: fonts.buttonHeight,
        // borderRadius: fonts.font10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonsText: {
        fontSize: fonts.regular,
        fontFamily: 'AvenirNextLTPro-Demi',
        marginTop: fonts.font5

    },

    white: {
        color: 'white'
    },

    blueFece: {
        color: colors.blue
    },

    footerText: {
        fontSize: fonts.small,
        fontFamily: 'AvenirNextLTPro-Regular',
    },

    buttonFacebook: {
        height: fonts.buttonHeight,
        // borderRadius: fontu4s.font10,
        marginBottom: fonts.small,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.blue
    },

    backButton: {
        marginLeft: fonts.font6,
        marginTop: fonts.font6
    }



})

export default styles;