import { StyleSheet, Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent:'center', 
        alignItems:'center'
    },

    padding: {
        padding: 20
    },

    image:{
        height: height / 2.4, 
        width: width - 20
    },

    textHead:{
        fontFamily: 'AvenirNextLTPro-Demi', 
        color: 'black', 
        fontSize: width * 0.07, 
        marginBottom: 15, 
        paddingTop: 25
    },

    textBody:{
        fontFamily: 'AvenirNextLTPro-Regular', 
        fontSize: width * 0.05, 
        color: '#525252',
    }
})