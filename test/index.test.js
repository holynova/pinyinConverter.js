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
      'dhliu',
      'ldh',
      'dhl'
    ]
    for (let mode of modes) {
      p.go(mode, 'lower')[0].should.equal(mode)
    }
  })
})