/**
 * @author Semper
 */
import {StyleSheet} from 'react-native'

export const ThemeColors = {
    darkColors: {
        primary: 'rgb(230,47,52)',
        dark: 'rgb(230,47,52)',
        light: 'rgb(120,120,120)',
        grayLight: '#99979c',
        borderColor: '#eee',
    },
    pinkColors: {
        primary: '#ec407a',
        dark: '#b4004e',
        light: '#ff5c8d',
        grayLight: '#99979c',
        borderColor: '#eee',
    },

    /*color: {
        white: '#fff',
        black: '#000',
        red: '#d9534f',
        orange: '#f0ad4e',
        yellow: '#ffd500',
        green: '#5cb85c',
        blue: '#0275d8',
        teal: '#5bc0de',
        pink: '#ff5b77',
        purple: '#613d7c'
    }*/
};
export default function createTheme(themeColor = ThemeColors.darkColors) {
    return {
        primaryColor: themeColor.primary,
        darkColor: themeColor.dark,
        lightColor: themeColor.light,
        styles: StyleSheet.create({
            fontColorGrayLight: {
                color: themeColor.grayLight
            },
            primaryBgColor: {
                backgroundColor: themeColor.primary
            },
            primaryColor: {
                color: themeColor.primary
            },
            darkBgColor: {
                backgroundColor: themeColor.dark
            },
            darkColor: {
                color: themeColor.dark
            },
            lightBgColor: {
                backgroundColor: themeColor.light
            },
            lightColor: {
                color: themeColor.light
            },
            borderColor: {
                borderColor: themeColor.borderColor
            }

        })
    }
}

