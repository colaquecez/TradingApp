import { fonts, colors } from '../../helpers'
import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({

    safeAreaView: {
        flex: 1
    },

    containerColor: {
        flex: 1,
        backgroundColor: colors.greyBackground
    },

    containerPerfil:{
        flex: 2, 
        backgroundColor: colors.white, 
        marginBottom: 25, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 10
    },

    imageContainer:{
        flexDirection: 'row', 
        flex: 1 
    },

    flexEnd:{
        justifyContent: 'flex-end', 
        flex: 1
    },

    imageStyle:{
        width: fonts.boxFlet, 
        height: fonts.boxFlet, 
        borderRadius: fonts.boxFlet / 2, 
        borderWidth: fonts.smallest, 
        borderColor: 'grey'
    },

    textDisplayName:{
        fontSize: fonts.smaller, 
        marginTop: 10, 
        fontWeight: 'bold' 
    },

    textEmail:{
        color: 'grey', 
        marginTop: 5 
    },

    textAccount:{
        marginLeft: 20, 
        color: '#BABABC', 
        marginBottom: 8, 
        fontWeight: 'bold'
    },

    containerAccount:{
        height: 'auto', 
        backgroundColor: 'white', 
        borderColor: '#EDECF0', 
        borderWidth: 1, 
        marginBottom: 23, 
        marginLeft: 20, 
        marginRight: 20
    },

    containerNotifications:{
        borderBottomWidth: 1, 
        borderColor: '#EDECF0', 
        padding: 10,
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    iconNotifications:{
        width: fonts.bigger, 
        height: fonts.bigger, 
        backgroundColor: '#FC3A2E', 
        borderRadius: fonts.smallsuper, 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    iconLogoff:{
        width: fonts.bigger, 
        height: fonts.bigger, 
        backgroundColor: 'red', 
        borderRadius: fonts.smallsuper, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    textLogoff:{
        color: 'red', 
        fontSize: fonts.small, 
        marginLeft: 10
    },


    textNotifications:{
        fontSize: fonts.small, 
        marginLeft: 10
    },

    switchContainer:{
        flex: 1, 
        alignItems: 'flex-end' 
    },

    contarAmigo:{
        height: 'auto', 
        backgroundColor: 'white', 
        marginLeft: 20, 
        marginRight: 20, 
        marginBottom: 23
    },

    containerLogoff:{
        height: 'auto', 
        backgroundColor: 'white', 
        marginLeft: 20, 
        marginRight: 20, 
        marginBottom: 80   
    },

    containerBorder:{
        width: fonts.bigger, 
        height: fonts.bigger, 
        borderRadius: fonts.smallsuper, 
        justifyContent: 'center', 
        alignItems: 'center'  
    }









})