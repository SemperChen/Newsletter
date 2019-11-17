import {Platform} from "react-native";
import GBKHttp from '../utils/http/GBKHttp';
import {UNICODE_TYPE} from "../constants/constants";

/**
 * @author Semper
 */

export function fetchBookmark(url, params) {

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        })
            .then((response) => {
                return response.json()
            })
            .catch((error) => {
                reject(error);
            }).then((responseData) => {
            if (!responseData) {
                reject(new Error('fetchBookmark:responseData is null'));
                return;
            }
            resolve(responseData);
        }).done();
    })
}

export function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': 'Mozilla/5.0 (Linux; X11)',
            }
        })
            .then((response) => {
                return response.json()
            })
            .catch((error) => {
                reject(error);
            }).then((responseData) => {
            if (!responseData) {
                reject(new Error('fetchJSON:responseData is null'));
                return;
            }
            resolve(responseData);
        }).done();
    })
}

export function fetchNetData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .catch((error) => {
                reject(error);
            }).then((responseData) => {
            if (!responseData) {
                reject(new Error('fetchNetData:responseData is null'));
                return;
            }
            resolve(responseData);
        }).done();
    })
}

export function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.text()
            })
            .catch((error) => {
                reject(error);
            }).then((responseData) => {
            if (!responseData) {
                reject(new Error('fetchHtml:responseData is null'));
                return;
            }
            resolve(responseData);
        }).done();
    })
}

export function fetchOtherSearch(url,unicodeName) {
    if (Platform.OS === 'android' && unicodeName === UNICODE_TYPE.GBK) {
        return fetchHtmlGBK(url)
    } else {
        return searchBook(url)
    }

}

export function fetchHtmlGBK(url) {
    return new Promise((resolve, reject) => {
        GBKHttp.fetchGBKData(url,
            (error) => {
                reject(new Error(error));
            },
            (res) => {
                resolve(res)
            });
    })
}

export function searchBook(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.text()
            })
            .catch((error) => {
                reject(error);
            }).then((responseData) => {
            if (!responseData) {
                reject(new Error('fetchHtml:responseData is null'));
                return;
            }
            resolve(responseData);
        }).done();
    })
}

export function fetchBookContentJSON(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .catch((error) => {
                reject(error);
            }).then((responseData) => {
            if (!responseData) {
                reject(new Error('fetchHtml:responseData is null'));
                return;
            }
            resolve(responseData);
        }).done();
    })
}

export function fetchCatalogGBKText(url) {
    if (Platform.OS === 'android') {
        return fetchHtmlGBK(url)
    } else {
        return fetchCatalogText(url)
    }

}

export function fetchBookContentGBKText(url) {
    if (Platform.OS === 'android') {
        return fetchHtmlGBK(url)
    } else {
        return fetchBookContentText(url)
    }

}

export function fetchBookContentText(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.text()
            })
            .catch((error) => {
                reject(error);
            }).then((responseData) => {
            if (!responseData) {
                reject(new Error('fetchHtml:responseData is null'));
                return;
            }
            resolve(responseData);
        }).done();
    })
}

export function fetchCatalogText(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.text()
            })
            .catch((error) => {
                reject(error);
            }).then((responseData) => {
            if (!responseData) {
                reject(new Error('fetchCatalogText:responseData is null'));
                return;
            }
            resolve(responseData);
        }).done();
    })
}
