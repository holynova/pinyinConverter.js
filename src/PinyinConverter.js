
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
    let clone = str
    return clone.replace(/\b\w/g, c => c.toUpperCase())
    // let charList = str.toLowerCase().split('')
    // let first = charList.shift()
    // let rest = charList
    // return first.toUpperCase() + rest.join('')
    // return 
  }

  formatLetterCase(str, letter = 'capital') {
    let result = str
    // if (letter === 'capital') {
    //   result = str.split(this.separator)
    //     .map(word => this.capitalize(word))
    //     .join(this.separator)
    // } else 
    if (letter === 'upper') {
      result = str.toUpperCase()
    } else if (letter === 'lower') {
      result = str.toLowerCase()
    } else {
      result = str.split(this.separator)
        .map(word => this.capitalize(word))
        .join(this.separator)
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

