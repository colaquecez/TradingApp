import { StyleSheet, Dimensions } from 'react-native'
import { fonts, colors } from '../../../helpers'

const largura = Dimensions.get('window').width;
const altura = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    containerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: fonts.medium
    },

    textDetail: {
        fontSize: fonts.regular,
        fontFamily: 'AvenirNextLTPro-Demi',
    },

    containerBody: {
        flex: 5,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    containerImage: {
        width: '110%',
        height: fonts.FullWidth,
    },

    image: {
        flex: 1,
    },

    containerBody: {
        width: '100%',
    },

    containerChat:{
        width: '90%', 
        height: fonts.inputHeight, 
        borderRadius: fonts.inputHeight /2, 
        backgroundColor: colors.primary, 
        position: 'absolute', 
        top: fonts.chatTop, 
        left: fonts.chatLeft, 
        zIndex: 1, 
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    textChat:{
        fontSize: fonts.smaller,
        color: colors.white 
    },

    containerProductName:{
        alignSelf: 'flex-start', 
        padding: fonts.smaller
    },

    textName:{
        fontSize: fonts.regular
    },

    textDate:{
        fontSize: fonts.superSmall, 
        marginTop: 4
    },

    padding:{
        padding: 13 
    },

    textDecricao:{
        fontSize: fonts.regular, 
        marginBottom: 9
    },

    textGroup:{
        fontSize: fonts.font16,
        color:colors.greyText
    },

    textDetalhes:{
        fontSize: fonts.regular, 
        marginTop: 20, 
        marginBottom: 9
    },

    containerDetalhe:{
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    },








})