import { db } from '$lib/db/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const courseId = params.courseId;
	const course = await db.query.courses.findFirst({
		where: (courses, { eq }) => eq(courses.id, Number(courseId)),
	});

	return { course };
}) satisfies PageServerLoad;
