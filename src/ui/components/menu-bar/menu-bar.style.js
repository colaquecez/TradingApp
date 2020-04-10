import { fonts, colors } from '../../helpers'
import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container:{
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        backgroundColor: colors.white, 
        height: fonts.menuBar, 
        alignItems: 'center',
        borderTopColor:colors.primary,
        borderTopWidth:1
        
    },

    menu:{
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    fontFamily:{
        fontFamily: 'AvenirNextLTPro-Regular',
        fontSize:fonts.small 
    },




})