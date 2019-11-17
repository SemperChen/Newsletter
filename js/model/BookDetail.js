/**
 * @author Semper
 */

export type BookDetail = {
    _id, title, author, isSerial, majorCate, minorCate,
    longIntro, lastChapter, updated, cover, rating:Rating, latelyFollower, retentionRatio, serializeWordCount, tags:Array<string>
}

type Rating={
    count:number, score:number, isEffect:boolean
}