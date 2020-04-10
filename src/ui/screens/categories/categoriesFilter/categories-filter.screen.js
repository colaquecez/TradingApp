import React, { Component } from 'react'
import { View, Text, FlatList, Image, Dimensions, TouchableHighlight, SafeAreaView, TouchableOpacity } from 'react-native'
import { MenuBar, BackButton } from '../../../components/'
import Icons from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase'
import { BarIndicator } from 'react-native-indicators'
import { connect } from 'react-redux';
import { db } from '../../../../../assets/config/'
import { categorieProducts } from '../../../../state/categories/categories.action'
import styles from './categories-filter.style'
import { fonts, colors } from '../../../helpers'
import { productRequest } from '../../../../state/categories/categories.action'
import { noImage } from '../../../images/'
import { requestChangeIdChat } from '../../../../state/user/user.action'

class CategoriesFilterScreen extends Component {

    state = {
        animating: true,
    };

    categorieRequest = () => {

        const { value } = this.props.categorie
        const categories = []
        let cloud = firebase.firestore()

        cloud.collection("Produto").where("categoria", "==", value)
            .where("pausado", "==", false)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    categories.push(doc.data())
                    console.warn(doc.data())

                })
            })
            .then(() => {
                this.props.dispatch(categorieProducts(categories))
                this.setState({ animating: false })
            })
            .catch((error) => {
                alert('Problema com a conexão, por favor tentar novamente.')
            })
    }

    componentDidMount() {
        { db }
        this.categorieRequest()
    }

    dispatchProduct = (product) => {

        this.props.dispatch(productRequest(product))
        this.props.navigation.navigate('ProductScreen')
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.containerNavigation}>

                    <View>
                        <BackButton navigation={this.props.navigation.goBack} />
                    </View>

                    <View >
                        <Text style={styles.textNavigation}>{this.props.categorie.label}</Text>
                    </View>

                    <View>
                        <Icons name={'search'} size={fonts.icons} color={colors.primary}></Icons>

                    </View>

                </View>

                {this.state.animating ?
                    <BarIndicator animating={this.state.animating} style={{ flex: 1 }} count={5} color={colors.primary} />

                    :

                    <View style={styles.containerList}>

                        {this.props.categorieProducts.length <= 0 ?

                            <View style={styles.containerProductNotFound}>

                                <Text style={styles.textNotFound}>Nenhum produto encontrado</Text>

                            </View>

                            :

                            <FlatList
                                data={this.props.categorieProducts}
                                keyExtractor={item => item.id}
                                numColumns={1}
                                renderItem={({ item }) => {

                                    return (

                                        <View >
                                            <TouchableHighlight underlayColor={null} onPress={() => { this.dispatchProduct(item) }}
                                            >

                                                <View style={styles.containerFlatInside}>

                                                {item.premium ? 
                                                <View style={{ width: 30,backgroundColor: item.premium.color, alignItems:'center', justifyContent:'center'}}>
                                                <Text style={{transform: [{ rotate: '-90deg'}], fontFamily: 'AvenirNextLTPro-Demi', paddingTop:fonts.font3,color:'white',position:'absolute',width:103, textAlign:'center',fontSize:fonts.font14}}>Destaque</Text>
                                                </View>
                                               : null }

                                                    <View style={styles.containerImage}>

                                                        <Image
                                                            style={styles.image}
                                                            source={item.uri == '' || item.uri == null ? noImage : { uri: item.uri }}
                                                            resizeMode='contain' />

                                                    </View>

                                                    <View style={styles.containerFlatInformation}>
                                                        <View style={styles.marginRight}>
                                                            <Text style={styles.textName}>{item.nome} </Text>
                                                        </View>
                                                        <View style={styles.containerCity}>
                                                            <Icons name={'location-on'} size={fonts.font20} color={'grey'}></Icons>
                                                            <Text style={styles.textCity}>{item.cidade}</Text>
                                                        </View>
                                                    </View>


                                                </View>
                                            </TouchableHighlight>
                                            <View style={styles.containerFavorite}>

                                                <TouchableOpacity onPress={() => { }}>
                                                    <Icons name={'favorite-border'} size={fonts.mediumSmall} color={'red'} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    );
                                }}
                            />
                        }

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
        categorie: state.categories.categorieSelected,
        categorieProducts: state.categories.categorieProducts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (CategoriesFilterScreen)