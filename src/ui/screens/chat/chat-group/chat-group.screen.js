import React, { Component } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { requestChangeIdChat } from '../../../../state/user/user.action'
import { styles } from './chat-group.style'
import { BarIndicator } from 'react-native-indicators'
import { MenuBar, BackButton } from '../../../components'
import { fonts, colors } from '../../../helpers'

class ChatGroupScreen extends Component {

    state = {
        users: [],
        listName: [],
        loading: true
    }


    componentWillMount() {


        this.getNameUserById()

        let dbRef = firebase.database().ref('messages/' + firebase.auth().currentUser.uid);
        dbRef.on('child_added', (val) => {
            let person = {
                id: val.key,
            }

            this.setState((prevState) => {
                return {
                    users: [...prevState.users, person]
                }
            })
        }
        )
    }

    pressName = (item) => {
        this.props.dispatch(requestChangeIdChat(item))
        this.props.navigation.navigate('ChatMessagesScreen')
    }

    getNameUserById = () => {
        let cloud = firebase.firestore()

        cloud.collection("usuarios")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    this.setState({ listName: [...this.state.listName, doc.data()] })

                })
            })
            .then(() => {
                this.setState({ loading: false })
            })

    }


    render() {
        const b1 = this.state.listName
        const b2 = this.state.users

        var res = b1.filter(item1 =>
            b2.some(item2 => (item2.id === item1.uid)))
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.containerNavigation}>

                    <View style={{ alignSelf: 'center' }}>
                        <Text style={styles.textNavigation}>Conversas</Text>
                    </View>

                    <View>

                    </View>
                </View>

                {this.state.loading ?
                    <BarIndicator
                        animating={true}
                        style={{ flex: 1 }}
                        count={5}
                        color={colors.primary} />
                    :
                    res == '' || res == [] ?
                        <View style={{ padding:20, flex: 1, justifyContent:'center', alignItems:'center' }}>
                            <Text style={{ fontSize:fonts.mediumLarge,textAlign:'center', fontFamily: 'AvenirNextLTPro-regular' }}>Você não tem conversas.</Text>
                            <Text style={{fontSize:fonts.font16, fontFamily:'AvenirNextLTPro-regular', textAlign:'center',marginTop:10}}>Assim que uma nova conversa se iniciar, aparecerá aqui.</Text>
                        </View>
                        :
                        <View style={{ justifyContent: 'flex-start', backgroundColor: colors.greyBackground, flex: 1, paddingTop: 10 }}>
                            {res.map(p => (
                                <View style={{ backgroundColor: 'white', height: fonts.buttonHeight, marginBottom: 10 }}>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', marginLeft: 20 }} onPress={() => { this.pressName(p) }}>
                                        <Text style={{ fontSize: fonts.smaller, fontFamily: 'AvenirNextLTPro-Regular' }}>{p.nome}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                }

                <MenuBar state={this.props.navigation.state.routeName} location={this.props.navigation.navigate} />

            </SafeAreaView>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (ChatGroupScreen)