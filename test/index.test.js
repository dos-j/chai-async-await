import asyncTest from './asyncTest';
import chai from 'chai';
import chaiAsyncAwait from '../index';

chai.use(chaiAsyncAwait);

const expect = chai.expect;

describe('chai-async-await', () => {

  it('should throw an error if the function isn`t an async function', asyncTest(async function () {

    let caughtErr;
    try {
      await expect(() => true).to.throwAsync(Error, /test/);
    } catch (err) {
      caughtErr = err;
    }

    expect(caughtErr).to.be.defined;
    expect(caughtErr.message).to.equal('throwAsync can only work with an async function which returns a promise');

  }));

  it('should throw an error if the function isn`t an async function and throws an error straight away', asyncTest(async function () {

    let caughtErr;
    try {
      await expect(() => {throw Error('test');}).to.throwAsync(Error, /test/);
    } catch (err) {
      caughtErr = err;
    }

    expect(caughtErr).to.be.defined;
    expect(caughtErr.message).to.contain('throwAsync can only work with async functions, the function threw an error before returning a promise:');
    expect(caughtErr.message).to.contain('test');

  }));

  it('should throw an error if the function is an async function and doesn`t throw an error', asyncTest(async function () {

    let caughtErr;
    try {
      await expect(async function () { return true; }).to.throwAsync(Error, /test/);
    } catch (err) {
      caughtErr = err;
    }

    expect(caughtErr).to.be.defined;
    expect(caughtErr.message).to.match(/expected .* to throw Error/);

  }));

  it('should do nothing if the correct error is thrown', asyncTest(async function () {

    let caughtErr;
    try {
      await expect(async function () {throw Error('test');}).to.throwAsync(Error, /test/);
    } catch (err) {
      caughtErr = err;
    }

    expect(caughtErr).not.to.be.defined;

  }));

});

