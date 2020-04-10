import React, { Component } from 'react'
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList, Image, TouchableHighlight } from 'react-native'
import { BackButton } from '../../../components'
import Icons from 'react-native-vector-icons/MaterialIcons/'
import firebase from 'firebase'
import { BarIndicator } from 'react-native-indicators'
import { noImage } from '../../../images/'
import { colors, fonts } from '../../../helpers/'
import { connect } from 'react-redux'
import { requestMyAdvertisement } from '../../../../state/user/user.action'
import { styles } from './my-advertisement.style'
import { productRequest } from '../../../../state/categories/categories.action'
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';


class MyAdvertisementScreen extends Component {

    static navigationOptions = {
        header: null,
    }

    state = {
        loaded: true,
        dialogVisible: false,
        control: '',
        loadedSettings: true,
        deleteLoaded: false
    }

    requestMyAdvertisement = () => {
        let cloud = firebase.firestore()
        let user = firebase.auth().currentUser
        let products = []

        cloud.collection("Produto").where("uidDono", "==", user.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    products.push(doc.data())

                })
            })
            .then(() => {
                this.props.dispatch(requestMyAdvertisement(products))
            })
            .then(() => {
                this.setState({ loaded: false })
            })
            .catch((error) => {
                alert('Houve um erro, tente novamente')
            })
    }

    showProductUser = (product) => {
        this.props.dispatch(productRequest(product))
        this.props.navigation.navigate('ProductScreen')
    }

    settingClicked = async (product) => {
        await this.props.dispatch(productRequest(product))
        await this.setState({ loadedSettings: true })
        await this.checkStatus()

    }

    componentDidMount() {

        this.requestMyAdvertisement()
    }

    pauseAndContinue = () => {
        let cloud = firebase.firestore()

        let setDoc = cloud.collection("Produto").doc(this.props.product.id)
        if (this.state.control == 'Pausar') {
            let setWithOptions = setDoc.set({ pausado: true }, { merge: true });
            this.setState({ dialogVisible: false })

        } else {
            let setWithOptions = setDoc.set({ pausado: false }, { merge: true });
            this.setState({ dialogVisible: false })
        }


    }

    delete = () => {
        let cloud = firebase.firestore()

        let deleteDoc = cloud.collection("Produto").doc(this.props.product.id)
        var removeCapital = deleteDoc.delete()
            .then(() => {
                this.requestMyAdvertisement()
            })
            .then(() => {
                this.renderConfirmDeleteDialog()
                this.setState({ deleteLoaded: true })
            })
            .then(() => {
                setTimeout(() => {
                    this.setState({ deleteLoaded: false })
                }, 1000)

            })

        this.setState({ dialogVisible: false })

    }

    checkStatus = () => {
        let cloud = firebase.firestore()
        cloud.collection("Produto").doc(this.props.product.id)
            .get()
            .then((item) => {
                if (item.data().pausado) {
                    this.setState({ control: 'Retomar' })
                }
                else {
                    this.setState({ control: 'Pausar' })
                }
            })
            .then(() => {
                this.setState({ loadedSettings: false })
                this.setState({ dialogVisible: true })

            })
            .catch(() => {
                alert("Houve um erro")
            })
    }

    renderConfirmDeleteDialog = () => (

        <Dialog
            visible={this.state.deleteLoaded}
            title="Anúncio apagado!"
            onTouchOutside={() => this.setState({ deleteLoaded: false })} >
        </Dialog>

    )


    renderDialog = () => {

        if (this.state.dialogVisible) {
            if (this.state.loadedSettings == true) {
                return (
                    <BarIndicator animating={true} style={{ flex: 1 }} count={5} color={colors.primary} />
                )
            }
            return (
                <ConfirmDialog
                    title="Configurar Anúncio"
                    visible={true}
                    onTouchOutside={() => this.setState({ dialogVisible: false })}
                    positiveButton={{
                        title: this.state.control,
                        onPress: () => { this.pauseAndContinue() }
                    }}
                    negativeButton={{
                        title: "Excluir",
                        onPress: () => { this.delete() }
                    }}>

                    {/* <TouchableHighlight onPress={() => { this.setState({ dialogVisible: false }) }} style={{ position: 'absolute', bottom: fonts.closeBottom, left: fonts.closeLeft, width: fonts.bigger, height: fonts.bigger, backgroundColor: '#E8E8E8', borderRadius: fonts.small, borderColor: colors.primary, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Icons name={'close'} size={fonts.mediumSmall} color={colors.primary}></Icons>
                    </TouchableHighlight> */}

                    <View>
                        <Text style={{ fontFamily: 'AvenirNextLTPro-Regular', fontSize: fonts.font16 }}>Você pode pausar/continuar ou excluir seus anúncios ativos.</Text>
                    </View>
                </ConfirmDialog>)
        }

        else {
            return null
        }
    }

    nothingHere = () => (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: fonts.regular, color: 'grey' }}>Você ainda não possui anúncios :(</Text>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('AddProductScreen') }}>
                <Text style={{ fontSize: fonts.regular, marginTop: 20, color: colors.primary, fontWeight: 'bold' }}>Quero criar um anúncio!</Text>
            </TouchableOpacity>
        </View>
    )

    destaque = (item) => {
        this.props.dispatch(productRequest(item))
        this.props.navigation.navigate('PremiumScreen')
    }

    render() {

        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ height: fonts.font55, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginRight: 20 }}>


                    <View>
                        <BackButton navigation={()=>{this.props.navigation.navigate('PerfilScreen')}} />
                    </View>

                    <View>
                        <Text style={{ fontSize: fonts.regular, fontFamily: 'AvenirNextLTPro-Demi', }}>Meus Anúncios</Text>
                    </View>

                    <View>{this.state.dialogVisible}</View>

                    {this.renderDialog()}
                    {this.renderConfirmDeleteDialog()}
                </View>
                <View style={{ backgroundColor: colors.greyBackground, flex: 1 }}>

                    {this.state.loaded == true ?
                        <BarIndicator animating={this.state.loaded} style={{ flex: 1 }} count={5} color={colors.primary} />
                        :

                        <FlatList
                            data={this.props.user}
                            style={{ marginTop: 14 }}
                            ListEmptyComponent={this.nothingHere}
                            keyExtractor={item => item.id}
                            numColumns={1}
                            renderItem={({ item }) => {

                                return (

                                    <TouchableHighlight underlayColor={null} onPress={() => {
                                        this.showProductUser(item)
                                    }}>
                                        <View>
                                            <View style={{ flex: 3, flexDirection: 'row', marginLeft: 12, marginRight: 12, backgroundColor: 'white', alignItems: 'stretch', height: fonts.boxFlet }}>
                                            {item.premium ? 
                                                <View style={{ width: 30,backgroundColor: item.premium.color, alignItems:'center', justifyContent:'center'}}>
                                                <Text style={{transform: [{ rotate: '-90deg'}], fontFamily: 'AvenirNextLTPro-Demi', paddingTop:fonts.font3,color:'white',position:'absolute',width:103, textAlign:'center',fontSize:fonts.font14}}>Destaque</Text>
                                                </View>
                                               : null }
                                                <View style={{ justifyContent: 'center', flex: 2, alignItems: 'flex-start' }}>

                                                    <Image style={{ width: fonts.boxFlet, height: fonts.boxFlet }} source={item.uri == '' || item.uri == null ? noImage : { uri: item.uri }} />
                                                </View>

                                                <View style={{ marginLeft: 40, justifyContent: 'center', flex: 5, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                                    <View style={{ marginRight: 70 }}>
                                                        <Text style={{ fontSize: fonts.titles, fontFamily: 'AvenirNextLTPro-Demi', marginBottom: 4 }}>{item.nome} </Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ marginRight: 10 }}>{item.data}</Text>
                                                        <Text>{item.hora}</Text>
                                                    </View>
                                                </View>

                                                <TouchableOpacity onPress={() => { this.settingClicked(item) }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                                                    <Icons name={'settings'} size={fonts.big} color={colors.primary}></Icons>

                                                </TouchableOpacity>

                                            </View>
                                            <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 2, flex: 1, borderTopColor: colors.primary, borderTopWidth: StyleSheet.hairlineWidth, backgroundColor: 'white', marginBottom: 25, padding: 15, marginLeft: 12, marginRight: 12 }}>
                                                <Text style={{ fontSize: fonts.superSmall, fontFamily: 'AvenirNextLTPro-Demi', marginTop:fonts.smallest }}>Troque de forma mais rápida.</Text>
                                                <TouchableOpacity onPress={() => { this.destaque(item) }} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary, padding: 10, borderRadius: 3 }}><Text style={{ color: 'white', fontSize: fonts.superSmall, fontFamily: 'AvenirNextLTPro-Demi', marginTop:fonts.smallest }}>Destaque agora</Text></TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                );
                            }}
                        />

                    }
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
        user: state.user.MyAdvertisement,
        product: state.categories.product
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (MyAdvertisementScreen)