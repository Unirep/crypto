"use strict";
exports.__esModule = true;
exports.unSerialiseIdentity = exports.serialiseIdentity = exports.genIdentityCommitment = exports.genIdentity = exports.genPubKey = void 0;
var circomlib = require("circomlib");
var bigintConversion = require("bigint-conversion");
var crypto = require("crypto");
var genRandomBuffer = function (numBytes) {
    if (numBytes === void 0) { numBytes = 32; }
    return crypto.randomBytes(numBytes);
};
var genPubKey = function (privKey) {
    var pubKey = circomlib.eddsa.prv2pub(privKey);
    return pubKey;
};
exports.genPubKey = genPubKey;
var genEddsaKeyPair = function (privKey) {
    if (privKey === void 0) { privKey = genRandomBuffer(); }
    var pubKey = genPubKey(privKey);
    return { pubKey: pubKey, privKey: privKey };
};
var genIdentity = function (privKey) {
    if (privKey === void 0) { privKey = genRandomBuffer(32); }
    // The identity nullifier and identity trapdoor are separate random 31-byte
    // values
    return {
        keypair: genEddsaKeyPair(privKey),
        identityNullifier: bigintConversion.bufToBigint(genRandomBuffer(31)),
        identityTrapdoor: bigintConversion.bufToBigint(genRandomBuffer(31))
    };
};
exports.genIdentity = genIdentity;
var serializeIdentity = function (identity) {
    var data = [
        identity.keypair.privKey.toString('hex'),
        identity.identityNullifier.toString(16),
        identity.identityTrapdoor.toString(16),
    ];
    return JSON.stringify(data);
};
var unSerializeIdentity = function (serialisedIdentity) {
    var data = JSON.parse(serialisedIdentity);
    return {
        keypair: genEddsaKeyPair(Buffer.from(data[0], 'hex')),
        identityNullifier: bigintConversion.hexToBigint(data[1]),
        identityTrapdoor: bigintConversion.hexToBigint(data[2])
    };
};
var serialiseIdentity = serializeIdentity;
exports.serialiseIdentity = serialiseIdentity;
var unSerialiseIdentity = unSerializeIdentity;
exports.unSerialiseIdentity = unSerialiseIdentity;
var genIdentityCommitment = function (identity) {
    return circomlib.poseidon([
        circomlib.babyJub.mulPointEscalar(identity.keypair.pubKey, 8)[0],
        identity.identityNullifier,
        identity.identityTrapdoor,
    ]);
};
exports.genIdentityCommitment = genIdentityCommitment;
