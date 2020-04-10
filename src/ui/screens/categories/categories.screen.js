import React, { Component } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, FlatList, TouchableHighlight, Image } from 'react-native'
import { connect } from 'react-redux'
import { MenuBar } from '../../components'
import { categoriesRequest, categorieSelect } from '../../../state/categories/categories.action'
import firebase from 'firebase'
import Icons from 'react-native-vector-icons/MaterialIcons'
import styles from './categories.style'
import { StackActions, NavigationActions } from 'react-navigation'
import { BarIndicator } from 'react-native-indicators'
import { fonts, colors } from '../../helpers'

class CategoriesScreen extends Component {

    state = {
        loading: true
    }


    componentDidMount() {
        this.categoriesRequest()

    }

    categoriesRequest = () => {
        let array = []
        let cloud = firebase.firestore()

        cloud.collection("Categorias")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    array.push(doc.data())

                })
            })
            .then(()=>{
                this.props.dispatch(categoriesRequest(array))
            })
            .then(() => {
                this.setState({ loading: false })
            })
            .catch((error) => {
                alert('houve um erro...')
            })
    }

    gerarColor = () => {

        let hexadecimais = '0123456789ABCDEF';
        let cor = '#';

        // Pega um número aleatório no array acima
        for (let i = 0; i < 6; i++) {
            //E concatena à variável cor
            cor += hexadecimais[Math.floor(Math.random() * 16)];
        }
        return cor;
    }

    categorieSelected = item => () => {
        this.props.dispatch(categorieSelect(item))
        this.props.navigation.navigate('CategoriesFilterScreen')
    }


    render() {

        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.containerAddNewProduct}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('AddProductScreen') }}>

                        <View style={styles.containerIcon}>
                            <Icons
                                name={'add'}
                                size={fonts.icons}
                                color={colors.primary} />
                        </View>

                    </TouchableOpacity>


                    <View>
                        <Text style={styles.textTitle}>Categorias</Text>
                    </View>

                    <View style={styles.containerIcon}>
                        <Icons
                            name={'search'}
                            size={fonts.icons}
                            color={colors.primary} />
                    </View>

                </View>

                {this.state.loading == true ?

                    <BarIndicator
                        animating={this.state.loading}
                        style={{ flex: 1 }}
                        count={5}
                        color={colors.primary} />
                    :
                    <FlatList
                        data={this.props.categories}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>

                            <TouchableHighlight onPress={this.categorieSelected(item)} >
                                <View>
                                    <View style={item.id % 2 == 0 ? styles.left : styles.right}>

                                        <View style={[{ backgroundColor: this.gerarColor() }, styles.containerFlat]}>

                                            <Text style={styles.textBox}>{item.label}</Text>
                                        </View>

                                        <Image
                                            style={styles.image}
                                            source={{ uri: item.uri }}
                                            resizeMode={'cover'}></Image>

                                    </View>
                                </View>
                            </TouchableHighlight>

                        }
                    />
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
        categories: state.categories.categories,
        selec: state.categories.categorieSelected
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (CategoriesScreen)