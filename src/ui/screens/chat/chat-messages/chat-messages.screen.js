import React, { Component } from 'react'
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView, Image } from 'react-native'
import { BackButton } from '../../../components/'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { fonts, colors } from '../../../helpers'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Dialog } from 'react-native-simple-dialogs'
import { Keyboard } from 'react-native'




class ChatMessagesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            person: {
                uid: this.props.users.uid,
                nome: this.props.users.nome
            },
            textMessage: '',
            messageList: [],
            me: firebase.auth().currentUser.uid,
            showProducts: false,
            dataProducts: []
        }
    }

    componentWillMount() {
        this.checkMessages()
    }

    checkMessages = () => {
        firebase.database().ref('messages').child(this.state.me).child(this.state.person.uid)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('messages').child(this.state.me).child(this.state.person.uid).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: this.state.me
            }
            updates['messages/' + this.state.me + '/' + this.state.person.uid + '/' + msgId] = message;
            updates['messages/' + this.state.person.uid + '/' + this.state.me + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' });
        } else {
            Alert.alert('Error', 'No text')
        }
    }

    handleChange = key => val => {
        this.setState({ [key]: val });
    }

    renderAdvertisementTo = () => {
            let cloud = firebase.firestore()
            let user = firebase.auth().currentUser
            let products = []
    
            cloud.collection("Produto").where("uidDono", "==", this.state.person.uid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
    
                        products.push(doc.data())
    
                    })
                })
                .then(() => {
                    this.setState({dataProducts: products})
                })
                .then(() => {
                    // this.setState({ loaded: false })
                })
                .catch((error) => {
                    alert('Houve um erro, tente novamente')
                })
        
    }

    convertTime = (time) => {
        let dataMensagem = new Date(time);
        let result = (dataMensagem.getHours() < 10 ? '0' : '') + dataMensagem.getHours() + ':';
        result += (dataMensagem.getMinutes() < 10 ? '0' : '') + dataMensagem.getMinutes();

        return result;
    }

    renderRow = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                width: fonts.imageBox,
                borderRadius: fonts.font5,
                marginBottom: fonts.font20,
                alignSelf: item.from === this.state.me ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === this.state.me ? colors.primary : 'grey',
            }}>

                <Text style={{ padding: fonts.smallsuper, }}>
                    <Text style={styles.message}> {item.message} </Text>
                    <Text style={styles.time}> {this.convertTime(item.time)} </Text>
                </Text>
            </View>
        )
    }

    likeItem = (item) => {
        const text = `Eu gostei do seu item: ${item.nome}`
        this.setState({textMessage: text})
        this.setState({showProducts: false})
    }

    renderDialog = () => {
        Keyboard.dismiss()
        this.renderAdvertisementTo()
       this.setState({showProducts: true})
    }
    
    emptyList = () =>(
        <View>
            <Text style={{fontSize:fonts.superSmall}}>Esse usúario não tem nenhum item ativo.</Text>
        </View>
    )

    render() {
        let { height, width } = Dimensions.get('window');
        return (

            <SafeAreaView style={{ marginTop: fonts.font20 }}>

                <Dialog
                    visible={this.state.showProducts}
                    title={this.state.person.nome ? `Itens de ${this.state.person.nome}` : `Itens`}
                    onTouchOutside={() => this.setState({ showProducts: false })} >
                    <View>
                    <FlatList 
                        data={this.state.dataProducts}
                        ListEmptyComponent={this.emptyList}
                        horizontal={true}
                        renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{marginRight:fonts.font10}} onPress={()=>{this.likeItem(item)}}>
                                        <Image source={{uri: item.uri}}
                                        style={{width:fonts.boxFlet, height:fonts.boxFlet}} />
                                    </TouchableOpacity>
                                )
                        }}
                    />
                    </View>
                </Dialog>

                <View style={styles.containerNavigation}>

                    <View style={{ alignSelf: 'flex-start' }}>
                        <BackButton navigation={this.props.navigation.goBack} />
                    </View>

                    <View style={{ alignSelf: 'center' }}>
                        <Text style={styles.textCriarAnuncio}>{this.state.person.nome}</Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.renderDialog }>
                            <Icons name={'perm-media'} color={colors.primary} size={fonts.bigger} />
                        </TouchableOpacity>
                    </View>
                </View>
                <KeyboardAvoidingView keyboardVerticalOffset={30} enabled={true} behavior='height' >
                    <ScrollView >
                        <FlatList
                            style={{ padding: fonts.font10, height: height * 0.8 }}
                            data={this.state.messageList}
                            renderItem={this.renderRow}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ScrollView>

                    <View style={styles.boxInputMessage}>
                        <TextInput
                            keyboardType='twitter'
                            keyboardAppearance="default"
                            placeholder="Digite sua mensagem..."
                            placeholderTextColor={colors.greyDark}
                            value={this.state.textMessage}
                            onChangeText={this.handleChange('textMessage')}
                            style={styles.inputMessage}
                        />
                        <TouchableOpacity onPress={this.sendMessage} style={styles.buttonSend}>
                            <Icons name={'send'} color={colors.primary} size={fonts.bigger} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    message: {
        color: '#fff',
        fontSize: fonts.font16
    },
    textCriarAnuncio: {
        fontSize: fonts.regular,
        fontFamily: 'AvenirNextLTPro-Demi',
        marginTop: fonts.font3
    },
    time: {
        color: '#eee',
        padding: fonts.font3,
        fontSize: fonts.superSmall
    },
    containerNavigation: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: fonts.font20
    },
    boxInputMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:fonts.font10,
        marginRight:fonts.font10
    },
    inputMessage: {
        padding: fonts.font7,
        marginLeft: fonts.font5,
        color: colors.greyText,        
        borderWidth: 1,
        marginTop: fonts.font10,
        borderColor: "#CCC",
        width: "86%",
        borderRadius: fonts.font5,
    },
    buttonSend: {
        marginLeft: fonts.font10,
        marginTop: fonts.font6
    },
    iconButtonSend: {
        width: fonts.icons,
        height: fonts.icons,
        marginLeft: fonts.font5
    }

})

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.chatUserId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (ChatMessagesScreen)