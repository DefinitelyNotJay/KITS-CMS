import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar, timestamp, foreignKey, unique, text, double, datetime, mysqlEnum, check, longtext, smallint, time, float, decimal, date, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const adonisSchema = mysqlTable("adonis_schema", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	batch: int().notNull(),
	migrationTime: timestamp("migration_time", { mode: 'string' }).default('current_timestamp()'),
});

export const adonisSchemaVersions = mysqlTable("adonis_schema_versions", {
	version: int().notNull(),
});

export const alterFilesTitleNullables = mysqlTable("alter_files_title_nullables", {
	id: int().autoincrement().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const apiTokens = mysqlTable("api_tokens", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").default('NULL').references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	name: varchar({ length: 255 }).notNull(),
	type: varchar({ length: 255 }).notNull(),
	token: varchar({ length: 64 }).notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
},
(table) => [
	unique("api_tokens_token_unique").on(table.token),
]);

export const assignments = mysqlTable("assignments", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text().default('NULL'),
	dueDate: timestamp("due_date", { mode: 'string' }).default('NULL'),
	isAllowLate: tinyint("is_allow_late").default(0).notNull(),
	maxScore: int("max_score").notNull(),
	maxRubricScore: int("max_rubric_score").default('NULL'),
	lessonId: int("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	order: int().default(1),
	userId: int("user_id").default('NULL').references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
});

export const categories = mysqlTable("categories", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).default('NULL'),
	titleTh: varchar("title_th", { length: 255 }).default('NULL'),
	shortDescription: varchar("short_description", { length: 255 }).default('NULL'),
	shortDescriptionTh: varchar("short_description_th", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	isVisible: tinyint("is_visible").default(1),
});

export const certificates = mysqlTable("certificates", {
	id: varchar({ length: 255 }).default('NULL'),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	courseId: int("course_id").notNull().references(() => courses.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	baseFileName: varchar("base_file_name", { length: 1024 }).default('NULL'),
	imageFile: varchar("image_file", { length: 1024 }).default('NULL'),
	pdfFile: varchar("pdf_file", { length: 1024 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
},
(table) => [
	unique("certificates_user_id_course_id_unique").on(table.userId, table.courseId),
]);

export const certificateTemplates = mysqlTable("certificate_templates", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 512 }).default('NULL'),
	templateFile: varchar("template_file", { length: 1024 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const classrooms = mysqlTable("classrooms", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()'),
},
(table) => [
	unique("classrooms_name_unique").on(table.name),
]);

export const clos = mysqlTable("clos", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	courseId: int("course_id").default('NULL').references(() => courses.id, { onDelete: "cascade", onUpdate: "restrict" } ),
});

export const cloAssignments = mysqlTable("clo_assignments", {
	id: int().autoincrement().notNull(),
	cloId: int("clo_id").notNull().references(() => clos.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	assignmentId: int("assignment_id").notNull().references(() => assignments.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
},
(table) => [
	unique("clo_assignments_clo_id_assignment_id_unique").on(table.cloId, table.assignmentId),
]);

export const courses = mysqlTable("courses", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	language: varchar({ length: 255 }).default('\'th-TH\'').notNull(),
	description: text().default('NULL'),
	ownerId: int("owner_id").default('NULL').references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	categoryId: int("category_id").default('NULL').references(() => categories.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	price: double().notNull(),
	isVisible: tinyint("is_visible").default(0).notNull(),
	isEnrollable: tinyint("is_enrollable").default(0).notNull(),
	isRecommended: tinyint("is_recommended").default(0).notNull(),
	isLimitStudent: tinyint("is_limit_student").default(0).notNull(),
	maxStudents: int("max_students").default('NULL'),
	startEnroll: datetime("start_enroll", { mode: 'string'}).default('NULL'),
	endEnroll: datetime("end_enroll", { mode: 'string'}).default('NULL'),
	learningMethod: mysqlEnum("learning_method", ['onsite','online']).default('NULL'),
	status: varchar({ length: 255 }).default('\'created\''),
	type: mysqlEnum(['normal','corporate','kmitl']).default('NULL'),
	posterImage: varchar("poster_image", { length: 255 }).default('NULL'),
	previewVideo: varchar("preview_video", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	isKbtg: tinyint("is_kbtg").default('NULL'),
	priceKmitl: double("price_kmitl"),
	shortDescription: varchar("short_description", { length: 512 }).default('NULL'),
	organization: varchar({ length: 255 }).default('NULL'),
	certificateTemplateId: int("certificate_template_id").default('NULL').references(() => certificateTemplates.id, { onDelete: "set null", onUpdate: "restrict" } ),
	isPublished: tinyint("is_published").default(0).notNull(),
	major: mysqlEnum(['it','dsba','ait']).default('NULL'),
	track: varchar({ length: 255 }).default('NULL'),
	term: varchar({ length: 255 }).default('NULL'),
	year: int().default('NULL'),
	isPublic: tinyint("is_public").default(0).notNull(),
	code: varchar({ length: 255 }).default('NULL'),
	credit: int().notNull(),
});

export const coursesInstructors = mysqlTable("courses_instructors", {
	id: int().autoincrement().notNull(),
	courseId: int("course_id").default('NULL').references(() => courses.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	instructorId: int("instructor_id").default('NULL').references(() => instructors.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	status: mysqlEnum(['active','inactive']).default('\'active\''),
	joinedAt: timestamp("joined_at", { mode: 'string' }).default('current_timestamp()'),
	lastViewedAt: datetime("last_viewed_at", { mode: 'string'}).default('NULL'),
},
(table) => [
	unique("courses_instructors_course_id_instructor_id_unique").on(table.courseId, table.instructorId),
]);

export const coursesTas = mysqlTable("courses_tas", {
	id: int().autoincrement().notNull(),
	courseId: int("course_id").default('NULL').references(() => courses.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	userId: int("user_id").default('NULL').references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	status: mysqlEnum(['active','inactive']).default('\'active\''),
	joinedAt: timestamp("joined_at", { mode: 'string' }).default('current_timestamp()'),
},
(table) => [
	unique("courses_tas_course_id_user_id_unique").on(table.courseId, table.userId),
]);

export const coursePermissions = mysqlTable("course_permissions", {
	id: int().autoincrement().notNull(),
	courseId: int("course_id").default('NULL').references(() => courses.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	userId: int("user_id").default('NULL').references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	permissionId: int("permission_id").default('NULL').references(() => permissions.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
});

export const courseProgresses = mysqlTable("course_progresses", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	resourceGroupId: int("resource_group_id").notNull().references(() => resourceGroups.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	isDone: tinyint("is_done").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
},
(table) => [
	unique("course_progresses_user_id_resource_group_id_unique").on(table.userId, table.resourceGroupId),
]);

export const courseQuestionnaires = mysqlTable("course_questionnaires", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	courseId: int("course_id").notNull().references(() => courses.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	answer: longtext().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	allowUsage: tinyint("allow_usage").default(0),
	allowNameUsage: tinyint("allow_name_usage").default(0),
},
(table) => [
	unique("course_questionnaires_user_id_course_id_unique").on(table.userId, table.courseId),
	check("answer", sql`json_valid(\`answer\`)`),
]);

export const courseRatings = mysqlTable("course_ratings", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	courseId: int("course_id").notNull().references(() => courses.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	rating: smallint().notNull(),
	review: text().default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const courseSchedules = mysqlTable("course_schedules", {
	id: int().autoincrement().notNull(),
	courseId: int("course_id").default('NULL').references(() => courses.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	classroomId: int("classroom_id").default('NULL').references(() => classrooms.id, { onDelete: "set null", onUpdate: "restrict" } ),
	day: mysqlEnum(['Mon','Tue','Wed','Thu','Fri','Sat','Sun']).notNull(),
	startTime: time("start_time").notNull(),
	endTime: time("end_time").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()'),
});

export const enrolls = mysqlTable("enrolls", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	courseId: int("course_id").notNull().references(() => courses.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	purchaseId: int("purchase_id").default('NULL').references(() => purchases.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	isPassed: tinyint("is_passed").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	lastViewedAt: timestamp("last_viewed_at", { mode: 'string' }).default('NULL'),
},
(table) => [
	unique("enrolls_user_id_course_id_unique").on(table.userId, table.courseId),
]);

export const entityFiles = mysqlTable("entity_files", {
	id: int().autoincrement().notNull(),
	fileId: int("file_id").notNull().references(() => files.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	order: int().default(0).notNull(),
	entityType: mysqlEnum("entity_type", ['course','lesson','assignment','submission']).notNull(),
	entityId: int("entity_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const files = mysqlTable("files", {
	id: int().autoincrement().notNull(),
	title: longtext().default('NULL'),
	path: varchar({ length: 255 }).notNull(),
	type: mysqlEnum(['post','video','link','pdf','docx','course']).default('NULL'),
	size: int().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const instructors = mysqlTable("instructors", {
	id: int().autoincrement().notNull(),
	email: varchar({ length: 255 }).default('NULL'),
	firstName: varchar("first_name", { length: 255 }).default('NULL'),
	lastName: varchar("last_name", { length: 255 }).default('NULL'),
	firstNameTh: varchar("first_name_th", { length: 255 }).default('NULL'),
	lastNameTh: varchar("last_name_th", { length: 255 }).default('NULL'),
	description: varchar({ length: 512 }).default('NULL'),
	descriptionTh: varchar("description_th", { length: 512 }).default('NULL'),
	profileImage: varchar("profile_image", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	position: varchar({ length: 255 }).default('NULL'),
	positionTh: varchar("position_th", { length: 255 }).default('NULL'),
	order: int().default(0),
	isVisible: tinyint("is_visible").default(1),
	userId: int("user_id").default('NULL').references(() => users.id, { onDelete: "set null", onUpdate: "restrict" } ),
});

export const interests = mysqlTable("interests", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	categoryId: int("category_id").notNull().references(() => categories.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const lessons = mysqlTable("lessons", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	order: int().notNull(),
	courseId: int("course_id").notNull().references(() => courses.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const paymentTransactions = mysqlTable("payment_transactions", {
	id: int().autoincrement().notNull(),
	purchaseId: int("purchase_id").default('NULL').references(() => purchases.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	amount: float({ precision: 10, scale: 2 }).notNull(),
	isApproved: tinyint("is_approved").default(0).notNull(),
	approvedBy: varchar("approved_by", { length: 255 }).default('NULL'),
	approvedUserId: int("approved_user_id").default('NULL').references(() => users.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	approvedAt: datetime("approved_at", { mode: 'string'}).default('NULL'),
	paymentSlip: longtext("payment_slip").default('NULL'),
	paymentAttributes: longtext("payment_attributes").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
},
(table) => [
	check("payment_slip", sql`json_valid(\`payment_slip\`)`),
	check("payment_attributes", sql`json_valid(\`payment_attributes\`)`),
]);

export const permissions = mysqlTable("permissions", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	nameTh: varchar("name_th", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const profiles = mysqlTable("profiles", {
	id: int().autoincrement().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	firstName: varchar("first_name", { length: 255 }).default('NULL'),
	lastName: varchar("last_name", { length: 255 }).default('NULL'),
	email: varchar({ length: 255 }).default('NULL'),
	bio: text().default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	major: mysqlEnum(['it','dsba','ait']).default(sql`NULL`),
	year: int().default(sql`NULL`),
	track: varchar({ length: 255 }).default('NULL'),
},
(table) => [
	unique("profiles_email_unique").on(table.email),
]);

export const purchases = mysqlTable("purchases", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	courseId: int("course_id").notNull().references(() => courses.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	status: mysqlEnum(['wait','paid','cancel','failed']).default('\'wait\''),
	amount: float({ precision: 10, scale: 2 }).notNull(),
	isApproved: tinyint("is_approved").default(0).notNull(),
	approvedBy: varchar("approved_by", { length: 255 }).default('NULL'),
	approvedAt: datetime("approved_at", { mode: 'string'}).default('NULL'),
	approvedByUserId: int("approved_by_user_id").default('NULL').references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	paymentMethod: varchar("payment_method", { length: 255 }).default('\''),
	gbPayRefNo: varchar("gb_pay_ref_no", { length: 255 }).default('NULL'),
	referenceNo: varchar("reference_no", { length: 255 }).default('NULL'),
	transactionBody: longtext("transaction_body").default('NULL'),
	gbBarcode: varchar("gb_barcode", { length: 511 }).default('NULL'),
},
(table) => [
	unique("purchases_reference_no_unique").on(table.referenceNo),
	check("transaction_body", sql`json_valid(\`transaction_body\`)`),
]);

export const quizzes = mysqlTable("quizzes", {
	id: int().autoincrement().notNull(),
	resourceGroupId: int("resource_group_id").default('NULL').references(() => resourceGroups.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	title: varchar({ length: 255 }).notNull(),
	description: longtext().default('NULL'),
	passPercentage: float("pass_percentage"{ precision: 8, scale: 2 }).default('NULL'),
	maxSubmission: int("max_submission").default(0).notNull(),
	type: mysqlEnum(['pre_test','post_test']).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const quizChoices = mysqlTable("quiz_choices", {
	id: int().autoincrement().notNull(),
	quizQuestionId: int("quiz_question_id").default('NULL').references(() => quizQuestions.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	title: varchar({ length: 255 }).default('NULL'),
	description: varchar({ length: 255 }).default('NULL'),
	isCorrect: tinyint("is_correct").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const quizGrades = mysqlTable("quiz_grades", {
	id: int().autoincrement().notNull(),
	isGraded: tinyint("is_graded").default(0).notNull(),
	userId: int("user_id").default('NULL').references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	quizId: int("quiz_id").default('NULL').references(() => quizzes.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	isPassed: tinyint("is_passed").default(0).notNull(),
	correctedQuestions: int("corrected_questions").default(0).notNull(),
	allQuestions: int("all_questions").default(0).notNull(),
	score: float({ precision: 10, scale: 2 }).notNull(),
	maxScore: float("max_score"{ precision: 10, scale: 2 }).notNull(),
	submission: longtext().default('NULL'),
	remark: varchar({ length: 2048 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
},
(table) => [
	check("submission", sql`json_valid(\`submission\`)`),
]);

export const quizQuestions = mysqlTable("quiz_questions", {
	id: int().autoincrement().notNull(),
	quizId: int("quiz_id").default('NULL').references(() => quizzes.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	type: varchar({ length: 255 }).default('\'single\'').notNull(),
	order: int().default(0).notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: longtext().default('NULL'),
	score: float({ precision: 10, scale: 2 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const resources = mysqlTable("resources", {
	id: int().autoincrement().notNull(),
	resourceGroupId: int("resource_group_id").default('NULL').references(() => resourceGroups.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	order: int().default(0).notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text().default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const resourceGroups = mysqlTable("resource_groups", {
	id: int().autoincrement().notNull(),
	courseId: int("course_id").default('NULL').references(() => courses.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	instructorId: int("instructor_id").default('NULL').references(() => instructors.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	title: varchar({ length: 255 }).notNull(),
	shortDescription: varchar("short_description", { length: 255 }).default('NULL'),
	description: longtext().default('NULL'),
	isFreeTrial: tinyint("is_free_trial").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	order: int().default(0).notNull(),
	isAvailable: tinyint("is_available").default(1),
});

export const reviews = mysqlTable("reviews", {
	id: int().autoincrement().notNull(),
	courseId: int("course_id").default('NULL').references(() => courses.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	name: varchar({ length: 255 }).notNull(),
	review: varchar({ length: 1024 }).default('NULL'),
	score: int().default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const roles = mysqlTable("roles", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const rolePermissions = mysqlTable("role_permissions", {
	id: int().autoincrement().notNull(),
	roleId: int("role_id").notNull().references(() => roles.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	permissionId: int("permission_id").notNull().references(() => permissions.id, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => [
	unique("role_permissions_role_id_permission_id_unique").on(table.roleId, table.permissionId),
]);

export const roleUsers = mysqlTable("role_users", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	roleId: int("role_id").notNull().references(() => roles.id, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => [
	unique("role_users_role_id_user_id_unique").on(table.roleId, table.userId),
]);

export const rubricScores = mysqlTable("rubric_scores", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }).default('NULL'),
	score: int().notNull(),
	cloId: int("clo_id").notNull().references(() => clos.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const rubricScoreSubmission = mysqlTable("rubric_score_submission", {
	id: int().autoincrement().notNull(),
	rubricScoreId: int("rubric_score_id").default('NULL').references(() => rubricScores.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	submissionId: int("submission_id").default('NULL').references(() => submissions.id, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => [
	unique("rubric_score_submission_rubric_score_id_submission_id_unique").on(table.rubricScoreId, table.submissionId),
]);

export const sections = mysqlTable("sections", {
	id: int().autoincrement().notNull(),
	resourceGroupId: int("resource_group_id").notNull().references(() => resourceGroups.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	title: varchar({ length: 255 }).notNull(),
	type: mysqlEnum(['text','quiz','video_yt','video_streaming_kmitl','video_streamable','lg_c']).default('NULL'),
	quizId: int("quiz_id").default('NULL').references(() => quizzes.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	video: varchar({ length: 1024 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	description: text().default('NULL'),
	attachments: longtext().default('NULL'),
	meetingLink: varchar("meeting_link", { length: 255 }).default('NULL'),
	order: int().default(0).notNull(),
	isAvailable: tinyint("is_available").default(1),
	videoQualities: longtext("video_qualities").default('''[]''').notNull(),
},
(table) => [
	unique("sections_quiz_id_unique").on(table.quizId),
	check("attachments", sql`json_valid(\`attachments\`)`),
	check("video_qualities", sql`json_valid(\`video_qualities\`)`),
]);

export const students = mysqlTable("students", {
	id: int().autoincrement().notNull(),
	major: mysqlEnum(['it','dsba','ait']).default('NULL'),
	track: varchar({ length: 255 }).default('NULL'),
	year: int().default('NULL'),
	userId: int("user_id").default('NULL').references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const submissions = mysqlTable("submissions", {
	id: int().autoincrement().notNull(),
	assignmentId: int("assignment_id").notNull().references(() => assignments.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	rubricScoreId: int("rubric_score_id").default('NULL').references(() => rubricScores.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	status: mysqlEnum(['assigned','submitted','graded','missing','late','revision']).default('\'assigned\''),
	score: int().default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('NULL'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
	submittedAt: datetime("submitted_at", { mode: 'string'}).default('NULL'),
	rubricScore: decimal("rubric_score", { precision: 10, scale: 2 }).default('0.00'),
});

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 180 }).notNull(),
	rememberMeToken: varchar("remember_me_token", { length: 255 }).default('NULL'),
	role: mysqlEnum(['normal','admin','instructor','student']).default('NULL'),
	status: mysqlEnum(['normal','alumni','internal_kmitl']).default('\'normal\''),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dob: date({ mode: 'string' }).default('NULL'),
	prefix: varchar({ length: 255 }).default('NULL'),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	lastName: varchar("last_name", { length: 255 }).notNull(),
	prefixTh: varchar("prefix_th", { length: 255 }).default('NULL'),
	firstNameTh: varchar("first_name_th", { length: 255 }).default('NULL'),
	lastNameTh: varchar("last_name_th", { length: 255 }).default('NULL'),
	phoneNumber: varchar("phone_number", { length: 12 }).default('NULL'),
	googleId: varchar("google_id", { length: 255 }).default('NULL'),
	profileImage: varchar("profile_image", { length: 255 }).default('NULL'),
	isVerified: tinyint("is_verified").default(0).notNull(),
	isKmitl: tinyint("is_kmitl").default(0).notNull(),
	isKbtg: tinyint("is_kbtg").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	resetPasswordToken: varchar("reset_password_token", { length: 2048 }).default('NULL'),
	resetPasswordTokenAt: datetime("reset_password_token_at", { mode: 'string'}).default('NULL'),
},
(table) => [
	unique("users_email_unique").on(table.email),
]);

export const usersWatchedSections = mysqlTable("users_watched_sections", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").default('NULL').references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	sectionId: int("section_id").default('NULL').references(() => sections.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	lastWatchedAt: datetime("last_watched_at", { mode: 'string'}).default('current_timestamp()'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
},
(table) => [
	unique("users_watched_sections_user_id_section_id_unique").on(table.userId, table.sectionId),
]);
