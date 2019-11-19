/**
 * @author Semper
 */
import {UNICODE_TYPE} from './constants';

export const baseUrl = 'http://104.168.29.114:8000/';

export const loginUrl = baseUrl + 'login';
export const registerUrl = baseUrl + 'register';
export const saveUrl = baseUrl + 'save';
export const notificationUrl =
  'https://github.com/SimpeChan/NotificationData/blob/master/README.md';

const ZSSQ_BASE_URL = 'http://api.zhuishushenqi.com';
const W_ZSSQ_URL = 'http://www.zhuishushenqi.com';
export const ZSSQ_IMG_URL = 'http://statics.zhuishushenqi.com';
export const BQG_BASE_URL = 'http://www.qu.la';
export const EXIAOSHUO1_BASE_URL = 'https://www.zwdu.com';
export const EXIAOSHUO2_BASE_URL = 'https://www.exiaoshuo.com';
export const EXIAOSHUO3_BASE_URL = 'https://www.zwda.com';
export const EXIAOSHUO4_BASE_URL = 'https://www.23txt.com';
export const EXIAOSHUO5_BASE_URL = 'https://www.xbiquge6.com';

export const ZSSQ_SEARCH = ZSSQ_BASE_URL + '/book/fuzzy-search?query=';
export const WLZW_SEARCH =
  'http://zhannei.baidu.com/cse/search?s=5516679623550761859&q=';

export const BQG2_SEARCH =
  'http://zhannei.baidu.com/cse/search?s=14041278195252845489&q=';
export const PBDZS_SEARCH =
  'http://zhannei.baidu.com/cse/search?s=13386898804301110817&q=';
export const DDXS_SEARCH =
  'http://zhannei.baidu.com/cse/search?s=5334330359795686106&q=';
export const EXIAOSHUO1_SEARCH = 'https://www.zwdu.com/search.php?keyword=';
export const EXIAOSHUO2_SEARCH =
  'https://www.exiaoshuo.com/search.php?keyword=';
export const EXIAOSHUO3_SEARCH = 'https://www.zwda.com/search.php?keyword=';
export const EXIAOSHUO4_SEARCH = 'https://www.23txt.com/search.php?keyword=';
export const EXIAOSHUO5_SEARCH = 'https://www.xbiquge6.com/search.php?keyword=';

export const ZSSQ_NAME = '优质源';
export const WLZW_NAME = '武林中文网';
export const BQG2_NAME = '笔趣阁2';
export const PBDZS_NAME = '平板电子书网';
export const DDXS_NAME = '顶点小说网';
export const EXIAOSHUO1_NAME = '小说源1';
export const EXIAOSHUO2_NAME = '小说源2';
export const EXIAOSHUO3_NAME = '小说源3';
export const EXIAOSHUO4_NAME = '小说源4';
export const EXIAOSHUO5_NAME = '小说源5';

export const ZSSQ_CHARTER_BASE = 'http://chapter2.zhuishushenqi.com/chapter/';
export const BOOK_DETAIL_BASE = ZSSQ_BASE_URL + '/book/';
export const ZSSQ_CATALOG_BASE = ZSSQ_BASE_URL + '/mix-atoc/';

export const RANKINGS_URL = 'http://api.zhuishushenqi.com/ranking/gender';
export const RANKING_BASE_URL = 'http://api.zhuishushenqi.com/ranking/';
export const CATEGORY_URL = ZSSQ_BASE_URL + '/cats/lv2/statistics';
export const CATEGORY_LV2_URL = ZSSQ_BASE_URL + '/cats/lv2';
/**
 * GET 按分类获取书籍列表
 * @param gender male、female
 * @param type   hot(热门)、new(新书)、reputation(好评)、over(完结)
 * @param major  玄幻
 * @param start  从多少开始请求
 * @param minor  东方玄幻、异界大陆、异界争霸、远古神话
 * @param limit  50
 */
export const CATEGORY_BOOKS_URL = ZSSQ_BASE_URL + '/book/by-categories';

export const SPREAD_URL =
  'https://raw.githubusercontent.com/SimpeChan/Notification/a4833de749027dbd31195dda04b3c9fb5df5daa1/spread.json';
export const OTHER_SEARCH_URLS = [
  {
    siteName: EXIAOSHUO1_NAME,
    searchUrl: EXIAOSHUO1_SEARCH,
    unicodeName: UNICODE_TYPE.UTF8,
  },
  // {siteName: EXIAOSHUO2_NAME, searchUrl: EXIAOSHUO2_SEARCH,unicodeName:UNICODE_TYPE.UTF8},
  {
    siteName: EXIAOSHUO3_NAME,
    searchUrl: EXIAOSHUO3_SEARCH,
    unicodeName: UNICODE_TYPE.UTF8,
  },
  {
    siteName: EXIAOSHUO4_NAME,
    searchUrl: EXIAOSHUO4_SEARCH,
    unicodeName: UNICODE_TYPE.UTF8,
  },
  {
    siteName: EXIAOSHUO5_NAME,
    searchUrl: EXIAOSHUO5_SEARCH,
    unicodeName: UNICODE_TYPE.UTF8,
  },
];
