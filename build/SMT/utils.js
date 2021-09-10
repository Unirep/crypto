"use strict";
exports.__esModule = true;
exports.keccak256 = exports.add0x = exports.remove0x = exports.bufToHexString = void 0;
var ethers_1 = require("ethers");
var bufToHexString = function (buf) {
    return '0x' + buf.toString('hex');
};
exports.bufToHexString = bufToHexString;
/**
 * Removes "0x" from start of a string if it exists.
 * @param str String to modify.
 * @returns the string without "0x".
 */
var remove0x = function (str) {
    return str.startsWith('0x') ? str.slice(2) : str;
};
exports.remove0x = remove0x;
/**
 * Adds "0x" to the start of a string if necessary.
 * @param str String to modify.
 * @returns the string with "0x".
 */
var add0x = function (str) {
    return str.startsWith('0x') ? str : '0x' + str;
};
exports.add0x = add0x;
/**
 * Computes the keccak256 hash of a value.
 * @param value Value to hash
 * @returns the hash of the value.
 */
var keccak256 = function (value) {
    var preimage = (0, exports.add0x)(value);
    return (0, exports.remove0x)(ethers_1.ethers.utils.keccak256(preimage));
};
exports.keccak256 = keccak256;
//# sourceMappingURL=utils.js.map