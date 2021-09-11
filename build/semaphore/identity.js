"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unSerialiseIdentity = exports.serialiseIdentity = exports.genIdentityCommitment = exports.genIdentity = exports.genPubKey = void 0;
const circomlib = require("circomlib");
const bigintConversion = require("bigint-conversion");
const crypto = require("crypto");
const genRandomBuffer = (numBytes = 32) => {
    return crypto.randomBytes(numBytes);
};
const genPubKey = (privKey) => {
    const pubKey = circomlib.eddsa.prv2pub(privKey);
    return pubKey;
};
exports.genPubKey = genPubKey;
const genEddsaKeyPair = (privKey = genRandomBuffer()) => {
    const pubKey = genPubKey(privKey);
    return { pubKey, privKey };
};
const genIdentity = (privKey = genRandomBuffer(32)) => {
    // The identity nullifier and identity trapdoor are separate random 31-byte
    // values
    return {
        keypair: genEddsaKeyPair(privKey),
        identityNullifier: bigintConversion.bufToBigint(genRandomBuffer(31)),
        identityTrapdoor: bigintConversion.bufToBigint(genRandomBuffer(31)),
    };
};
exports.genIdentity = genIdentity;
const serializeIdentity = (identity) => {
    const data = [
        identity.keypair.privKey.toString('hex'),
        identity.identityNullifier.toString(16),
        identity.identityTrapdoor.toString(16),
    ];
    return JSON.stringify(data);
};
const unSerializeIdentity = (serialisedIdentity) => {
    const data = JSON.parse(serialisedIdentity);
    return {
        keypair: genEddsaKeyPair(Buffer.from(data[0], 'hex')),
        identityNullifier: bigintConversion.hexToBigint(data[1]),
        identityTrapdoor: bigintConversion.hexToBigint(data[2]),
    };
};
const serialiseIdentity = serializeIdentity;
exports.serialiseIdentity = serialiseIdentity;
const unSerialiseIdentity = unSerializeIdentity;
exports.unSerialiseIdentity = unSerialiseIdentity;
const genIdentityCommitment = (identity) => {
    return circomlib.poseidon([
        circomlib.babyJub.mulPointEscalar(identity.keypair.pubKey, 8)[0],
        identity.identityNullifier,
        identity.identityTrapdoor,
    ]);
};
exports.genIdentityCommitment = genIdentityCommitment;
