import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Bookstore from "../components/novel/Bookstore";
import Search from "../components/novel/Search";
import ReadPage from "../components/novel/ReadPage";
import BookDetailPage from "../components/novel/BookDetailPage";
import CatalogPage from "../components/novel/CatalogPage";
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
import CommonListPage from "../components/CommonListPage";
import ArticlePage from "../components/ArticlePage";
import SearchPage from "../components/SearchPage";
import My from "../components/My";
import CollectionPage from "../components/CollectionPage";
import MessagePage from "../components/MessagePage";

const TabContainer = createBottomTabNavigator(
    {
        Bookcase: {screen: HomePage},
        Bookstore: {screen: Bookstore},
        Sort: {screen: CategoryPage1},
        My: {screen: My}

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
    SearchPage: {screen: SearchPage,navigationOptions: {header:null}},
    Article: {screen: ArticlePage},
    Collection:{screen:CollectionPage},
    Message:{screen:MessagePage},
    CommonList: {screen: CommonListPage},
    Splash: {screen: SplashPage},
    SelectSex: {screen: SelectSexPage},
    App: {screen: TabContainer,navigationOptions: {header:null}},
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
