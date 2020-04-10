import { StyleSheet, Dimensions } from 'react-native'
import { colors, fonts } from '../../../helpers'
const largura = Dimensions.get('window').width;

export default styles = StyleSheet.create({

    container:{
        flex: 1, 
        backgroundColor: colors.white
    },

    containerNavigation:{
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexDirection: 'row', 
        marginRight: 20
    },

    textNavigation:{
        fontSize: fonts.regular, 
        fontFamily: 'AvenirNextLTPro-Demi', 
    },

    containerList:{
        flex: 1, 
        backgroundColor: colors.greyBackground
    },

    containerProductNotFound:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    textNotFound:{
        fontSize: 20, 
        color: colors.greyDark
    },

    containerFlatInside:{
        flex: 1, 
        flexDirection: 'row', 
        marginLeft: 12, 
        marginTop: 12, 
        marginRight: 12, 
        backgroundColor: colors.white, 
        alignItems: 'stretch', 
        height: fonts.boxFlet
    },

    containerImage:{
        justifyContent: 'center', 
        flex: 2, 
        alignItems: 'flex-start'
    },
    
    image:{
        width: fonts.boxFlet, 
        height: fonts.boxFlet 
    },

    containerFlatInformation:{
        justifyContent: 'center', 
        flex: 3, 
        alignItems: 'flex-start', 
        flexWrap: 'wrap' 
    },

    marginRight:{
        marginRight: 70
    },

    textName:{
        fontSize: fonts.titles, 
        fontFamily: 'AvenirNextLTPro-Demi', 
        marginBottom: 4 
    },

    containerCity:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    containerFavorite:{
        alignItems: 'flex-end', 
        flex: 1, 
        backgroundColor: 'transparent', 
        position: 'absolute', 
        left: largura - 45, top: 13 
    },

    textCity:{
        fontSize:fonts.small
    }



})