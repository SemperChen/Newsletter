/**
 * @author Semper
 */
import {contentFormat} from "./FormatUtil";

let _split = require('lodash/split');
let _compact = require('lodash/compact');
let _dropRight = require('lodash/dropRight');

export function getOtherSearchBookInfo(htmlText,siteName) {

    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let content = htmlText.substring(htmlText.indexOf('class="result-list"'));
            let mainContent = content.substring(0, content.indexOf('class="search-result-page"'));
            let list = mainContent.split('class="result-game-item-pic"');
            list.shift()
            // console.log('list=',list)
            let result = [];
            for (let i = 0; i < list.length; i++){
                let item = list[i];
                let imgContent = item.substring(item.indexOf('<img src="')+10);
                let img = imgContent.substring(0,imgContent.indexOf('"'));
                let titleContent = imgContent.substring(imgContent.indexOf('title="')+7);
                let title = titleContent.substring(0,titleContent.indexOf('"'))
                let urlContent = imgContent.substring(imgContent.indexOf('cpos="title" href="')+19);
                let url = urlContent.substring(0,urlContent.indexOf('"'));
                let descContent = imgContent.substring(imgContent.indexOf('result-game-item-desc')+23);
                let desc = descContent.substring(0,descContent.indexOf('</p>'));
                let authorContent = descContent.substring(descContent.indexOf('</span>')+7);
                let author = authorContent.substring(authorContent.indexOf('<span>')+6,authorContent.indexOf('</span>')).trim();
                let timeContent = authorContent.substring(authorContent.indexOf('更新时间'));
                timeContent = timeContent.substring(timeContent.indexOf('tag-title')+11);
                let time = timeContent.substring(0,timeContent.indexOf('<')).trim();
                let chapterContent = authorContent.substring(authorContent.indexOf('cpos="newchapter"')+25);
                // let chapterUrl = chapterContent.substring(0,chapterContent.indexOf('"'))
                let chapterName = chapterContent.substring(chapterContent.indexOf('>')+1,chapterContent.indexOf('<'));

                result.push({
                    title,
                    author,
                    cat: "",
                    shortIntro: desc,
                    lastChapter: chapterName,
                    date: time,
                    img,
                    articleUrlTag: url,
                    siteName
                })
            }
            // console.log(result)
            return result

        } catch (e) {
            console.warn('getOtherSearchBookInfo 解析失败', e.message)
        }
    }
}

export function getCatalogEXIAOSHUO1(htmlText) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {
            //截取<dl>到</dl>内容，要确保<dl>和</dl>是唯一的
            let mainContent = htmlText.substring(htmlText.indexOf('<dl>'), htmlText.lastIndexOf('</dl>'));
            mainContent = mainContent.substring(mainContent.indexOf('</dt>') + 5);
            mainContent = mainContent.substring(mainContent.indexOf('<dt>'))

            // console.log('mainContent',mainContent)
            //截断所有的href=并生成数组
            let array = mainContent.split('href="');
            // console.log('getCatalogDDXS array',array)
            //删掉第一个没用的数组
            array.shift();
            // console.log('getCatalogDDXS array',array)
            let catalog = [];
            //遍历截取信息
            for (let i = 0; i < array.length; i++) {
                let str = array[i];
                // console.log('str',str)
                let link = str.substring(0, str.indexOf('"'));
                let title = str.substring(str.indexOf('">') + 2, str.indexOf('</a>'));
                //将章节标题和对应url写入数组
                catalog.push({num: i, link, title, isCacheSuccess: false, filePath: null});
            }
            // console.log('catalog=',catalog)
            return catalog
        } catch (e) {
            console.warn('getCatalogDDXS 解析失败', e.message)
        }

    }
}

export function getBookContentEXIAOSHUO1(htmlText, bookUrl, bookName, currentChapterNum, fontSize) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {

            let title = htmlText.substring(htmlText.indexOf('<h1>') + 4, htmlText.indexOf('</h1>'));
            // console.log('title:', title);
            //确保id="content"是唯一
            let mainContent = htmlText.substring(htmlText.indexOf('id="content"')+13);
            // console.log('mainContent:', mainContent);

            let articleContent = mainContent.substring(0, mainContent.indexOf('bottem2')).trim();

            articleContent = articleContent.substring(0, articleContent.indexOf('</div>')).trim();
            //以<br /><br />为节点，将内容切割成数组
            let node = '<br /><br />';
            if(articleContent.indexOf(node)===-1){
                node = '<br />'
            }
            let article = _split(articleContent, node);
            //删除第一个数组
            // article.shift();
            let newArticle = [];

            for (let i = 0; i < article.length; i++) {

                let a = article[i];
                if(i === 0&&a.indexOf('<br />') !== -1){
                    a = a.replace('<br />', '')
                }

                //循环删除&nbsp;&nbsp;&nbsp;&nbsp;
                while (a.indexOf('&nbsp;') !== -1) {
                    a = a.replace('&nbsp;', '')
                }
                newArticle.push(a)
            }
            if(newArticle[0].indexOf('<br />') !== -1){}

            newArticle = _compact(newArticle);
            // console.log('newArticle',newArticle);
            articleContent = contentFormat(newArticle, fontSize);
            // console.log('articleContent',articleContent);
            let articles = [];
            for (let i = 0; i < articleContent.length; i++) {
                articles[i] = {
                    bookName,
                    bookUrl,
                    chapterName: title,
                    currentChapterNum,
                    pageNum: i + 1,
                    totalPage: articleContent.length,
                    chapterContent: articleContent[i]
                }
            }
            // console.log('articles',articles)
            return articles
        } catch (e) {
            console.warn('getBookContentPBDZS 解析失败↵', e.message)
        }

    }
    console.warn('getBookContentPBDZS return null');
    return null;
}

export function getNotification(htmlText) {
    if (!(htmlText === undefined || htmlText === '')) {
        try {
            let mainContent = htmlText.substring(htmlText.indexOf('article'), htmlText.lastIndexOf('</article>'));
            let ulContent = mainContent.substring(mainContent.lastIndexOf('<ul>'), mainContent.lastIndexOf('</ul>'));
            let array = ulContent.split('<li>');
            array.shift();
            let title = array[0].substring(0, array[0].indexOf('<'));
            let time = array[1].substring(0, array[1].indexOf('<'));
            let content = array[2].substring(0, array[2].indexOf('<'));
            let button = array[3].substring(0, array[3].indexOf('<'));
            let url = array[4].substring(array[4].indexOf('>') + 1, array[4].indexOf('</a'));
            let isShowAd = array[5].substring(0, array[5].indexOf('<'));
            isShowAd = isShowAd === 'true';
            let showAdInterval = array[6].substring(0, array[6].indexOf('<'));
            let isVersionExpired = array[7].substring(0, array[7].indexOf('<'));

            let interstitialId = array[8].substring(0, array[8].indexOf('<'));
            let rewardedId = array[9].substring(0, array[9].indexOf('<'));
            let bannerId = array[10].substring(0, array[10].indexOf('<'));
            let interstitialIdIOS = array[11].substring(0, array[11].indexOf('<'));
            let rewardedIdIOS = array[12].substring(0, array[12].indexOf('<'));
            let bannerIdIOS = array[13].substring(0, array[13].indexOf('<'));
            let googleAdIds = {
                android: {bannerId, interstitialId, rewardedId},
                ios: {bannerIdIOS, interstitialIdIOS, rewardedIdIOS}
            };
            let isShowVideoAd = array[14].substring(0, array[14].indexOf('<'));
            isShowVideoAd = isShowVideoAd === 'true';
            let isShowBannerAd = array[15].substring(0, array[15].indexOf('<'));
            isShowBannerAd = isShowBannerAd === 'true';
            isVersionExpired = isVersionExpired === 'true';
            showAdInterval = parseInt(showAdInterval);
            let baiduVoiceTok = array[16].substring(0, array[16].indexOf('<'));
            return {
                title,
                time,
                content,
                button,
                url,
                isShowAd,
                showAdInterval,
                isVersionExpired,
                googleAdIds,
                isShowVideoAd,
                isShowBannerAd,
                baiduVoiceTok
            };
        } catch (e) {
            console.warn('getNotification 解析失败', e.message)
        }

    }
    console.warn('The htmlText of getNotification func for a ParseHtmlUtil cannot be empty');
    // return {title: null, time: null, content: null, url: null}
}

export function getSearchBook(htmlText) {
    if (htmlText !== undefined && htmlText !== null && htmlText !== '') {
        let data = 'subText:class="result-list"&$subText0ToNode:class="search-result-page"&$splitByNode:class="result-game-item-pic"&$arrayShift:&*getPropertyList&#title:$subText:title="&$subText0ToNode:"&#img:$subText:<img src="&$subText0ToNode:"&#url:$subText:cpos="title" href="&$subText0ToNode:"&#desc:$subText:result-game-item-desc">&$subText0ToNode:</p>&#author:$subText:result-game-item-info-tag&$subText:<span>&$subText0ToNode:</span>&$trim:&#time:$subText:preBold">&$subText:preBold">&$subText:preBold">&$subText:title">&$subText0ToNode:</span>&#chapterName:$subText:cpos="newchapter"&$subTextStartToEnd:>,<';

        let result = getData(htmlText,data)

        console.log("result--",result)
        // return JSON.parse(result)
    }
}

export function getCatalog1(htmlText) {
    if (htmlText !== undefined && htmlText !== null && htmlText !== '') {
        // console.log("htmlText",htmlText)
        let data = 'subTextStartToEnd:<dl>,</dl>&$splitByNode:<dd>&$arrayShift:&*getPropertyList&#title:$subText:href="&$subText0ToNode:"&#link:$subText:href="&$subTextStartToEnd:">,</a>'
            let result = getData(htmlText,data)
        console.log("result--1",result)
        // return JSON.parse(result)
    }
}

export function getContent1(htmlText) {
    if (htmlText !== undefined && htmlText !== null && htmlText !== '') {
        let data = 'splitByNode:<title>&$arrayShift:&*getPropertyList&#title:$subTextStartToEnd:<h1>,</h1>&#content:$subText:id="content">&$subText0ToNode:bottem2&$trim:&$subText0ToNode:</div>&$splitByNode:<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&$compactAndJoin:&$rmFirstUselessTag:&nbsp;&nbsp;&nbsp;&nbsp;'

        let result = getData(htmlText,data)
        // console.log("result--1",result)
        // return JSON.parse(result)
    }
}

function getPropertyList(dataArray,funcsData) {
    if(dataArray&&dataArray.length>0){
        // let resultArray = []
        let result = [];
        dataArray = _compact(dataArray)
        for(let j = 0;j<dataArray.length;j++){
            let array = dataArray[j]
            let data = splitByNode(funcsData,"&#")
            arrayShift(data)
            let item = {}

            for(let i=0;i<data.length;i++){
                let propertyData = splitByNode(data[i],":$")
                let name = propertyData[0]
                let nodes = propertyData[1]
                item[name] = getProperty(array,nodes);
            }
            result.push(item)
        }
        return result


    }
}

function getData(text,funcsData){
    try {
        let data = text;
        if(funcsData.indexOf("&*")!==-1){
            let funcsArray = splitByNode(funcsData,"&*");
            for(let i = 0;i<funcsArray.length;i++){
                let funcsData = funcsArray[i];
                if(funcsData.indexOf("getPropertyList")!==-1){
                    data = getPropertyList(data,funcsData)
                }else {
                    data = getProperty(data,funcsData)
                }
            }
        }else {
            data = getProperty(text,funcsData)
        }
        return data
    }catch (e) {
        console.warn("getData",e.message)
        return null
    }

}

export function getCatalog(htmlText,nodesData) {

    nodesData = {catalogNodes:'>:<dl>,</dl>&$subText:</dt>&$subText:<dt>&$splitByNode:href="&$arrayShift:',chapterLinkNode:'subText0ToNode:"',chapterNameNode:'subTextStartToEnd:">,</a>'}

    let catalogArray = getProperty(htmlText,nodesData.catalogNodes)
    let catalog=[];
    for(let i=0;i<catalogArray.length;i++){
        let title = getProperty(catalogArray[i],nodesData.chapterNameNode)
        let link = getProperty(catalogArray[i],nodesData.chapterLinkNode)
        catalog.push({num:i,title,link})
    }
    console.log("catalog",catalog)
    // for (let i = 0; i < funcsData.length; i++) {
    //     catalogArray = getProperty(htmlText,funcsData)
    //
    // }
    // let title = getProperty(htmlText,funcsData[1])

    // let link = getProperty(htmlText,funcsData[2])

}

function handleFuncsArray(text,funcsData) {
    let funcsArray = splitByNode(funcsData,"&*")
    for(let i = 0;i<funcsArray.length;i++){
        let data = funcsArray[i]
        if(data.indexOf("getPropertyList")){
            getProperty(text,data)
        }
    }
}

function getProperty(text,funcsData) {

    let funcs = splitByNode(funcsData,"&$")
    for(let i = 0; i<funcs.length; i++){
        let func = funcs[i].split(":")
        let funcName = func[0]
        let funcParam = func[1]
        text = switchFuncName(funcName,text,funcParam)
    }
    return text
}

function switchFuncName(funcName,text,funcParam){
    switch (funcName) {
        case "subTextStartToEnd":
            return subTextStartToEnd(text,funcParam);
        case "subText":
            return subText(text,funcParam);
        case "subText0ToNode":
            return subText0ToNode(text,funcParam);
        case "splitByNode":
            return splitByNode(text,funcParam)
        case "arrayShift":
            arrayShift(text);
            return text;
        case "trim":
            return text.trim()
        case "join":
            return text.join("");
        case "compactAndJoin":
            return _compact(text).join("\n");
        case "compact":
            return _compact(text);
        case "rmFirstUselessTag":
            return rmFirstUselessTag(text,funcParam)
        case "rmAllUselessTag":
            return rmAllUselessTag(text,funcParam)

    }
}

function arrayShift(array) {
    if(array.length>1){
        array.shift()
    }
}

function subTextStartToEnd(text,funcParam) {
    if (text !== undefined && text !== '' && text !== undefined) {
        let params = funcParam.split(",")
        let start = params[0]
        let end = params[1]
        return text.substring(text.indexOf(start) + start.length, text.indexOf(end))
    }
    return null
}

function subText(text,start){
    if (text !== undefined && text !== '' && text !== undefined) {
        return text.substring(text.indexOf(start) + start.length)
    }
    return null
}

function subText0ToNode(text,node) {
    if (text !== undefined && text !== '' && text !== undefined) {
        return text.substring(0, text.indexOf(node))
    }
    return null
}

function splitByNode(text,node) {
    if (text !== undefined && text !== '' && text !== undefined){
        if(text.indexOf(node)!==-1){
            return _split(text, node)
        }
        return [text]
    }
    return []
}

function rmFirstUselessTag(text,tag) {

    if(text.indexOf(tag) !== -1){
        text =  text.replace(tag, '')
    }
    return text
}

function rmAllUselessTag(text,tag){
    while (text.indexOf(tag) !== -1) {
        text = text.replace(tag, '')
    }
    return text
}

export function getBookContent(htmlText){

    let titleNode = 'subTextStartToEnd:<h1>,</h1>'
    let chapterTextNodes = 'subText:id="content">&$subText0ToNode:bottem2&$trim:&$subText0ToNode:</div>&$splitByNode:<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&$compactAndJoin:&$rmFirstUselessTag:&nbsp;&nbsp;&nbsp;&nbsp;'

    let content = getProperty(htmlText,chapterTextNodes)
    let title = getProperty(htmlText,titleNode)

    console.log("content",title)

}
