import { db } from '$lib/db/db';
import { title } from 'process';
import type { PageServerLoad } from './$types';
import z from 'zod';

const editSchema = z.object({
	title	: z.string().min(1, { message: 'Title is required' }),
	description: z.string().min(1, { message: 'Description is required' }),
	code: z.string().min(1, { message: 'Code is required' }),
	status: z.enum(['active', 'inactive', 'archive'], {
		required_error: 'Status is required',
		invalid_type_error: 'Status must be either draft or published',
	}),
	cost: z.number().min(0, { message: 'Cost must be a positive number' }),
	major: z.enum(['it', 'dsba', 'bit'], {
		required_error: 'Major is required',
		invalid_type_error: 'Major must be either CS, IT, or SE',
	}),
	track: z.string().min(1, { message: 'Track is required' }),
	year: z.number().min(1, { message: 'Year is required' }).max(4, { message: 'Year must be between 1 and 4' }),
	// posterImage: z.string().optional(),
})

export const load = (async ({ params }) => {
	const courseId = params.courseId;
	const course = await db.query.courses.findFirst({
		where: (courses, { eq }) => eq(courses.id, Number(courseId)),
	});

	return { course };
}) satisfies PageServerLoad;
