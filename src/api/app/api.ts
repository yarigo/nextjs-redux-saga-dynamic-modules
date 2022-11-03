import { IApp } from './interface';

export const app: IApp = {
  async Version() {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        return resolve('1.0.1');
      }, 500);
    });
  },
};
