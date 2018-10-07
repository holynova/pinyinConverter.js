
// const pinyinlite = require('pinyinlite');
const pinyin = require('pinyin')
const log = console.log.bind(console)

class PininConverter {

    constructor(text, separator = ' ') {
        this.text = text
        this.words = []
        this.separator = separator
    }

    split() {
        if (this.text) {
            this.words = this.text.replace(/^\s+|\s+$/g, '').split(/\s+/)
            return this.words
        }
        return false
    }

    capitalize(str) {
        let charList = str.toLowerCase().split('')
        let first = charList.shift()
        let rest = charList
        return first.toUpperCase() + rest.join('')
    }

    formatLetterCase(str, letter = 'capital') {
        let result = str
        if (letter === 'capital') {
            result = str.split(this.separator)
                .map(word => this.capitalize(word))
                .join(this.separator)
        } else if (letter === 'upper') {
            result = str.toUpperCase()
        } else if (letter === 'lower') {
            result = str.toLowerCase()
        }
        return result
    }

    convertWord(word, mode = 'liu dehua', letter = 'capital') {
        let result = ''
        // let charArr = pinyinlite(word).map(arr => arr[0])
        let charArr = pinyin(word, {
            style: pinyin.STYLE_NORMAL,
        }).map(item => item[0])
        // log('charArr', JSON.stringify(charArr, null, 2))
        let family = charArr.shift()
        let rest = charArr
        mode = mode.toLowerCase()
        if (mode === 'liu de hua') {
            result = [family, ...rest].join(this.separator)
        } else if (mode === 'liu dehua') {
            let name = rest.join('')
            result = `${family}${this.separator}${name}`
        } else if (mode === 'dehua liu') {
            let name = rest.join('')
            result = `${name}${this.separator}${family}`
        } else if (mode === 'de hua liu') {
            let name = rest.join(this.separator)
            result = `${name}${this.separator}${family}`
        } else if (mode === 'dhliu') {
            let name = rest.map(word => word.charAt(0)).join('')
            result = name + family

        } else if (mode === 'liudh') {
            let name = rest.map(word => word.charAt(0)).join('')
            result = family + name

        } else if (mode === 'ldh') {
            let name = rest.map(word => word.charAt(0)).join('')
            result = family.charAt(0) + name
        } else if (mode === 'dhl') {
            let name = rest.map(word => word.charAt(0)).join('')
            result = name + family.charAt(0)
        }

        return this.formatLetterCase(result, letter)

    }

    getAll(mode, letter) {
        this.split()
        let names = this.words.map(word => this.convertWord(word, mode, letter))
        // log(names)
        return names
    }
    // mode 
    // 0 liu de hua  
    // 1 liu dehua
    // 2 dehua liu 
    // 3 de hua liu
    // 4 dhliu
    // 5 liudh
    // 6 dhliu
    // 7 ldh
    // 8 dhl

    // 大小写
    // upper
    // lower
    // Capital


    go(mode = 'liu dehua', letter = 'capital') {
        return this.getAll(mode, letter)
    }

}

module.exports = PininConverter


// var text = `程暘
// 吴国庆
// 顾晓桐
// 尤嘉
// 张轩
// 马壮
// 何赢潮
// 巨万里
// 孙伦茂
// 于勇
// 陈剑
// 魏永霖
// 张迪
// 闫波辉
// 李冉君
// 牟华
// 徐盛
// 吕文斌
// 袁超
// 池建炜
// 陆诗捷
// 李敬翔
// 严巍
// 周东青
// 杜壮壮
// 曾磊文
// 沈正中
// 董浩鹏
// 张栋嘉
// 胡倩
// 周成龙
// 陈涛峰
// 桑益民
// 葛小龙
// 罗林峰
// 曹自豪
// 耿海浪
// 文韬
// 杭晟睿
// 肖梦佳
// 李照
// 范荪
// 殷鹏
// 沈超
// 王洪基
// 李胜
// 方启明
// 丁晓杰
// 周有亮
// 顾琪瑶
// 张省
// 张新宇
// 王国涛
// 张嵘`;

// // let input = '顾晓彤'
// input = text
// let p = new PininConverter(input)
// log(JSON.stringify(p.go()))
// // log(p.convertWord(input, 'liu dehua'))
// // let list = p.go()
// // log(pinyinlite('大阳'))


// function test() {
//     let arr = [
//         'liu de hua',
//         'liu dehua',
//         'dehua liu',
//         'de hua liu',
//         'dhliu',
//         'liudh',
//         'dhliu',
//         'ldh',
//         'dhl'
//     ]
//     let p = new PininConverter('刘德华')
//     for (let mode of arr) {
//         let result = p.go(mode, 'lower')[0]
//         log(`${mode === result}   | ${mode}, ${result}, `)
//     }
// }
// test()