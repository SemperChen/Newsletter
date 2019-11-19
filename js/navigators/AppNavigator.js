import {createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Bookcase from "../components/Bookcase";
import Bookstore from "../components/Bookstore";
import Search from "../components/Search";
import ReadPage from "../components/ReadPage";
import BookDetailPage from "../components/BookDetailPage";
import CatalogPage from "../components/CatalogPage";
import Explore from "../components/Explore";
import RankingsPage from "../components/RankingsPage";
import CategoryPage from "../components/CategoryPage";
import CategoryDetailPage from "../components/CategoryDetailPage";
import SettingPage from "../components/SettingPage";
import WelcomePage from "../components/WelcomePage";
import SelectSexPage from "../components/SelectSexPage";
import RankingDetailPage from "../components/RankingDetailPage";
import CommonRankingDetail from "../components/CommonRankingDetail";
import I18n from '../i18n/i18n';
import NotificationPage from "../components/NotificationPage";
import WebReadPage from "../components/WebReadPage";
import SplashPage from "../components/SplashPage";
import CategoryPage1 from "../components/CategoryPage1";
import BookSources from "../components/BookSources";
import UserPage from "../components/UserPage";
import AddNewsPage from "../components/AddNewsPage";
import HomePage from "../components/news/HomePage";
// Create our stack navigator

const TabContainer = createBottomTabNavigator(
    {
        Bookcase: {screen: Bookcase},
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
