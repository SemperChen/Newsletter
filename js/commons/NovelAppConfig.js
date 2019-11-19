/**
 * @author Semper
 */
import {ThemeColors} from "./ThemeFactory";
import {lineHeights, READER_SEX, readerColors, THEME_COLORS} from "../constants/constants";

global.NovelAppConfig = {
    themeColorName: THEME_COLORS.DARK,
    appThemeColor: ThemeColors.pinkColors,
    isFirstOpen: true,
    isFirstShow:true,
    readerSex: READER_SEX.FEMALE,
    notificationTime: null,
    isTraditional: false,
    lastShowAdTime:0,
    isFastest:true,
    user:{username:null,password:null},
    readConfig: {
        bgColor: '#fff',
        fontSize: 20,
        fontColor: '#000',
        isNightMode: false,
        darkFontColor: '#343434',
        darkBgColor: '#000',
        index:0,
        lineHeight:lineHeights[0],
        lHIndex:0

    },
    readerColor:readerColors[0],
    isKeepAwake:true,
    isOpenVoice:false,
    baiduVoiceTok:'',
    textHeightData:[],
    deviceName:'',
    codeVersion:1,
    /*voiceConfig: {
        //是否打开语音阅读
        isOpenVoice:false,
        //语速，取值0-15，默认为5中语速
        spd:5,
        //音调，取值0-15，默认为5中语调
        pit:5,
        //音量，取值0-15，默认为5中音量
        vol:5,
        //发音人选择, 0为普通女声，1为普通男生，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女声
        per:3,
        // 3为mp3格式(默认)； 4为pcm-16k；5为pcm-8k；6为wav（内容同pcm-16k）;
        // 注意aue=4或者6是语音识别要求的格式，但是音频内容不是语音识别要求的自然人发音，所以识别效果会受影响。
        aue:3
    }*/
};

global.globalData={
    globalBookNameParam:null,
    globalCurrentChapterNum:null,
    globalPageNum:null,
    cacheChapterCount:0,
    catalog:null,
    currentSiteName:null
}
