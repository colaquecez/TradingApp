import { StyleSheet } from 'react-native'
import { fonts, colors } from '../../../../helpers'

const Style = StyleSheet.create({

    inputText: {
        borderColor: '#e5e6ea',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        marginBottom: 14,
        fontSize: fonts.smaller,
        paddingHorizontal: 23,
        fontFamily: 'AvenirNextLTPro-Demi',

    },

    progressBar: {
        backgroundColor: colors.primary,
        height: fonts.font3,
        shadowColor: '#000',
        marginBottom: 10,
    },

    inputCep: {
        borderColor: '#e5e6ea',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        fontSize: fonts.smaller,
        paddingHorizontal: 23,
        fontFamily: 'AvenirNextLTPro-Demi',

    },

    container: {
        flex: 1,
        backgroundColor: 'white'
        
    },

    containerNav: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 12,
        marginBottom:fonts.smallsuper,
        marginTop:fonts.smallsuper
    },

    textCriarAnuncio: {
        fontSize: fonts.regular,
        fontFamily: 'AvenirNextLTPro-demi',
    },

    marginBottom: {
        marginBottom: 10
    },

    containerTextInput: {
        backgroundColor: 'white',
        padding: 10

    },

    cepContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30,

    },

    cepText: {
        fontSize: fonts.small,
        color: 'grey',
        fontFamily: 'AvenirNextLTPro-Demi',
        marginTop:4

    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        marginBottom:30,
    },

    buttonAnunciar: {
        height: fonts.buttonHeight,
        backgroundColor: '#cc0000',
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textAnunciar: {
        fontSize: fonts.regular,
        color: 'white',
        fontFamily: 'AvenirNextLTPro-Demi'
    },

    textDoar: {
        fontSize: fonts.regular,
        color: 'white',
        fontFamily: 'AvenirNextLTPro-Demi',
    },


    multiText: {
        height: fonts.simpleText,
    },

    simpleText: {
        height: fonts.inputHeight,
    },

})

export default Style