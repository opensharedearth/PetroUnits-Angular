import { ParseService } from './parse.service';

describe('ParseService', () => {
  let service: ParseService;

  beforeEach(() => { service = new ParseService(); });
  
  describe('checkIfValidExpression method', () => {

    it('exists on service', () => {
    expect(typeof service.checkIfValidExpression)
      .toBe("function");
    });

    it('finds invalid chars', () => {
      expect( service.checkIfValidExpression('*&') )
        .not.toBe(true);
    });

    it('accepts valid chars', () => {
      expect( service.checkIfValidExpression('hello') )
        .toBe(true);
      expect( service.checkIfValidExpression('10 cm = miles') )
        .toBe(true);
    });
  });
  

  describe('createRegExp method', () => {

    it('exists on service', () => {
      expect( typeof service.createRegExp ).toBe("function");
    });

    it('return a RegExp object', () => {
      let rx = service.createRegExp('20m = cm');
      console.log(rx);
      expect( rx instanceof RegExp ).toBe(true);
    });
  });

  describe('matchLHS method', () => {
    
    it('returns an Array', () => {
      let match = service.matchLHS;
      let matches = match('10cm');
      expect(Array.isArray(matches)).toBe(true);
    });

    it('matches numbers followed by letters', () => {
      let match = service.matchLHS;
      let matches = match('32 miles');
      expect(matches.length > 0).toBe(true);
    });

    it('does not match an expression with only numbers', () => {
      expect(service.matchLHS('30'))
        .toBe(null);
    });

    it('does not match an expression with only letters', () => {
      expect(service.matchLHS('cm'))
        .toBe(null);
    });

    it(`returns match array of length 6, 
        representing full match and 5 capture groups`, () => {
        let matches = service.matchLHS('1ft');
        expect(matches.length).toEqual(6);
    });

    it('matches an expression that has a decimal', () => {
      let matches = service.matchLHS('32.312cm');
      expect(matches.length > 0).toBe(true);
    });

    it('matches units followed by a number representing an exponent', () => {
      let matches = service.matchLHS('34.3mm2');
      expect(matches.length > 0).toBe(true);
    });

    it('captures exponents in the fourth index', () => {
      let matches = service.matchLHS('2m3');
      let matches2 = service.matchLHS('24.2cm2');
      let matches3 = service.matchLHS('20m2/s');
      expect(matches[3]).toBe('3');
      expect(matches2[3]).toBe('2');
      expect(matches3[3]).toBe('2');
      console.log(matches3);
    });

    it('matches compound units of measure e.g. m/s', () => {
      let matches = service.matchLHS('30m/s2');
      expect(matches.length > 0).toBe(true);
    });

  });

  describe('matchRHS method', () => {
    // it(`returns match array of length 6, 
    //   representing full match and 5 capture groups`, () => {
    //   let matches = service.matchLHS('ft');
    //   expect(matches.length).toEqual(6);
    // });
    
    it('matches an expression with only letters', () => {
      expect(service.matchRHS('cm'))
        .not.toEqual(null);
        console.log(service.matchRHS('cm'))
    });

  });
});