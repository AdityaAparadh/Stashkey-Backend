import type { IUser } from "./IUser";

/**
 * @interface IUpdate
 * An update is a record of changes made to the vault by the user. Useful for storing update history and possibly perform rollbacks.
 */

export interface IUpdate extends Document {
  /**
   * References IUser
   * @type {IUser}
   */

  user: IUser;

  /**
   * The timestamp of the update
   * @type {Date}
   * @example  2024-08-01T12:00:00.000Z
   */
  timestamp: Date;

  /**
   * The SHA-256 hash of the update
   * @type {string}
   * @example 0x1a2b3c4d5e6f7a8b9c0d
   */
  checksum: string;
}
