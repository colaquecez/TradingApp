import React, { Component } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, ImageBackground, Dimensions, ScrollView, ActionSheetIOS } from 'react-native'
import { BackButton, DividerComponent } from '../../../components'
import Icons from 'react-native-vector-icons/MaterialIcons/'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { noImage } from '../../../images/'
import { styles } from './product.style'
import { fonts, colors } from '../../../helpers'
import  {requestChangeIdChat } from '../../../../state/user/user.action'

class ProductScreen extends Component {

    onPressChat = ( ) =>{
        const value = {
            uid: this.props.product.uidDono
        }
        this.props.dispatch(requestChangeIdChat(value))
        this.props.navigation.navigate('ChatMessagesScreen')
    }

    render() {
        const { navigation } = this.props;
        const selected = this.props.product

        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.containerNav}>

                    <View>
                        <BackButton navigation={this.props.navigation.goBack} />
                    </View>


                    <View>
                        <Text style={styles.textDetail}>Detalhes</Text>
                    </View>

                    <View>

                        <TouchableOpacity onPress={() => {
                            ActionSheetIOS.showActionSheetWithOptions(
                                {
                                    options: ['Cancel', 'Denunciar', 'Compartilhar'],
                                    destructiveButtonIndex: 1,
                                    cancelButtonIndex: 0,
                                },
                                (buttonIndex) => {
                                    if (buttonIndex === 1) {
                                        /* destructive action */
                                    }
                                },
                            );
                        }}>
                            <Icons name={'settings'} size={fonts.bigger} color={colors.primary}></Icons>
                        </TouchableOpacity>
                    </View>
                </View>

                {firebase.auth().currentUser.uid == selected.uidDono ?

                    <View></View>

                    :
                    <TouchableOpacity style={styles.containerChat} onPress={this.onPressChat}>
                        <Text style={styles.textChat}>Chat</Text>
                    </TouchableOpacity>
                }

                <ScrollView>

                    <View style={styles.containerBody}>

                        <View style={styles.containerImage}>
                            <Image
                                source={{ uri: selected.uri }}
                                resizeMode='cover'
                                style={styles.image} />
                        </View>


                        <View style={styles.containerProductName}>
                            <Text style={styles.textName}>{selected.nome}</Text>
                            <Text style={styles.textDate}>Publicado em {selected.data} às {selected.hora}</Text>
                        </View>

                        <DividerComponent />

                        <View style={styles.padding}>


                            <View>
                                <Text style={styles.textDecricao}>Descrição</Text>
                                <Text style={styles.textGroup}>{selected.descricao}</Text>
                            </View>

                            <DividerComponent />


                            <Text style={styles.textDetalhes}>Detalhes</Text>
                            <View style={styles.containerDetalhe}>
                                <Text style={styles.textGroup}>Categoria</Text>
                                <Text style={styles.textGroup}>{selected.categoria}</Text>
                            </View>

                            <DividerComponent />


                            <Text style={styles.textDetalhes}>Localização</Text>
                            <View style={styles.containerDetalhe}>
                                <Text style={styles.textGroup}>Cidade</Text>
                                <Text style={styles.textGroup}>{selected.cidade}</Text>
                            </View>


                            <DividerComponent />


                        </View>

                    </View>

                </ScrollView>



            </SafeAreaView>

        )
    }
}

const mapStateToProps = state => {

    return {
        product: state.categories.product
    }

}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
(ProductScreen)