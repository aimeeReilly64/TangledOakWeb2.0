<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress_Tangled' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'EPF.t>cyjnl3$Fn25 ORlgCw7B^+;X1/yGh&faZH.jVI[z/enZQ7ZYPF,7,P?[D-' );
define( 'SECURE_AUTH_KEY',  '6eg~g;P5 <cGL&~O,ovk>|=y[_wL5^t?g4=_/kbBMzM|:,L@-uhxF>~df-CKm[dP' );
define( 'LOGGED_IN_KEY',    '@Vf*?St;}GZN1Xt$Fs+I1Jb7Q-AZ6eY4hfH8c%&`3VF[/izs%(TFysgs_h1K+-It' );
define( 'NONCE_KEY',        'SGdd:6NvP$z5MLB|%mWv|tcZK;I[HW[tm|4.ocyK=Z:/mCi,,zBx-TQSw6DX:Zxs' );
define( 'AUTH_SALT',        '|mB=UW+@F.Fiz9;$32kUd@r/e*^8=LZ@&!|hU-~^D3%Y7dnukbXJE0H0e44nahA`' );
define( 'SECURE_AUTH_SALT', 'FOl.tP4oMY7wetn(Rv9t^I&)q}pd;X]jI9~O|pOl+D^Xr+zZ/IsJM8eEW{lLg}[]' );
define( 'LOGGED_IN_SALT',   'Y6Z^y?gZ7C%IsL59O58bcFHl&Tf@W}|A#I087cf0Y(~6qqag2F#[aHn-x>MPV;{i' );
define( 'NONCE_SALT',       'YI+Ex#Tvq/~62>MG9Ej${1^r$2Au*`Iz,xB[D>2g@/wed|FHv9Pm] >kD*Bx0Y+&' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
