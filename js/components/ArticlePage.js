/**
 * @author Semper
 */
import React from "react";
import {ScrollView, StyleSheet, TouchableOpacity, Text, View} from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import I18n from "../i18n/i18n";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {saveAppConfig} from "../utils/ConfigUtil";
import FontSizeSetting from "../commons/FontSizeSetting";
import MoreFeatures from "../commons/MoreFeatures";
import {COLLECTION, color65, color95} from "../constants/constants";
import {NavigationActions} from "react-navigation";
import {loadData} from "../utils/SaveDataUtil";

let VeryExpensive = null;
const footerItemSize = 22
const iconColor = color95
export const footerHeight = 48

const _findIndex = require('lodash/findIndex');
const _remove = require('lodash/remove');
class ArticlePage extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        let rankingName = I18n.t('rankingDetail');
        return {
            headerTitle: "区块链与互联网的信息博弈",
            headerStyle: {backgroundColor: '#fff', elevation: 0},
            headerTintColor: '#262626',
            headerRight: () => {
                return (
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                        <Icons
                            onPress={()=>{
                                navigation.navigate("SearchPage")
                            }}
                            style={{padding: 10, paddingLeft: 0}}
                            name="ios-search"
                            size={25}
                            color={'#262626'}
                        />
                        <Icons
                            onPress={()=>{
                                const {setShowMoreMenu} = navigation.state.params;
                                if(setShowMoreMenu){

                                }
                                setShowMoreMenu(true)
                            }}
                            style={{padding: 10}}
                            name="ios-more"
                            size={25}
                            color={'#262626'}/>
                    </View>
                )
            }
        }

    };

    toggleSetting = () => {
        if(!this.isOpenSetting){
            this._settingRef.open()
            this.isOpenSetting = true
        }else {
            this._settingRef.close()
            this.isOpenSetting = false
        }
    }

    toggleMoreFeatures = () => {
        if(this.state.needsExpensive){
            if(!this.isOpenMore){
                this._moreRef.open()
                this.isOpenMore = true
            }else {
                this._moreRef.close()
                this.isOpenMore = false
            }
        }else {

        }

    }

    didPress = () => {
        if (VeryExpensive == null) {
            VeryExpensive = require('../commons/MoreFeatures').default;
        }

        this.setState(() => ({
            needsExpensive: true,
        }));
    };

    setShowMoreMenu = (bool) => {
        this.showMoreMenu = bool;
        this.toggleMoreFeatures()
    }

    componentDidMount() {
        this.timer = setTimeout(this.didPress,1000);
        const {setParams} = this.props.navigation;
        setParams({setShowMoreMenu: this.setShowMoreMenu});

        // loadData(COLLECTION).then((collect)=>{
        //     this.collect = collect
        // })
    }

    componentWillUnmount(): void {
        this.timer&&clearTimeout(this.timer)
    }

    //收藏和移除收藏视频开关，点一次搜藏再点一次取消收藏
    _collectToggle = () => {
        this.setState((prevState)=>({
            isFavorite:!prevState.isFavorite
        }))
        const index = _findIndex(AppConfig.collection, (item)=>{
            return item.id === this.video.id
        });
        if(index!==-1){
            _remove(AppConfig.collection,(item)=>{
                return item.id===this.video.id
            })
        }else {
            if(this.video){
                AppConfig.collection.push(this.video);
                saveAppConfig(AppConfig)
            }
        }

    }

    constructor() {
        super();
        this.showMoreMenu = true;
        this.state = { needsExpensive: false,isCollect:false };
        this.txt = '原标题：《全球通史》第7版新校本推出 《全球通史》第7版新校本推出\n' +
            '\n' +
            '　　学者纵论“全球史观”当下之意义 《全球通史》第7版新校本推出\n' +
            '\n' +
            '　　中新网北京11月19日电 （记者 应妮）我们为什么要阅读历史？如果历史是一条无尽的通道，我们将如何认识自身在时间中的位置？历史书写者是否需要为所处的时代服务？在日前的《全球通史：从史前到21世纪》第7版新校本新书分享会上，与会学者们一直认为，只有透过过去，才能看到历史对今天的启示，也才能看到人类的未来。\n' +
            '\n' +
            '\n' +
            '　　《全球通史：从史前到21世纪》第7版书封。主办方供图\n' +
            '\n' +
            '　　20世纪70年代，美国著名历史学家也是“全球史观”的倡导者斯塔夫里阿诺斯出版了他的集大成之作——《全球通史：从史前史到21世纪》，这部书一经问世即赞誉如潮，并被翻译成多种文字，在世界各地产生极大影响，全球畅销2500万册，中文简体版已经销售600万册。历经时间的淘选，《全球通史》已成家喻户晓的经典之作。北京大学出版社日前推出了《全球通史：从史前到21世纪》第7版新校本，新校本正是根据中文版出版10余年来，读者不断反馈的意见整合的基础上推出的。\n' +
            '\n' +
            '\n' +
            '　　“北大博雅讲坛”App上线。主办方供图\n' +
            '\n' +
            '　　北大历史系教授高毅从历史的视角梳理了“全球史观”产生的渊源：从18世纪欧洲对中国文化的崇尚，到19世纪欧洲工业革命的完成从而产生“欧洲中心论”，再到20世纪60年代以后对“欧洲中心论”的否定，进而开启了全球史观的路径。在这种历史趋势下，斯塔夫里阿诺斯在书中并没有明确指出将来的世界要向哪里走去，但是通过他的描述，给读者展示了一些可能性——这些可能性是有关“大同世界”的可能性。“大同世界”这样的概念即便在今天听来也仍像乌托邦式的存在，但他认为，如果“大同世界”是乌托邦，那也是大家该为之奋斗的乌托邦，这正是《全球通史》在今天给予我们的力量感。\n' +
            '\n' +
            '　　北大历史系教授徐健则认为，《全球通史》出版的重要性在于把历史学从庙宇和殿堂推向了民间和草根，让一代代学生，不仅是历史学专业的，甚至非历史学专业的，都能对历史有重新的思考和认知。这也是历史家、历史学工作者使命担当的表现。此后，“全球史观”这一流派形成一股浩浩荡荡的潮流，一大批历史学家紧随其后，创造出更多闻名于世的著作。《全球通史》正是起着这种承前启后的作用。\n' +
            '\n' +
            '\n' +
            '　　嘉宾们一致认为，历史学家无法跳出关照现实的使命，正如《全球通史》所要尝试做出的努力。作为一部理解人类历史过往、现在与未来的经典著作，《全球通史》流露出的时代感与现实感时刻提醒我们认清所生活的现实世界与历史的内在联系，从而使我们的思想能够跨越时空的限制，看到历史的传承性。今天面临的很多问题，都可以从历史中找到根源。在叙述历史上的重大变故时，作者往往会联系当今形势，理清当今世界的来龙去脉。\n' +
            '\n' +
            '　　分享会开始之前，北京大学出版社、北大博雅讲坛、北大培文还联合举办了“北大博雅讲坛”App上线仪式。“北大博雅讲坛”是结合互联网强国战略及互联网新媒体传播的特性建立的品牌化、系列化名家讲座活动平台，至今共举办了220多期精品活动，在北京雄安创业会客厅、北大书店等区域共建立11家“北大博雅讲坛全国阅读空间”。此次App的正式面世，集在线直播、点播、电子书、书单及讲者等多种资源于一体，能满足参与者不同层次、不同方面的需求，无论用户在何时、何地，都可以实现“我在北大听讲座，让阅读少走弯路”，将构建全方位、多角度全民阅读推广模式。（完）'
    }

    render() {
        return (
            <View>
                <ScrollView contentContainerStyle={{padding: 10,paddingBottom:footerHeight+10}}>
                    <Text style={{fontSize: 16, lineHeight: 24, textAlign: 'justify', letterSpacing: 1,color:color65}}
                          selectable>{this.txt}</Text>

                </ScrollView>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: '#fff',
                    width: WIDTH,
                    height:footerHeight,
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderTopColor: '#EEE',
                    padding:10
                }}>
                    <TouchableOpacity
                        onPress={()=>{
                            NovelAppConfig.readConfig.isNightMode = !NovelAppConfig.readConfig.isNightMode;
                            saveAppConfig(NovelAppConfig)
                            this.forceUpdate()
                        }}
                        style={styles.footerItem}>
                        {NovelAppConfig.readConfig.isNightMode?
                            <MaterialIcons name="brightness-1" size={footerItemSize} color={iconColor}
                                           style={{}}/>:
                            <MaterialIcons name="brightness-2" size={footerItemSize} color={iconColor}
                                           style={{}}/>
                        }

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            this.toggleSetting()
                        }}
                        style={styles.footerItem}>
                        <MaterialIcons name="format-color-text" size={footerItemSize} color={iconColor}
                                       style={{}}/>
                        {/*<Text>字体大小</Text>*/}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({
                                isCollect:!this.state.isCollect
                            })
                        }}
                        style={styles.footerItem}>
                        {this.state.isCollect?
                            <MaterialIcons
                                name="favorite" size={footerItemSize} color={iconColor}
                                           style={{}}/>:
                            <MaterialIcons
                                name="favorite-border" size={footerItemSize} color={iconColor}
                                           style={{}}/>
                        }
                        {/*<Text>收藏</Text>*/}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            this.toggleMoreFeatures()
                        }}
                        style={styles.footerItem}>
                        <MaterialIcons name="share" size={footerItemSize} color={iconColor}
                                       style={{}}/>
                        {/*<Text>分享</Text>*/}
                    </TouchableOpacity>
                </View>

                <FontSizeSetting
                    ref={ref=>{this._settingRef = ref}}
                    toggleSetting={this.toggleSetting}
                />
                {this.state.needsExpensive ?
                    <MoreFeatures
                        ref={ref=>{this._moreRef = ref}}
                        showMoreMemu={this.showMoreMenu}
                        toggleMoreFeatures={this.toggleMoreFeatures}
                    />: null}


            </View>


        )
    }
}

const styles = StyleSheet.create({
    footerItem: {
        alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14
    }
});

export default ArticlePage;
