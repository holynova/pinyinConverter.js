var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

// should();  // Modifies `Object.prototype`
const PinyinConverter = require('../src/PinyinConverter')

describe('类测试', function () {
  it('大小写测试', () => {
    let p = new PinyinConverter()
    let str = 'liu dehua'
    p.formatLetterCase(str).should.be.equal('Liu Dehua')
    p.formatLetterCase(str, 'foo').should.be.equal('Liu Dehua')
    p.formatLetterCase(str, 'capital').should.be.equal('Liu Dehua')
    p.formatLetterCase(str, 'lower').should.be.equal('liu dehua')
    p.formatLetterCase(str, 'upper').should.be.equal('LIU DEHUA')
  })


  it('人名测试,以刘德华为例', () => {
    let p = new PinyinConverter('刘德华')
    let modes = [
      'liu de hua',
      'liu dehua',
      'dehua liu',
      'de hua liu',
      'dhliu',
      'liudh',
      'ldh',
      'dhl'
    ]
    for (let mode of modes) {
      p.go(mode, 'lower')[0].should.equal(mode)
    }
  })

  it('人名+大小写完整测试', () => {
    let name = '吕洞宾'
    let testCases = [
      { mode: 'liu de hua', letter: 'lower', expect: 'lv dong bin' },
      { mode: 'liu dehua', letter: 'lower', expect: 'lv dongbin' },
      { mode: 'dehua liu', letter: 'lower', expect: 'dongbin lv' },
      { mode: 'de hua liu', letter: 'lower', expect: 'dong bin lv' },
      { mode: 'dhliu', letter: 'lower', expect: 'dblv' },
      { mode: 'liudh', letter: 'lower', expect: 'lvdb' },
      { mode: 'ldh', letter: 'lower', expect: 'ldb' },
      { mode: 'dhl', letter: 'lower', expect: 'dbl' },

      { "mode": "liu de hua", "letter": "upper", "expect": "LV DONG BIN" },
      { "mode": "liu dehua", "letter": "upper", "expect": "LV DONGBIN" },
      { "mode": "dehua liu", "letter": "upper", "expect": "DONGBIN LV" },
      { "mode": "de hua liu", "letter": "upper", "expect": "DONG BIN LV" },
      { "mode": "dhliu", "letter": "upper", "expect": "DBLV" },
      { "mode": "liudh", "letter": "upper", "expect": "LVDB" },
      { "mode": "ldh", "letter": "upper", "expect": "LDB" },
      { "mode": "dhl", "letter": "upper", "expect": "DBL" }
    ]

    let p = new PinyinConverter(name)
    for (let c of testCases) {
      let { mode, letter, expect } = c
      p.go(mode, letter)[0].should.equal(expect)
    }
  })
})