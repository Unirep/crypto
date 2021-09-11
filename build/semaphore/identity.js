"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.unSerialiseIdentity = exports.serialiseIdentity = exports.genIdentityCommitment = exports.genIdentity = exports.genPubKey = void 0;
var circomlib = __importStar(require("circomlib"));
var bigintConversion = __importStar(require("bigint-conversion"));
var crypto = __importStar(require("crypto"));
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
//# sourceMappingURL=identity.js.map