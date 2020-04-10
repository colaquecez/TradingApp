import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Animated, Easing } from 'react-native'

import {
    CategoriesFilterScreen,
    IntroScreen,
    LoginScreen,
    CategoriesScreen,
    AddProductScreen,
    ProductScreen,
    PerfilScreen,
    ChatMessagesScreen,
    MyAdvertisementScreen,
    ChatGroupScreen,
    CreateAccountScreen,
    TopAdvertisementScreen,
    PremiumScreen

} from '../screens/'

const Routes = createAppContainer(
    createStackNavigator(

        {
            IntroScreen: IntroScreen,
            PremiumScreen: PremiumScreen,
            CreateAccountScreen: CreateAccountScreen,
            TopAdvertisementScreen: TopAdvertisementScreen,
            LoginScreen: LoginScreen,
            ChatGroupScreen: ChatGroupScreen,
            ChatMessagesScreen: ChatMessagesScreen,
            CategoriesScreen: CategoriesScreen,
            MyAdvertisementScreen: MyAdvertisementScreen,
            PerfilScreen: PerfilScreen,
            AddProductScreen: AddProductScreen,
            ProductScreen: ProductScreen,
            CategoriesFilterScreen: CategoriesFilterScreen,

        },

        {
            defaultNavigationOptions: {
                header: null,
            },
            transitionConfig: () => ({
                transitionSpec: {
                    duration: 0,
                    timing: Animated.timing,
                    easing: Easing.step0,
                },
            }),
        },

    )
)

export default Routes