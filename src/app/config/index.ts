import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    db_uri: process.env.DB_URI,
    default_password: process.env.DEFAULT_PASS,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
}