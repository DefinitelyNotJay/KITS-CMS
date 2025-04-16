import type { PageServerLoad } from './$types';
import { db } from '$lib/db/db';
export const load = (async () => {
    const courses = await db.query.courses.findMany()
    return {
        courses
    };
}) satisfies PageServerLoad;