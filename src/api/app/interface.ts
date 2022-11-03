export interface IApp {
  /**
   * Application version.
   */
  Version: () => Promise<string>;
}
