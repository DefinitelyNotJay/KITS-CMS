import type { PageServerLoad } from './$types';
import { db } from '$lib/db/db';
import { superValidate } from 'sveltekit-superforms/server';
import { course } from '../../../../drizzle/schema';
export const load = (async () => {
	const form = await superValidate(course);
	const courses = await db.query.courses.findMany();
	return {
		courses,
        form
	};
}) satisfies PageServerLoad;


export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, course);
        if (!form.valid) {
            return { form };
        }
        const courseData = form.data;
        await db.insert(course).values(courseData);
        return { form };
    }
};