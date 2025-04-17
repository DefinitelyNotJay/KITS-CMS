import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db/db';
import { courses } from '../../../../../drizzle/schema';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';

const createCourseSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	price: z.number().min(0, 'Price must be a positive number'),
	credit: z.number().min(1, 'Credit must be a positive number'),
});

export const load = (async () => {
	const createForm = await superValidate(zod(createCourseSchema));

	return { createForm };
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request }) => {
		const form = await superValidate(request, zod(createCourseSchema));
		if (!form.valid) {
			return { form };
		}
		const courseData = form.data;
		await db.insert(courses).values(courseData);
		return { form };
	},
};
