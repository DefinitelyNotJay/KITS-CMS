import { Config, defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

console.log('DB_HOST:', process.env.DB_HOST);

export default defineConfig({
	schema: './src/db/schema.ts', // ตำแหน่งที่จะสร้างไฟล์ schema
	out: './drizzle', // ตำแหน่งไฟล์ output ของ migrations (ถ้าใช้)
	dialect: 'mysql', // ใช้ MySQL
	dbCredentials: {
		host: process.env.DB_HOST || '10.0.15.22',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '1234',
		database: process.env.DB_NAME || 'lucid',
		port: Number(process.env.DB_PORT) || 3306,
	},
	// ตัวเลือกเพิ่มเติม
	verbose: true, // แสดงข้อมูลละเอียดระหว่างการทำงาน
	strict: false, // ใช้โหมดเข้มงวด
	tablesFilter: ['!migrations*', '!_*'], // กรองบางตาราง
});
