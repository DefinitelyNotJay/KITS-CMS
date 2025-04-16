import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '$env/static/private';
import * as schema from '../../../drizzle/schema';


const poolConnection = mysql.createPool({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	multipleStatements: true,
	// ตัวเลือกเพิ่มเติมสำหรับการเชื่อมต่อ MariaDB
	enableKeepAlive: true,
	keepAliveInitialDelay: 30000,
	connectTimeout: 60000, // 60 วินาที
	queueLimit: 0, // 0 = ไม่จำกัดคิว
	// ระบุให้ชัดเจนว่าเป็น MariaDB
	charset: 'utf8mb4',
	supportBigNumbers: true,
	dateStrings: true,
});

export const db = drizzle(poolConnection, { schema, mode: 'default' });
