import { Profile } from './profile';
import capabilities, { Capability } from './capabilities';
import Bematech from './profile/Bematech';
import Epson from './profile/Epson';
import ControliD from './profile/ControliD';
import Daruma from './profile/Daruma';
import Dataregis from './profile/Dataregis';
import Diebold from './profile/Diebold';
import Elgin from './profile/Elgin';
import Generic from './profile/Generic';
import Perto from './profile/Perto';
import Sweda from './profile/Sweda';

const cache = new Map<string, Capability>();

export default class Model {
  private _profile: Profile;

  static async initialise(model: string) {
    const profile = await Model.initialiseProfile(
      Model.EXPAND(Model.FIND(model)),
    );
    return new Model(profile);
  }

  constructor(model: Profile) {
    this._profile = model;
  }

  private static async initialiseProfile(
    capability: Capability,
  ): Promise<Profile> {
    switch (capability.profile) {
      case 'bematech':
        return Profile.initialise(Bematech, capability);
      case 'controlid':
        return Profile.initialise(ControliD, capability);
      case 'daruma':
        return Profile.initialise(Daruma, capability);
      case 'dataregis':
        return Profile.initialise(Dataregis, capability);
      case 'diebold':
        return Profile.initialise(Diebold, capability);
      case 'elgin':
        return Profile.initialise(Elgin, capability);
      case 'generic':
        return Profile.initialise(Generic, capability);
      case 'perto':
        return Profile.initialise(Perto, capability);
      case 'sweda':
        return Profile.initialise(Sweda, capability);
      default:
        return Profile.initialise(Epson, capability);
    }
  }

  static ASSIGN_DEFINED(target: object, ...others: object[]): object {
    others.forEach((other: object) => {
      Object.keys(other).forEach((key: string) => {
        if (other[key] !== undefined) {
          target[key] = other[key];
        }
      });
    });
    return target;
  }

  static FIND(model: string): object {
    const profile = capabilities.models.find(
      (profile: object) => profile['model'] == model,
    );
    if (!profile) {
      throw new Error(`Printer model "${model}" not supported`);
    }
    return profile;
  }

  static EXPAND(profile: object): Capability {
    const capability = {
      model: undefined,
      profile: undefined,
      brand: undefined,
      columns: undefined,
      fonts: undefined,
      codepage: undefined,
      codepages: undefined,
    };
    if (cache.has(profile['model'])) {
      return cache.get(profile['model']);
    }
    Model.ASSIGN_DEFINED(
      capability,
      Model.ASSIGN_DEFINED({}, profile, capability),
    );
    while ('profile' in profile) {
      profile = capabilities.profiles[profile['profile']];
      Model.ASSIGN_DEFINED(
        capability,
        Model.ASSIGN_DEFINED({}, profile, capability),
      );
    }
    capability.codepages = Object.keys(capability.codepages).map(
      (code: string) => ({
        code,
        command: capability.codepages[code],
      }),
    );
    cache.set(capability.model, capability);
    return capability;
  }

  static ALL(): Capability[] {
    return capabilities.models.map((profile: object) => Model.EXPAND(profile));
  }

  get name(): string {
    return this._profile.name;
  }

  get profile(): Profile {
    return this._profile;
  }
}
