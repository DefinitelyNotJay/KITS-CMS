import { relations } from "drizzle-orm/relations";
import { users, apiTokens, lessons, assignments, courses, certificates, clos, cloAssignments, categories, certificateTemplates, coursesInstructors, instructors, coursesTas, coursePermissions, permissions, resourceGroups, courseProgresses, courseQuestionnaires, courseRatings, classrooms, courseSchedules, enrolls, purchases, files, entityFiles, interests, paymentTransactions, quizzes, quizQuestions, quizChoices, quizGrades, resources, reviews, rolePermissions, roles, roleUsers, rubricScores, rubricScoreSubmission, submissions, sections, students, usersWatchedSections } from "./schema";

export const apiTokensRelations = relations(apiTokens, ({one}) => ({
	user: one(users, {
		fields: [apiTokens.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	apiTokens: many(apiTokens),
	assignments: many(assignments),
	certificates: many(certificates),
	courses: many(courses),
	coursesTas: many(coursesTas),
	coursePermissions: many(coursePermissions),
	courseProgresses: many(courseProgresses),
	courseQuestionnaires: many(courseQuestionnaires),
	courseRatings: many(courseRatings),
	enrolls: many(enrolls),
	instructors: many(instructors),
	interests: many(interests),
	paymentTransactions: many(paymentTransactions),
	purchases_approvedByUserId: many(purchases, {
		relationName: "purchases_approvedByUserId_users_id"
	}),
	purchases_userId: many(purchases, {
		relationName: "purchases_userId_users_id"
	}),
	quizGrades: many(quizGrades),
	roleUsers: many(roleUsers),
	students: many(students),
	submissions: many(submissions),
	usersWatchedSections: many(usersWatchedSections),
}));

export const assignmentsRelations = relations(assignments, ({one, many}) => ({
	lesson: one(lessons, {
		fields: [assignments.lessonId],
		references: [lessons.id]
	}),
	user: one(users, {
		fields: [assignments.userId],
		references: [users.id]
	}),
	cloAssignments: many(cloAssignments),
	submissions: many(submissions),
}));

export const lessonsRelations = relations(lessons, ({one, many}) => ({
	assignments: many(assignments),
	course: one(courses, {
		fields: [lessons.courseId],
		references: [courses.id]
	}),
}));

export const certificatesRelations = relations(certificates, ({one}) => ({
	course: one(courses, {
		fields: [certificates.courseId],
		references: [courses.id]
	}),
	user: one(users, {
		fields: [certificates.userId],
		references: [users.id]
	}),
}));

export const coursesRelations = relations(courses, ({one, many}) => ({
	certificates: many(certificates),
	clos: many(clos),
	category: one(categories, {
		fields: [courses.categoryId],
		references: [categories.id]
	}),
	certificateTemplate: one(certificateTemplates, {
		fields: [courses.certificateTemplateId],
		references: [certificateTemplates.id]
	}),
	user: one(users, {
		fields: [courses.ownerId],
		references: [users.id]
	}),
	coursesInstructors: many(coursesInstructors),
	coursesTas: many(coursesTas),
	coursePermissions: many(coursePermissions),
	courseQuestionnaires: many(courseQuestionnaires),
	courseRatings: many(courseRatings),
	courseSchedules: many(courseSchedules),
	enrolls: many(enrolls),
	lessons: many(lessons),
	purchases: many(purchases),
	resourceGroups: many(resourceGroups),
	reviews: many(reviews),
}));

export const closRelations = relations(clos, ({one, many}) => ({
	course: one(courses, {
		fields: [clos.courseId],
		references: [courses.id]
	}),
	cloAssignments: many(cloAssignments),
	rubricScores: many(rubricScores),
}));

export const cloAssignmentsRelations = relations(cloAssignments, ({one}) => ({
	assignment: one(assignments, {
		fields: [cloAssignments.assignmentId],
		references: [assignments.id]
	}),
	clo: one(clos, {
		fields: [cloAssignments.cloId],
		references: [clos.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	courses: many(courses),
	interests: many(interests),
}));

export const certificateTemplatesRelations = relations(certificateTemplates, ({many}) => ({
	courses: many(courses),
}));

export const coursesInstructorsRelations = relations(coursesInstructors, ({one}) => ({
	course: one(courses, {
		fields: [coursesInstructors.courseId],
		references: [courses.id]
	}),
	instructor: one(instructors, {
		fields: [coursesInstructors.instructorId],
		references: [instructors.id]
	}),
}));

export const instructorsRelations = relations(instructors, ({one, many}) => ({
	coursesInstructors: many(coursesInstructors),
	user: one(users, {
		fields: [instructors.userId],
		references: [users.id]
	}),
	resourceGroups: many(resourceGroups),
}));

export const coursesTasRelations = relations(coursesTas, ({one}) => ({
	course: one(courses, {
		fields: [coursesTas.courseId],
		references: [courses.id]
	}),
	user: one(users, {
		fields: [coursesTas.userId],
		references: [users.id]
	}),
}));

export const coursePermissionsRelations = relations(coursePermissions, ({one}) => ({
	course: one(courses, {
		fields: [coursePermissions.courseId],
		references: [courses.id]
	}),
	permission: one(permissions, {
		fields: [coursePermissions.permissionId],
		references: [permissions.id]
	}),
	user: one(users, {
		fields: [coursePermissions.userId],
		references: [users.id]
	}),
}));

export const permissionsRelations = relations(permissions, ({many}) => ({
	coursePermissions: many(coursePermissions),
	rolePermissions: many(rolePermissions),
}));

export const courseProgressesRelations = relations(courseProgresses, ({one}) => ({
	resourceGroup: one(resourceGroups, {
		fields: [courseProgresses.resourceGroupId],
		references: [resourceGroups.id]
	}),
	user: one(users, {
		fields: [courseProgresses.userId],
		references: [users.id]
	}),
}));

export const resourceGroupsRelations = relations(resourceGroups, ({one, many}) => ({
	courseProgresses: many(courseProgresses),
	quizzes: many(quizzes),
	resources: many(resources),
	course: one(courses, {
		fields: [resourceGroups.courseId],
		references: [courses.id]
	}),
	instructor: one(instructors, {
		fields: [resourceGroups.instructorId],
		references: [instructors.id]
	}),
	sections: many(sections),
}));

export const courseQuestionnairesRelations = relations(courseQuestionnaires, ({one}) => ({
	course: one(courses, {
		fields: [courseQuestionnaires.courseId],
		references: [courses.id]
	}),
	user: one(users, {
		fields: [courseQuestionnaires.userId],
		references: [users.id]
	}),
}));

export const courseRatingsRelations = relations(courseRatings, ({one}) => ({
	course: one(courses, {
		fields: [courseRatings.courseId],
		references: [courses.id]
	}),
	user: one(users, {
		fields: [courseRatings.userId],
		references: [users.id]
	}),
}));

export const courseSchedulesRelations = relations(courseSchedules, ({one}) => ({
	classroom: one(classrooms, {
		fields: [courseSchedules.classroomId],
		references: [classrooms.id]
	}),
	course: one(courses, {
		fields: [courseSchedules.courseId],
		references: [courses.id]
	}),
}));

export const classroomsRelations = relations(classrooms, ({many}) => ({
	courseSchedules: many(courseSchedules),
}));

export const enrollsRelations = relations(enrolls, ({one}) => ({
	course: one(courses, {
		fields: [enrolls.courseId],
		references: [courses.id]
	}),
	purchase: one(purchases, {
		fields: [enrolls.purchaseId],
		references: [purchases.id]
	}),
	user: one(users, {
		fields: [enrolls.userId],
		references: [users.id]
	}),
}));

export const purchasesRelations = relations(purchases, ({one, many}) => ({
	enrolls: many(enrolls),
	paymentTransactions: many(paymentTransactions),
	user_approvedByUserId: one(users, {
		fields: [purchases.approvedByUserId],
		references: [users.id],
		relationName: "purchases_approvedByUserId_users_id"
	}),
	course: one(courses, {
		fields: [purchases.courseId],
		references: [courses.id]
	}),
	user_userId: one(users, {
		fields: [purchases.userId],
		references: [users.id],
		relationName: "purchases_userId_users_id"
	}),
}));

export const entityFilesRelations = relations(entityFiles, ({one}) => ({
	file: one(files, {
		fields: [entityFiles.fileId],
		references: [files.id]
	}),
}));

export const filesRelations = relations(files, ({many}) => ({
	entityFiles: many(entityFiles),
}));

export const interestsRelations = relations(interests, ({one}) => ({
	category: one(categories, {
		fields: [interests.categoryId],
		references: [categories.id]
	}),
	user: one(users, {
		fields: [interests.userId],
		references: [users.id]
	}),
}));

export const paymentTransactionsRelations = relations(paymentTransactions, ({one}) => ({
	user: one(users, {
		fields: [paymentTransactions.approvedUserId],
		references: [users.id]
	}),
	purchase: one(purchases, {
		fields: [paymentTransactions.purchaseId],
		references: [purchases.id]
	}),
}));

export const quizzesRelations = relations(quizzes, ({one, many}) => ({
	resourceGroup: one(resourceGroups, {
		fields: [quizzes.resourceGroupId],
		references: [resourceGroups.id]
	}),
	quizGrades: many(quizGrades),
	quizQuestions: many(quizQuestions),
	sections: many(sections),
}));

export const quizChoicesRelations = relations(quizChoices, ({one}) => ({
	quizQuestion: one(quizQuestions, {
		fields: [quizChoices.quizQuestionId],
		references: [quizQuestions.id]
	}),
}));

export const quizQuestionsRelations = relations(quizQuestions, ({one, many}) => ({
	quizChoices: many(quizChoices),
	quiz: one(quizzes, {
		fields: [quizQuestions.quizId],
		references: [quizzes.id]
	}),
}));

export const quizGradesRelations = relations(quizGrades, ({one}) => ({
	quiz: one(quizzes, {
		fields: [quizGrades.quizId],
		references: [quizzes.id]
	}),
	user: one(users, {
		fields: [quizGrades.userId],
		references: [users.id]
	}),
}));

export const resourcesRelations = relations(resources, ({one}) => ({
	resourceGroup: one(resourceGroups, {
		fields: [resources.resourceGroupId],
		references: [resourceGroups.id]
	}),
}));

export const reviewsRelations = relations(reviews, ({one}) => ({
	course: one(courses, {
		fields: [reviews.courseId],
		references: [courses.id]
	}),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({one}) => ({
	permission: one(permissions, {
		fields: [rolePermissions.permissionId],
		references: [permissions.id]
	}),
	role: one(roles, {
		fields: [rolePermissions.roleId],
		references: [roles.id]
	}),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	rolePermissions: many(rolePermissions),
	roleUsers: many(roleUsers),
}));

export const roleUsersRelations = relations(roleUsers, ({one}) => ({
	role: one(roles, {
		fields: [roleUsers.roleId],
		references: [roles.id]
	}),
	user: one(users, {
		fields: [roleUsers.userId],
		references: [users.id]
	}),
}));

export const rubricScoresRelations = relations(rubricScores, ({one, many}) => ({
	clo: one(clos, {
		fields: [rubricScores.cloId],
		references: [clos.id]
	}),
	rubricScoreSubmissions: many(rubricScoreSubmission),
	submissions: many(submissions),
}));

export const rubricScoreSubmissionRelations = relations(rubricScoreSubmission, ({one}) => ({
	rubricScore: one(rubricScores, {
		fields: [rubricScoreSubmission.rubricScoreId],
		references: [rubricScores.id]
	}),
	submission: one(submissions, {
		fields: [rubricScoreSubmission.submissionId],
		references: [submissions.id]
	}),
}));

export const submissionsRelations = relations(submissions, ({one, many}) => ({
	rubricScoreSubmissions: many(rubricScoreSubmission),
	assignment: one(assignments, {
		fields: [submissions.assignmentId],
		references: [assignments.id]
	}),
	rubricScore: one(rubricScores, {
		fields: [submissions.rubricScoreId],
		references: [rubricScores.id]
	}),
	user: one(users, {
		fields: [submissions.userId],
		references: [users.id]
	}),
}));

export const sectionsRelations = relations(sections, ({one, many}) => ({
	quiz: one(quizzes, {
		fields: [sections.quizId],
		references: [quizzes.id]
	}),
	resourceGroup: one(resourceGroups, {
		fields: [sections.resourceGroupId],
		references: [resourceGroups.id]
	}),
	usersWatchedSections: many(usersWatchedSections),
}));

export const studentsRelations = relations(students, ({one}) => ({
	user: one(users, {
		fields: [students.userId],
		references: [users.id]
	}),
}));

export const usersWatchedSectionsRelations = relations(usersWatchedSections, ({one}) => ({
	section: one(sections, {
		fields: [usersWatchedSections.sectionId],
		references: [sections.id]
	}),
	user: one(users, {
		fields: [usersWatchedSections.userId],
		references: [users.id]
	}),
}));