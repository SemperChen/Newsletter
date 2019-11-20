import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Bookcase from "../components/novel/Bookcase";
import Bookstore from "../components/novel/Bookstore";
import Search from "../components/novel/Search";
import ReadPage from "../components/novel/ReadPage";
import BookDetailPage from "../components/novel/BookDetailPage";
import CatalogPage from "../components/novel/CatalogPage";
import Explore from "../components/novel/Explore";
import RankingsPage from "../components/novel/RankingsPage";
import CategoryPage from "../components/novel/CategoryPage";
import CategoryDetailPage from "../components/novel/CategoryDetailPage";
import SettingPage from "../components/novel/SettingPage";
import WelcomePage from "../components/WelcomePage";
import SelectSexPage from "../components/novel/SelectSexPage";
import RankingDetailPage from "../components/novel/RankingDetailPage";
import CommonRankingDetail from "../components/novel/CommonRankingDetail";
import I18n from '../i18n/i18n';
import NotificationPage from "../components/novel/NotificationPage";
import WebReadPage from "../components/novel/WebReadPage";
import SplashPage from "../components/SplashPage";
import CategoryPage1 from "../components/novel/CategoryPage1";
import BookSources from "../components/novel/BookSources";
import UserPage from "../components/novel/UserPage";
import AddNewsPage from "../components/AddNewsPage";
import HomePage from "../components/HomePage";
import HomePage2 from "../components/HomePage2";
import HomePage3 from "../components/HomePage3";
import HomePage1 from "../components/HomePage1";

const TopTabNavigator = createMaterialTopTabNavigator({
    topPage1: {
        screen: HomePage,
    },
    topPage2: {
        screen: HomePage1,
    },
    topPage3: {
        screen: HomePage2,
    },
    topPage4:{
        screen:HomePage3,
    }
}, {
    tabBarPosition: 'top',       //标签栏在屏幕顶部还是底部
    // swipeEnabled:true,           //是否可以滑动切换标签
    // backBehavior:'none',         //andorid按下返回键将返回initalRouteName，如果设置非initalRouteName则直接结束标签导航
    lazy: false,
    //是否只渲染显示的标签
    animationEnabled: true,         //标签切换是否有动画效果
    tabBarOptions: {
        activeTintColor: '#ffffff',  //标签栏激活字体颜色
        inactiveTintColor: '#000000',//标签栏未激活字体颜色
        showLabel: true,             //是否显示标签栏
        labelStyle: {fontSize: 16},  //标签样式(可设置字体大小等)
        showIcon: true,              //是否显示标签栏上图标
        scrollEnabled: true,        //是否可以滚动标签栏目(当tab总数超过一屏)
        indicatorStyle: {height: 1}, //指示器样式 height：0则不显示
        style: {backgroundColor: '#31b3c0'}, //设置整个tabbar样式(背景颜色等)
        // tabStyle:{backgroundColor:'#ffffff', height:50},//设置单个tabbar样式
    }
});

const TabContainer = createBottomTabNavigator(
    {
        Bookcase: {screen: TopTabNavigator},
        Bookstore: {screen: Bookstore},
        Sort: {screen: CategoryPage1},
        Explore: {screen: Explore}

    },
    {
        animationEnabled: false,
        swipeEnabled: false,
        lazy: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            /*activeTintColor: 'deeppink',
            inactiveTintColor: 'violet',*/
            showIcon: true,
            showLabel: true,
            labelStyle: {
                marginTop: 0,
                fontSize: 12,
            },
            style: {
                backgroundColor: '#fff',
            },
            indicatorStyle: {
                opacity: 0,
            },
            iconStyle: {},
            tabStyle: {
                height: 48,
                margin: 0,
                padding: 0,
                alignItems: 'center',
                justifyContent: 'center'
            }
        }
    }
);

let RootStack = createStackNavigator({
    Welcome: {screen: WelcomePage},
    User: {screen: UserPage},
    AddNews: {screen: AddNewsPage},
    Home: {screen: HomePage},
    Splash: {screen: SplashPage},
    SelectSex: {screen: SelectSexPage},
    App: {screen: TabContainer,navigationOptions: ({navigation, screenProps}) => ({
            headerStyle: {backgroundColor: screenProps.appTheme.primaryColor,elevation: 0,borderBottomWidth:0},
            headerTitle: I18n.t('magicalBookstore'),
            headerTintColor: '#fff'
        })},
    TopTabNavigator:{screen:TopTabNavigator},
    Search: {screen: Search},
    Read: {screen: ReadPage,navigationOptions: {gesturesEnabled:false}},
    WebRead: {screen: WebReadPage},
    BookDetail: {screen: BookDetailPage, navigationOptions: {headerTitle: I18n.t('detail')}},
    Catalog: {screen: CatalogPage},
    Rankings: {screen: RankingsPage},
    Ranking: {screen: RankingDetailPage},
    WeekRankingPage: {screen: CommonRankingDetail},
    Category: {screen: CategoryPage, navigationOptions: {headerTitle: I18n.t('category')}},
    CategoryDetail: {screen: CategoryDetailPage},
    Setting: {screen: SettingPage},
    Notification: {screen: NotificationPage},
    BookSources:{screen:BookSources}
});

// And the app container
const Navigation = createAppContainer(RootStack);
export default Navigation;
