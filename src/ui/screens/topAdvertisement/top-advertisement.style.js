import { StyleSheet } from 'react-native'
import { colors, fonts } from '../../helpers'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    containerNavigation: {
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row',
        marginBottom:fonts.smallsuper,
        marginTop:fonts.smallsuper
    },

    containerBody:{
        flex:1, 
        backgroundColor:colors.greyBackground
    },

    textNavigation: {
        fontSize: fonts.regular,
        fontFamily: 'AvenirNextLTPro-Demi',
        marginTop: fonts.font3
    },


})