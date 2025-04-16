import { db } from '$lib/db/db';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;
