var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
describe('BasicValidations', () => {
  describe('chai', () => {
    it('should be able to use chai assert commands', () => {
      var foo = 'bar';
      var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
      assert.typeOf(foo, 'string'); // without optional message
      assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
      assert.equal(foo, 'bar', 'foo equal `bar`');
      assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
      assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
    });
    it('should be able to use chai should commands', () => {
      var foo = 'bar';
      var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
      foo.should.be.a('string');
      foo.should.equal('bar');
      foo.should.have.lengthOf(3);
      beverages.should.have.property('tea').with.lengthOf(3);
      expect(foo).to.be.a('string');
      expect(foo).to.equal('bar');
      expect(foo).to.have.lengthOf(3);
      expect(beverages).to.have.property('tea').with.lengthOf(3);
    });
    it('should be able to use chai expect commands', () => {
      var foo = 'bar';
      var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
      expect(foo).to.be.a('string');
      expect(foo).to.equal('bar');
      expect(foo).to.have.lengthOf(3);
      expect(beverages).to.have.property('tea').with.lengthOf(3);
    });
  });
});
