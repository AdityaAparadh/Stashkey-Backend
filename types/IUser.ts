/**
 * @interface IUser
 * The User interface defines the structure of the User model in database. Each user has their own encrypted vault, which they get access to after authentication
 */

export interface IUser extends Document {
  /**
   * The username of the user
   * @type {string}
   * @example user123
   */
  username: string;

  /**
   * The hashed password of the user. Used only for authentication. Cannot be used for decryption.
   * @type {string}
   * @example   $2b$10$
   */
  password: string;

  /**
   * The initialization vector for encryption. Updated by user on every update.
   * @type {string}
   */
  initialization_vector: string;

  /**
   * The SHA256 checksum of current encrypted vault data.
   * @type {string}
   */
  current_checksum: string;

  /**
   * Store the Lock value for data consistency. As the encrypted data cannot be incrementally updated, the entire file must be replaced every update.
   * Vault update requests must first aquire the lock, update and then release the lock
   * @type {boolean}
   */
  db_lock: boolean;

  /**
   * Timestamp of account creation
   * @type {Date}
   */
  account_created: Date;

  /**
   * Timestamp of last login
   * @type {Date}
   */
  last_login: Date;

  /**
   * Whether Shamir's Secret Sharing is enabled for the user
   * @type {boolean}
   */
  shamir_enabled: boolean;

  /**
   * The number of fragments to split the secret into
   * @type {number}
   */
  total_split: number;

  /**
   * The number of fragments required to reconstruct the vault master key
   * @type {number}
   */
  threshold_value: number;
}
