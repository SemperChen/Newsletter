/**
 * @author Semper
 */
import {storage} from "./StorageUtil";

export function saveData(name,data) {
    try{
        if (data !== null && data !== undefined) {
            storage.save({
                key: name,
                data: data
            })
        }
    }catch(e){
        console.warn('saveData func',e.message)
    }
}

export function loadData(name) {
    try{
        return storage.load({
            key: name
        }).then(config => {
            // 如果找到数据，则在then方法中返回
            return config;
        }).catch(err => {
            // 如果没有找到数据且没有sync方法，
            // 或者有其他异常，则在catch中返回
            console.warn('读取数据失败', err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
            return []
        })
    }catch(e){
        console.log('loadData func', e.message)
    }
}
