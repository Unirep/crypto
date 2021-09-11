"use strict";
exports.__esModule = true;
exports.newWrappedPoseidonT3Hash = exports.wrappedPoseidonT3Hash = exports.unstringifyBigInts = exports.stringifyBigInts = exports.hashLeftRight = exports.hashOne = exports.hash5 = exports.genRandomSalt = exports.SNARK_FIELD_SIZE = exports.NOTHING_UP_MY_SLEEVE = void 0;
var ethers_1 = require("ethers");
var maci_crypto_1 = require("maci-crypto");
exports.SNARK_FIELD_SIZE = maci_crypto_1.SNARK_FIELD_SIZE;
exports.genRandomSalt = maci_crypto_1.genRandomSalt;
exports.hash5 = maci_crypto_1.hash5;
exports.hashOne = maci_crypto_1.hashOne;
exports.hashLeftRight = maci_crypto_1.hashLeftRight;
exports.stringifyBigInts = maci_crypto_1.stringifyBigInts;
exports.unstringifyBigInts = maci_crypto_1.unstringifyBigInts;
// A nothing-up-my-sleeve zero value
// Should be equal to 16916383162496104613127564537688207714240750091683495371401923915264313510848
var NOTHING_UP_MY_SLEEVE = BigInt(ethers_1.ethers.utils.solidityKeccak256(['bytes'], [ethers_1.ethers.utils.toUtf8Bytes('Unirep')])) % maci_crypto_1.SNARK_FIELD_SIZE;
exports.NOTHING_UP_MY_SLEEVE = NOTHING_UP_MY_SLEEVE;
var newWrappedPoseidonT3Hash = function () {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    var result;
    if (elements.length == 1) {
        result = maci_crypto_1.hashOne(elements[0]);
    }
    else if (elements.length == 2) {
        result = maci_crypto_1.hashLeftRight(elements[0], elements[1]);
    }
    else {
        throw new Error("elements length should not greater than 2, got " + elements.length);
    }
    return result;
};
exports.newWrappedPoseidonT3Hash = newWrappedPoseidonT3Hash;
var wrappedPoseidonT3Hash = function () {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    var result;
    if (elements.length == 1) {
        result = maci_crypto_1.hashOne(elements[0]);
    }
    else if (elements.length == 2) {
        result = maci_crypto_1.hashLeftRight(elements[0], elements[1]);
    }
    else {
        throw new Error("elements length should not greater than 2, got " + elements.length);
    }
    return ethers_1.ethers.utils.hexZeroPad('0x' + result.toString(16), 32);
};
exports.wrappedPoseidonT3Hash = wrappedPoseidonT3Hash;
