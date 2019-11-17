/**
 * @author Semper
 */
import {WIDTH} from "./DimensionsUtil";
import {Platform} from 'react-native';
import {lineHeights, minFontSize} from "../constants/constants";

export const contentFormat = (arr, fontSize) => {
    let fontCount = parseInt(WIDTH / (fontSize + 1)) - 1;
    let lines;

    if (NovelAppConfig.readConfig.lineHeight === lineHeights[0]) {
        lines = NovelAppConfig.textHeightData[0].textHeight[fontSize - minFontSize].line
    } else if (NovelAppConfig.readConfig.lineHeight === lineHeights[1]) {
        lines = NovelAppConfig.textHeightData[1].textHeight[fontSize - minFontSize].line
    } else if (NovelAppConfig.readConfig.lineHeight === lineHeights[2]) {
        lines = NovelAppConfig.textHeightData[2].textHeight[fontSize - minFontSize].line
    }

    if(Platform.OS!=='ios'){
        lines=lines-2;
    }else {
        lines--
    }

    let array = [];
    let str = '';
    let count = 0;
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
        let content = '\u3000\u3000' + arr[i];
        let length = content.length;
        let start = 0, end = 0;
        while (start < length) {
            if (count > lines) {
                array[index] = str;
                str = '';
                count = 0;
                index++
            }
            let c = optimizeText(content.substring(start, content.length - 1), fontCount);
            end = start + c;
            str = str + content.substring(start, end) + '\n';
            start = end;
            count++;
        }
        if (i + 1 === arr.length) {
            array[index] = str;
        }
    }
    // console.log('array',array);
    return array
};

const o = '`1234567890-=~!@#$%^&*()_+qwertyuiopasdfghjklzxcvbnmERTYUIPASFHJKLZXCVBN[]{}|;,./<>?"“”‘’';

export function optimizeText(text, fontCount) {
    let count = fontCount;
    let index = 0;
    let sum = 0;
    for (; index < count; index++) {
        let c = text.charAt(index);
        if (o.indexOf(c) !== -1) {
            sum++
        }
        if (sum === 2) {
            sum = 0;
            count++
        }
    }

    return count
}

/**
 * 检出字符串最后一个标点符号
 * 比如"哈喽，世界！"，则返回"！"
 * @param text
 * @returns {string}
 */
export function checkLastPunctuationMark(text) {
    let punctuationMarks = [',', '.', '?', '!', '，', '。', '？', '！', '”'];
    let markIndex = 0;
    let mark = '。';
    for (let i = 0; i < punctuationMarks.length; i++) {
        let index = text.lastIndexOf(punctuationMarks[i]);
        if (index > markIndex) {
            markIndex = index;
            mark = punctuationMarks[i]
        }
    }
    return {markIndex, mark}

}

/*
export const contentFormat = (content, fontSize = 18) => {
    let fontCount = parseInt(WIDTH / (fontSize + 1));
    let lines = parseInt(HEIGHT / fontSize / 9 * 6);
    const length = content.length;
    let array = [];
    let start = 0, end = 0, index = 0;
    while (start < length) {
        let _array = [];
        for (let i = 0; i <= lines; i++) {
            end = start + fontCount;
            _array[i] = content.substring(start, end);
            start = end
        }
        array[index] = _array;
        index++
    }
    return array
};*/
