import { Dimensions } from 'react-native'
const screenDimension = Dimensions.get('window').width
const ScreenDimensionHeigth = Dimensions.get('window').height

export const fonts = {
    smallest: screenDimension * 0.01067, //font 4
    font6: screenDimension * 0.016, //font 6
    font60:screenDimension * 0.16,//font 60
    font5: screenDimension * 0.01334, //font 5
    font7: screenDimension * 0.0189, //font7
    smallsuper: screenDimension * 0.0214, //font 8
    superSmall: screenDimension * 0.035, //font 13
    small: screenDimension * 0.04,  //font 15
    font110: screenDimension * 0.2934, //font110
    font150: screenDimension * 0.4,//150
    font16: screenDimension * 0.0427, //16
    font75: screenDimension * 0.2, //font75
    font10: screenDimension* 0.0267,//font10
    font40: screenDimension * 0.1067,//font 40
    font14: screenDimension * 0.03734, // font 14
    smaller: screenDimension * 0.046, //font 17
    titles: screenDimension * 0.046,  //font 17
    regular: screenDimension * 0.05, // font 18
    font19: screenDimension * 0.0507, //font19
    font20: screenDimension * 0.054, //font 20
    medium: screenDimension * 0.0587, // 22
    font23: screenDimension * 0.0614,//23
    font300: screenDimension * 0.8, //300
    mediumSmall: screenDimension * 0.064, //24
    mediumLarge: screenDimension * 0.0667, //25
    big: screenDimension * 0.07, // 26
    font3: screenDimension * 0.008 , //3
    bigger: screenDimension * 0.08, //30
    font33: screenDimension * 0.088, //33
    font36: screenDimension * 0.096, //36
    font64: screenDimension * 0.1707, //64
    buttonHeight: screenDimension * 0.13, //52
    font55: screenDimension * 0.1467, //55
    inputHeight: screenDimension * 0.126, //47
    backButtonSize: screenDimension * 0.12267, //46
    boxCategories: screenDimension / 2, 
    imageBox: screenDimension * 0.5333, // 200
    icons: screenDimension * 0.0934, // 35
    font180: screenDimension * 0.48, // 180
    font44: screenDimension * 0.1174, //font44
    boxFlet: screenDimension * 0.267, // 100
    closeBottom: screenDimension * 0.328, //     
    closeLeft: screenDimension * 0.800, //
    simpleText: screenDimension * 0.24, //90
    imageProduct: screenDimension * 0.75, //281
    FullWidth: screenDimension,
    chatTop: ScreenDimensionHeigth / 1.18, 
    chatLeft: screenDimension / 19.90,
    menuBar:screenDimension * 0.16,
    font40: screenDimension * 0.107, //font40
    font80:screenDimension * 0.214, //font80
    font250:screenDimension * 0.667,//font250
    font75: screenDimension * 0.2,

}
