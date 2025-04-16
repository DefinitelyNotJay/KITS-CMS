import { db } from '$lib/db/db';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const allUsers = await db.execute(sql`SELECT * FROM users`);
	return {};
}) satisfies PageServerLoad;
