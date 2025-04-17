import type { PageServerLoad } from './$types';
import { db } from '$lib/db/db';
import { superValidate } from 'sveltekit-superforms/server';
import { courses } from '../../../../drizzle/schema';
export const load = (async () => {
	
	const courses = await db.query.courses.findMany();
	return {
		courses
	};
}) satisfies PageServerLoad;