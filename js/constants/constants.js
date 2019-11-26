import RNFS from "react-native-fs";
import {Platform} from "react-native";

/**
 * @author Semper
 */
export const rgb246 = "rgb(246,246,250)"
export const color65 = "#656565"
export const color95 = "#959595"
export const colorC5 = "#C5C5C5"

export const COLLECTION = 'COLLECTION';
export const BOOKMARKS = 'bookmark';
export const RECEIVE_TYPE = {
    TEXT: 0,
    JSON: 1,
    GBKTEXT: 2
};
export const RANKING_TYPE = {
    WEEK: 0,
    MONTH: 1,
    TOTAL: 2
};
export const CATEGORY_TYPE = {
    LV1: 1,
    LV2: 2
};
export const THEME_COLORS = {
    PINK: '樱花粉',
    DARK: '星辰黑'
};
export const READ_BG_COLOR = {
    DEFAULT: '#c4b395',
    BLUE: '#cad9e8',
    GREEN: 'rgb(230, 240, 230)',
    LIGHT: '#e6e6e6',
};

export const READER_SEX = {
    MALE: '男生',
    FEMALE: '女生'
};

export const CHINESE_TYPE = {
    CN: '简体',
    TW: '繁体'
}

export const UNICODE_TYPE = {
    GBK:'GBK',
    UTF8:'UTF-8'
}

export const REQUEST_ARTICLE_FAILED = 'request article failed';
export const REQUEST_CATALOG_FAILED = 'request catalog failed';
export const REQUEST_CACHE_FAILED = 'request cache failed';

export const REQUEST_NET_FAILED = 'request net failed';

export const TAB_ICON_SIZE = 20;
export const CACHE_DIR_PATH = Platform.OS === 'ios'?RNFS.CachesDirectoryPath:RNFS.ExternalDirectoryPath + '/bookCache/';
export const RefreshControlColor = {
    tintColor: '#cc0000',
    titleColor: '#669900',
    colors: ['#cc0000', '#669900', '#0099cc'],
    progressBackgroundColor: '#ffffff'
};

export const readerColors = [
    {
        settingBgColor: 'rgb(237, 223, 183)',
        settingFontColor: 'rgb(73, 53, 52)',
        fontBgColor: 'rgb(231, 217, 177)',
        sliderColor: 'rgb(70, 50, 56)',
        sliderColor2: 'rgb(220, 206, 167)',
        sliderFtColor: 'rgb(170, 129, 132)',
        contentBgColor: 'rgb(228, 213, 177)',
    },
    {
        settingBgColor: 'rgb(237, 207, 205)',
        settingFontColor: 'rgb(83, 19, 34)',
        fontBgColor: 'rgb(230, 200, 198)',
        sliderColor: 'rgb(103, 41, 54)',
        sliderColor2: 'rgb(222, 190, 188)',
        sliderFtColor: 'rgb(170, 129, 132)',
        contentBgColor: 'rgb(223, 194, 193)',
    },
    {
        settingBgColor: 'rgb(243, 214, 165)',
        settingFontColor: 'rgb(83, 19, 34)',
        fontBgColor: 'rgb(235, 206, 157)',
        sliderColor: 'rgb(76, 60, 40)',
        sliderColor2: 'rgb(222, 193, 149)',
        sliderFtColor: 'rgb(143, 119, 83)',
        contentBgColor: 'rgb(234, 198, 149)',
    },
    {
        settingBgColor: 'rgb(36, 40, 44)',
        settingFontColor: 'rgb(87, 94, 99)',
        fontBgColor: 'rgb(40, 45, 49)',
        sliderColor: 'rgb(151, 159, 171)',
        sliderColor2: 'rgb(46, 51, 55)',
        sliderFtColor: 'rgb(87, 94, 99)',
        contentBgColor: 'rgb(46, 50, 55)',
    },
    {
        settingBgColor: 'rgb(193, 233, 195)',
        settingFontColor: 'rgb(83, 19, 34)',
        fontBgColor: 'rgb(184, 224, 187)',
        sliderColor: 'rgb(33, 72, 33)',
        sliderColor2: 'rgb(172, 212, 174)',
        sliderFtColor: 'rgb(106, 149, 106)',
        contentBgColor: 'rgb(176, 214, 173)',
    },

]

export const minFontSize = 16
export const maxFontSize = 30

export const lineHeights = [20,30,40]
