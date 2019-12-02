"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const capabilities_1 = require("./capabilities");
const Bematech_1 = require("./profile/Bematech");
const Epson_1 = require("./profile/Epson");
const ControliD_1 = require("./profile/ControliD");
const Daruma_1 = require("./profile/Daruma");
const Dataregis_1 = require("./profile/Dataregis");
const Diebold_1 = require("./profile/Diebold");
const Elgin_1 = require("./profile/Elgin");
const Generic_1 = require("./profile/Generic");
const Perto_1 = require("./profile/Perto");
const Sweda_1 = require("./profile/Sweda");
const cache = new Map();
class Model {
    constructor(model) {
        if (typeof model === 'string') {
            this._profile = this.instance(Model.EXPAND(model));
        }
        else {
            this._profile = model;
        }
    }
    instance(capability) {
        switch (capability.profile) {
            case 'bematech':
                return new Bematech_1.default(capability);
            case 'controlid':
                return new ControliD_1.default(capability);
            case 'daruma':
                return new Daruma_1.default(capability);
            case 'dataregis':
                return new Dataregis_1.default(capability);
            case 'diebold':
                return new Diebold_1.default(capability);
            case 'elgin':
                return new Elgin_1.default(capability);
            case 'generic':
                return new Generic_1.default(capability);
            case 'perto':
                return new Perto_1.default(capability);
            case 'sweda':
                return new Sweda_1.default(capability);
            default:
                return new Epson_1.default(capability);
        }
    }
    static ASSIGN_DEFINED(target, ...others) {
        others.forEach((other) => {
            Object.keys(other).forEach((key) => {
                if (other[key] !== undefined) {
                    target[key] = other[key];
                }
            });
        });
        return target;
    }
    static EXPAND(model) {
        let capability = {
            model,
            profile: undefined,
            brand: undefined,
            columns: undefined,
            fonts: undefined,
            codepage: undefined,
            codepages: undefined
        };
        if (!(model in capabilities_1.default.models)) {
            throw new Error(`Printer model "${model}" not supported`);
        }
        if (cache.has(model)) {
            return cache.get(model);
        }
        let profile = capabilities_1.default.models[model];
        if (typeof profile === 'string') {
            capability['profile'] = profile;
            profile = capabilities_1.default.profiles[profile];
        }
        Model.ASSIGN_DEFINED(capability, Model.ASSIGN_DEFINED({}, profile, capability));
        while ('profile' in profile) {
            profile = capabilities_1.default.profiles[profile['profile']];
            Model.ASSIGN_DEFINED(capability, Model.ASSIGN_DEFINED({}, profile, capability));
        }
        capability.codepages = Object.keys(capability.codepages).map((code) => ({
            code,
            command: capability.codepages[code],
        }));
        cache.set(model, capability);
        return capability;
    }
    static ALL() {
        return Object.keys(capabilities_1.default.models).map((key) => Model.EXPAND(key));
    }
    get name() {
        return this._profile.name;
    }
    get profile() {
        return this._profile;
    }
}
exports.default = Model;
//# sourceMappingURL=Model.js.map