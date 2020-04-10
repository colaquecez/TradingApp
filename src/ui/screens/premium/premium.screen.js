import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TouchableHighlight, SafeAreaView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { colors, fonts } from '../../helpers'
import { BackButton } from '../../components'
import { styles } from './premium.style'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/FontAwesome5'
import firebase from 'firebase'
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import { StackActions, NavigationActions } from 'react-navigation'
import { BarIndicator } from 'react-native-indicators'
import { premiumSelected } from '../../../state/categories/categories.action'



class PremiumScreen extends Component {

    state = {
        premium: [],
        key: 'Bronze',
        selected: { name: 'Bronze', power: '2x', value: '2,99', icon: 'award', color: '#CB6D2F' },
        dialog: true,
        isloading: true
    }

    getAnuncios = () => {
        const premium = []
        firebase.firestore().collection('Premium')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    premium.push(doc.data())
                })
            })
            .then(() => {
                this.setState({ premium: premium })
            })
            .then(() => {
                this.setState({ isloading: false })
            })
    }

    componentDidMount() {
        this.getAnuncios()
    }

    nextScreen = () => {

        this.props.navigation.navigate('MyAdvertisementScreen')
    }

    premiumSelected = () => {
        const { nome, uidDono, uri, id } = this.props.destaque
        const { name, color, icon, value } = this.state.selected

        const objectPremium = {
            itemName: nome,
            uidDono: uidDono,
            uri: uri,
            idProduct: id,
            premium: {
                premiumName: name,
                premiumColor: color,
                premiumIcon: icon,
                premiumValue: value
            }
        }

        let cloud = firebase.firestore()
        let setDoc = cloud.collection("Produto").doc(objectPremium.idProduct)
        const premium = setDoc.set({
            premium: {
                name: objectPremium.premium.premiumName,
                color: objectPremium.premium.premiumColor,
                icon: objectPremium.premium.premiumIcon,
                value: objectPremium.premium.premiumValue
            }
        }, { merge: true })
        .then(()=>{
            this.props.navigation.navigate('PerfilScreen')
        })
        // this.setState({ dialogVisible: false })
        // this.props.dispatch(premiumSelected(objectPremium))
    }

    render() {

        const { name, power, value, icon, color } = this.state.selected
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.greyBackground }}>

                <View style={{ flex: 1, backgroundColor: colors.greyBackground, padding: 8 }}>

                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                        <Text style={{ fontSize: fonts.font20, fontFamily: 'AvenirNextLTPro-Demi', marginBottom: 10 }}>Troque mais rápido!</Text>
                        <Text>
                            <Text style={{ fontSize: fonts.small, fontFamily: 'AvenirNextLTPro-Regular' }}> Quer trocar mais rápido? Coloque seu item </Text>
                            <Text style={{ fontSize: fonts.small, fontFamily: 'AvenirNextLTPro-Demi' }}>"{this.props.destaque.nome}"</Text>
                            <Text style={{ fontSize: fonts.small, fontFamily: 'AvenirNextLTPro-Regular' }}> em destaque!</Text>
                        </Text>

                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', paddingVertical: 20, justifyContent: 'center' }}>
                            {this.state.isloading ?
                                <BarIndicator color={colors.primary} count={4} size={fonts.bigger} />
                                :
                                this.state.premium.map(item => (
                                    <TouchableOpacity onPress={() => { this.setState({ key: item.name }, () => { this.setState({ selected: item }) }) }} style={{ flex: 1, height: fonts.font80, marginLeft: 5, marginRight: 5, backgroundColor: this.state.key == item.name ? item.color : 'white', borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name={item.icon} size={15} color={this.state.key == item.name ? 'white' : colors.primary}></Icon>
                                        <Text style={{ marginTop: 13, fontFamily: 'AvenirNextLTPro-Demi', fontSize: fonts.superSmall }}>{item.name}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>

                    <View style={{ padding: 20, alignItems: 'center', justifyContent: 'flex-start', marginRight: 5, marginLeft: 5, backgroundColor: 'white', borderRadius: 6 }}>

                        <Text style={{ fontFamily: 'AvenirNextLTPro-Demi', fontSize: fonts.regular }}>{`Destaque ${name}`}</Text>
                        <View style={{ marginTop: 20 }}>
                            <Icon name={icon} size={fonts.bigger} color={color}></Icon>
                        </View>
                        <Text style={{ fontSize: fonts.smaller, color: '#707070', marginTop: 35, fontFamily: 'AvenirNextLTPro-Demi' }}>{`Até ${power} mais`}</Text>
                        <Text style={{ fontSize: fonts.superSmall, color: 'grey' }}>visualizações</Text>
                        <TouchableOpacity onPress={this.premiumSelected} style={{ marginTop: 40, backgroundColor: colors.primary, height: fonts.font40, justifyContent: 'center', width: fonts.font250, alignItems: 'center', borderRadius: fonts.font75 }}><Text style={{ fontSize: fonts.small, color: 'white', marginTop: fonts.smallest, fontFamily: 'AvenirNextLTPro-Demi' }}>{`Destacar por R$${value}`}</Text></TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={this.nextScreen} style={{ alignItems: 'center', marginTop: 30 }}>
                        <Text style={{ fontFamily: 'AvenirNextLTPro-Demi', color: colors.primary, fontSize: fonts.small }}>Continuar sem destaque</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

const mapStateToProps = state => {
    return {
        destaque: state.categories.product
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (PremiumScreen)