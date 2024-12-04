import type { IUser } from "./IUser";

/**
 * @interface ITrustee
 */

export interface ITrustee {
  /**
   * References IUser
   * @type {IUser}
   */
  user: IUser;

  /**
   * The username of trustee
   * @type {string}
   * @example myfriend123
   */
  username: string;

  /**
   * The secret passphrase of the trustee, used to gain access to encrypted vault.
   * Assigned by the system.
   * This is NOT the actual key share of Shamir' Secret Sharing Scheme, and cannot be used for Vault Decryption.
   * string of size 14 consisting of lowercase alphabets and numbers
   * @type {string}
   * @example b12lkaclkzfoqp
   */
  access_secret: string;
}
