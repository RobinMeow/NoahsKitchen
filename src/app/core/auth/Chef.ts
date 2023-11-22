import { DecodedToken } from './DecodedToken';
import { TokenKey } from './TokenKey';

export class Chef {
  static Constraints = {
    name: {
      minLength: 3,
      maxLength: 20,
    },
    password: {
      minLength: 4,
      maxLength: 50,
    },
  };

  readonly name: string;

  constructor(decodedToken: DecodedToken) {
    this.name = decodedToken[TokenKey.Name];
  }
}
