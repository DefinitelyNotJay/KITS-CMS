-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `adonis_schema` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`batch` int(11) NOT NULL,
	`migration_time` timestamp DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `adonis_schema_versions` (
	`version` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `alter_files_title_nullables` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `api_tokens` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int(10) unsigned DEFAULT 'NULL',
	`name` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`token` varchar(64) NOT NULL,
	`expires_at` timestamp DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	CONSTRAINT `api_tokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `assignments` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text DEFAULT 'NULL',
	`due_date` timestamp DEFAULT 'NULL',
	`is_allow_late` tinyint(1) NOT NULL DEFAULT 0,
	`max_score` int(11) NOT NULL,
	`max_rubric_score` int(11) DEFAULT 'NULL',
	`lesson_id` int(10) unsigned NOT NULL,
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL',
	`order` int(11) DEFAULT 1,
	`user_id` int(10) unsigned DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(255) DEFAULT 'NULL',
	`title_th` varchar(255) DEFAULT 'NULL',
	`short_description` varchar(255) DEFAULT 'NULL',
	`short_description_th` varchar(255) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	`is_visible` tinyint(1) DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `certificates` (
	`id` varchar(255) DEFAULT 'NULL',
	`user_id` int(10) unsigned NOT NULL,
	`course_id` int(10) unsigned NOT NULL,
	`base_file_name` varchar(1024) DEFAULT 'NULL',
	`image_file` varchar(1024) DEFAULT 'NULL',
	`pdf_file` varchar(1024) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	CONSTRAINT `certificates_user_id_course_id_unique` UNIQUE(`user_id`,`course_id`)
);
--> statement-breakpoint
CREATE TABLE `certificate_templates` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(512) DEFAULT 'NULL',
	`template_file` varchar(1024) NOT NULL,
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `classrooms` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'current_timestamp()',
	CONSTRAINT `classrooms_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `clos` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL',
	`course_id` int(10) unsigned DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `clo_assignments` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`clo_id` int(10) unsigned NOT NULL,
	`assignment_id` int(10) unsigned NOT NULL,
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL',
	CONSTRAINT `clo_assignments_clo_id_assignment_id_unique` UNIQUE(`clo_id`,`assignment_id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`language` varchar(255) NOT NULL DEFAULT '''th-TH''',
	`description` text DEFAULT 'NULL',
	`owner_id` int(10) unsigned DEFAULT 'NULL',
	`category_id` int(10) unsigned DEFAULT 'NULL',
	`price` double NOT NULL DEFAULT 0,
	`is_visible` tinyint(1) NOT NULL DEFAULT 0,
	`is_enrollable` tinyint(1) NOT NULL DEFAULT 0,
	`is_recommended` tinyint(1) NOT NULL DEFAULT 0,
	`is_limit_student` tinyint(1) NOT NULL DEFAULT 0,
	`max_students` int(11) DEFAULT 'NULL',
	`start_enroll` datetime DEFAULT 'NULL',
	`end_enroll` datetime DEFAULT 'NULL',
	`learning_method` enum('onsite','online') DEFAULT 'NULL',
	`status` varchar(255) DEFAULT '''created''',
	`type` enum('normal','corporate','kmitl') DEFAULT 'NULL',
	`poster_image` varchar(255) DEFAULT 'NULL',
	`preview_video` varchar(255) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	`is_kbtg` tinyint(1) DEFAULT 'NULL',
	`price_kmitl` double DEFAULT 0,
	`short_description` varchar(512) DEFAULT 'NULL',
	`organization` varchar(255) DEFAULT 'NULL',
	`certificate_template_id` int(10) unsigned DEFAULT 'NULL',
	`is_published` tinyint(1) NOT NULL DEFAULT 0,
	`major` enum('it','dsba','ait') DEFAULT 'NULL',
	`track` varchar(255) DEFAULT 'NULL',
	`term` varchar(255) DEFAULT 'NULL',
	`year` int(11) DEFAULT 'NULL',
	`is_public` tinyint(1) NOT NULL DEFAULT 0,
	`code` varchar(255) DEFAULT 'NULL',
	`credit` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `courses_instructors` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`course_id` int(10) unsigned DEFAULT 'NULL',
	`instructor_id` int(10) unsigned DEFAULT 'NULL',
	`status` enum('active','inactive') DEFAULT '''active''',
	`joined_at` timestamp DEFAULT 'current_timestamp()',
	`last_viewed_at` datetime DEFAULT 'NULL',
	CONSTRAINT `courses_instructors_course_id_instructor_id_unique` UNIQUE(`course_id`,`instructor_id`)
);
--> statement-breakpoint
CREATE TABLE `courses_tas` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`course_id` int(10) unsigned DEFAULT 'NULL',
	`user_id` int(10) unsigned DEFAULT 'NULL',
	`status` enum('active','inactive') DEFAULT '''active''',
	`joined_at` timestamp DEFAULT 'current_timestamp()',
	CONSTRAINT `courses_tas_course_id_user_id_unique` UNIQUE(`course_id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `course_permissions` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`course_id` int(10) unsigned DEFAULT 'NULL',
	`user_id` int(10) unsigned DEFAULT 'NULL',
	`permission_id` int(10) unsigned DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `course_progresses` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
	`resource_group_id` int(10) unsigned NOT NULL,
	`is_done` tinyint(1) NOT NULL DEFAULT 0,
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	CONSTRAINT `course_progresses_user_id_resource_group_id_unique` UNIQUE(`user_id`,`resource_group_id`)
);
--> statement-breakpoint
CREATE TABLE `course_questionnaires` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
	`course_id` int(10) unsigned NOT NULL,
	`answer` longtext NOT NULL,
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	`allow_usage` tinyint(1) DEFAULT 0,
	`allow_name_usage` tinyint(1) DEFAULT 0,
	CONSTRAINT `course_questionnaires_user_id_course_id_unique` UNIQUE(`user_id`,`course_id`),
	CONSTRAINT `answer` CHECK(json_valid(`answer`))
);
--> statement-breakpoint
CREATE TABLE `course_ratings` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
	`course_id` int(10) unsigned NOT NULL,
	`rating` smallint(6) NOT NULL,
	`review` text DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `course_schedules` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`course_id` int(10) unsigned DEFAULT 'NULL',
	`classroom_id` int(10) unsigned DEFAULT 'NULL',
	`day` enum('Mon','Tue','Wed','Thu','Fri','Sat','Sun') NOT NULL,
	`start_time` time NOT NULL,
	`end_time` time NOT NULL,
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `enrolls` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
	`course_id` int(10) unsigned NOT NULL,
	`purchase_id` int(10) unsigned DEFAULT 'NULL',
	`is_passed` tinyint(1) NOT NULL DEFAULT 0,
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	`last_viewed_at` timestamp DEFAULT 'NULL',
	CONSTRAINT `enrolls_user_id_course_id_unique` UNIQUE(`user_id`,`course_id`)
);
--> statement-breakpoint
CREATE TABLE `entity_files` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`file_id` int(10) unsigned NOT NULL,
	`order` int(11) NOT NULL DEFAULT 0,
	`entity_type` enum('course','lesson','assignment','submission') NOT NULL,
	`entity_id` int(11) NOT NULL,
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `files` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`title` longtext DEFAULT 'NULL',
	`path` varchar(255) NOT NULL,
	`type` enum('post','video','link','pdf','docx','course') DEFAULT 'NULL',
	`size` int(11) NOT NULL,
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `instructors` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`email` varchar(255) DEFAULT 'NULL',
	`first_name` varchar(255) DEFAULT 'NULL',
	`last_name` varchar(255) DEFAULT 'NULL',
	`first_name_th` varchar(255) DEFAULT 'NULL',
	`last_name_th` varchar(255) DEFAULT 'NULL',
	`description` varchar(512) DEFAULT 'NULL',
	`description_th` varchar(512) DEFAULT 'NULL',
	`profile_image` varchar(255) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	`position` varchar(255) DEFAULT 'NULL',
	`position_th` varchar(255) DEFAULT 'NULL',
	`order` int(11) DEFAULT 0,
	`is_visible` tinyint(1) DEFAULT 1,
	`user_id` int(10) unsigned DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `interests` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
	`category_id` int(10) unsigned NOT NULL,
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`order` int(11) NOT NULL,
	`course_id` int(10) unsigned NOT NULL,
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `payment_transactions` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`purchase_id` int(10) unsigned DEFAULT 'NULL',
	`amount` float(10,2) NOT NULL,
	`is_approved` tinyint(1) NOT NULL DEFAULT 0,
	`approved_by` varchar(255) DEFAULT 'NULL',
	`approved_user_id` int(10) unsigned DEFAULT 'NULL',
	`approved_at` datetime DEFAULT 'NULL',
	`payment_slip` longtext DEFAULT 'NULL',
	`payment_attributes` longtext DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	CONSTRAINT `payment_slip` CHECK(json_valid(`payment_slip`)),
	CONSTRAINT `payment_attributes` CHECK(json_valid(`payment_attributes`))
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`name_th` varchar(255) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT 'NULL',
	`first_name` varchar(255) DEFAULT 'NULL',
	`last_name` varchar(255) DEFAULT 'NULL',
	`email` varchar(255) DEFAULT 'NULL',
	`bio` text DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL',
	`major` enum('it','dsba','ait') DEFAULT 'NULL',
	`year` int(11) DEFAULT 'NULL',
	`track` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `profiles_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `purchases` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
	`course_id` int(10) unsigned NOT NULL,
	`status` enum('wait','paid','cancel','failed') DEFAULT '''wait''',
	`amount` float(10,2) NOT NULL,
	`is_approved` tinyint(1) NOT NULL DEFAULT 0,
	`approved_by` varchar(255) DEFAULT 'NULL',
	`approved_at` datetime DEFAULT 'NULL',
	`approved_by_user_id` int(10) unsigned DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	`payment_method` varchar(255) DEFAULT '''''',
	`gb_pay_ref_no` varchar(255) DEFAULT 'NULL',
	`reference_no` varchar(255) DEFAULT 'NULL',
	`transaction_body` longtext DEFAULT 'NULL',
	`gb_barcode` varchar(511) DEFAULT 'NULL',
	CONSTRAINT `purchases_reference_no_unique` UNIQUE(`reference_no`),
	CONSTRAINT `transaction_body` CHECK(json_valid(`transaction_body`))
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`resource_group_id` int(10) unsigned DEFAULT 'NULL',
	`title` varchar(255) NOT NULL,
	`description` longtext DEFAULT 'NULL',
	`pass_percentage` float(8,2) DEFAULT 'NULL',
	`max_submission` int(11) NOT NULL DEFAULT 0,
	`type` enum('pre_test','post_test') DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `quiz_choices` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`quiz_question_id` int(10) unsigned DEFAULT 'NULL',
	`title` varchar(255) DEFAULT 'NULL',
	`description` varchar(255) DEFAULT 'NULL',
	`is_correct` tinyint(1) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `quiz_grades` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`is_graded` tinyint(1) NOT NULL DEFAULT 0,
	`user_id` int(10) unsigned DEFAULT 'NULL',
	`quiz_id` int(10) unsigned DEFAULT 'NULL',
	`is_passed` tinyint(1) NOT NULL DEFAULT 0,
	`corrected_questions` int(11) NOT NULL DEFAULT 0,
	`all_questions` int(11) NOT NULL DEFAULT 0,
	`score` float(10,2) NOT NULL DEFAULT 0,
	`max_score` float(10,2) NOT NULL DEFAULT 0,
	`submission` longtext DEFAULT 'NULL',
	`remark` varchar(2048) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	CONSTRAINT `submission` CHECK(json_valid(`submission`))
);
--> statement-breakpoint
CREATE TABLE `quiz_questions` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`quiz_id` int(10) unsigned DEFAULT 'NULL',
	`type` varchar(255) NOT NULL DEFAULT '''single''',
	`order` int(11) NOT NULL DEFAULT 0,
	`title` varchar(255) NOT NULL,
	`description` longtext DEFAULT 'NULL',
	`score` float(10,2) NOT NULL DEFAULT 0,
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `resources` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`resource_group_id` int(10) unsigned DEFAULT 'NULL',
	`order` int(11) NOT NULL DEFAULT 0,
	`title` varchar(255) NOT NULL,
	`description` text DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `resource_groups` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`course_id` int(10) unsigned DEFAULT 'NULL',
	`instructor_id` int(10) unsigned DEFAULT 'NULL',
	`title` varchar(255) NOT NULL,
	`short_description` varchar(255) DEFAULT 'NULL',
	`description` longtext DEFAULT 'NULL',
	`is_free_trial` tinyint(1) NOT NULL DEFAULT 0,
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	`order` int(11) NOT NULL DEFAULT 0,
	`is_available` tinyint(1) DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`course_id` int(10) unsigned DEFAULT 'NULL',
	`name` varchar(255) NOT NULL,
	`review` varchar(1024) DEFAULT 'NULL',
	`score` int(1) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`role_id` int(10) unsigned NOT NULL,
	`permission_id` int(10) unsigned NOT NULL,
	CONSTRAINT `role_permissions_role_id_permission_id_unique` UNIQUE(`role_id`,`permission_id`)
);
--> statement-breakpoint
CREATE TABLE `role_users` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
	`role_id` int(10) unsigned NOT NULL,
	CONSTRAINT `role_users_role_id_user_id_unique` UNIQUE(`role_id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `rubric_scores` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(255) DEFAULT 'NULL',
	`score` int(11) NOT NULL,
	`clo_id` int(10) unsigned NOT NULL,
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `rubric_score_submission` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`rubric_score_id` int(10) unsigned DEFAULT 'NULL',
	`submission_id` int(10) unsigned DEFAULT 'NULL',
	CONSTRAINT `rubric_score_submission_rubric_score_id_submission_id_unique` UNIQUE(`rubric_score_id`,`submission_id`)
);
--> statement-breakpoint
CREATE TABLE `sections` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`resource_group_id` int(10) unsigned NOT NULL,
	`title` varchar(255) NOT NULL,
	`type` enum('text','quiz','video_yt','video_streaming_kmitl','video_streamable','lg_c') DEFAULT 'NULL',
	`quiz_id` int(10) unsigned DEFAULT 'NULL',
	`video` varchar(1024) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`attachments` longtext DEFAULT 'NULL',
	`meeting_link` varchar(255) DEFAULT 'NULL',
	`order` int(11) NOT NULL DEFAULT 0,
	`is_available` tinyint(1) DEFAULT 1,
	`video_qualities` longtext NOT NULL DEFAULT '''[]''',
	CONSTRAINT `sections_quiz_id_unique` UNIQUE(`quiz_id`),
	CONSTRAINT `attachments` CHECK(json_valid(`attachments`)),
	CONSTRAINT `video_qualities` CHECK(json_valid(`video_qualities`))
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`major` enum('it','dsba','ait') DEFAULT 'NULL',
	`track` varchar(255) DEFAULT 'NULL',
	`year` int(11) DEFAULT 'NULL',
	`user_id` int(10) unsigned DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`assignment_id` int(10) unsigned NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
	`rubric_score_id` int(10) unsigned DEFAULT 'NULL',
	`status` enum('assigned','submitted','graded','missing','late','revision') DEFAULT '''assigned''',
	`score` int(11) DEFAULT 'NULL',
	`created_at` timestamp DEFAULT 'NULL',
	`updated_at` timestamp DEFAULT 'NULL',
	`submitted_at` datetime DEFAULT 'NULL',
	`rubric_score` decimal(10,2) DEFAULT '0.00'
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(180) NOT NULL,
	`remember_me_token` varchar(255) DEFAULT 'NULL',
	`role` enum('normal','admin','instructor','student') DEFAULT 'NULL',
	`status` enum('normal','alumni','internal_kmitl') DEFAULT '''normal''',
	`dob` date DEFAULT 'NULL',
	`prefix` varchar(255) DEFAULT 'NULL',
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`prefix_th` varchar(255) DEFAULT 'NULL',
	`first_name_th` varchar(255) DEFAULT 'NULL',
	`last_name_th` varchar(255) DEFAULT 'NULL',
	`phone_number` varchar(12) DEFAULT 'NULL',
	`google_id` varchar(255) DEFAULT 'NULL',
	`profile_image` varchar(255) DEFAULT 'NULL',
	`is_verified` tinyint(1) NOT NULL DEFAULT 0,
	`is_kmitl` tinyint(1) NOT NULL DEFAULT 0,
	`is_kbtg` tinyint(1) NOT NULL DEFAULT 0,
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL,
	`reset_password_token` varchar(2048) DEFAULT 'NULL',
	`reset_password_token_at` datetime DEFAULT 'NULL',
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `users_watched_sections` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int(10) unsigned DEFAULT 'NULL',
	`section_id` int(10) unsigned DEFAULT 'NULL',
	`last_watched_at` datetime DEFAULT 'current_timestamp()',
	`created_at` timestamp DEFAULT 'current_timestamp()',
	`updated_at` timestamp DEFAULT 'NULL',
	CONSTRAINT `users_watched_sections_user_id_section_id_unique` UNIQUE(`user_id`,`section_id`)
);
--> statement-breakpoint
ALTER TABLE `api_tokens` ADD CONSTRAINT `api_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `assignments` ADD CONSTRAINT `assignments_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `assignments` ADD CONSTRAINT `assignments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `clos` ADD CONSTRAINT `clos_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `clo_assignments` ADD CONSTRAINT `clo_assignments_assignment_id_foreign` FOREIGN KEY (`assignment_id`) REFERENCES `assignments`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `clo_assignments` ADD CONSTRAINT `clo_assignments_clo_id_foreign` FOREIGN KEY (`clo_id`) REFERENCES `clos`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `courses` ADD CONSTRAINT `courses_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `courses` ADD CONSTRAINT `courses_certificate_template_id_foreign` FOREIGN KEY (`certificate_template_id`) REFERENCES `certificate_templates`(`id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `courses` ADD CONSTRAINT `courses_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `courses_instructors` ADD CONSTRAINT `courses_instructors_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `courses_instructors` ADD CONSTRAINT `courses_instructors_instructor_id_foreign` FOREIGN KEY (`instructor_id`) REFERENCES `instructors`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `courses_tas` ADD CONSTRAINT `courses_tas_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `courses_tas` ADD CONSTRAINT `courses_tas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `course_permissions` ADD CONSTRAINT `course_permissions_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `course_permissions` ADD CONSTRAINT `course_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `course_permissions` ADD CONSTRAINT `course_permissions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `course_progresses` ADD CONSTRAINT `course_progresses_resource_group_id_foreign` FOREIGN KEY (`resource_group_id`) REFERENCES `resource_groups`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `course_progresses` ADD CONSTRAINT `course_progresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `course_questionnaires` ADD CONSTRAINT `course_questionnaires_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `course_questionnaires` ADD CONSTRAINT `course_questionnaires_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `course_ratings` ADD CONSTRAINT `course_ratings_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `course_ratings` ADD CONSTRAINT `course_ratings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `course_schedules` ADD CONSTRAINT `course_schedules_classroom_id_foreign` FOREIGN KEY (`classroom_id`) REFERENCES `classrooms`(`id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `course_schedules` ADD CONSTRAINT `course_schedules_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `enrolls` ADD CONSTRAINT `enrolls_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `enrolls` ADD CONSTRAINT `enrolls_purchase_id_foreign` FOREIGN KEY (`purchase_id`) REFERENCES `purchases`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `enrolls` ADD CONSTRAINT `enrolls_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `entity_files` ADD CONSTRAINT `entity_files_file_id_foreign` FOREIGN KEY (`file_id`) REFERENCES `files`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `instructors` ADD CONSTRAINT `instructors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `interests` ADD CONSTRAINT `interests_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `interests` ADD CONSTRAINT `interests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `payment_transactions` ADD CONSTRAINT `payment_transactions_approved_user_id_foreign` FOREIGN KEY (`approved_user_id`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `payment_transactions` ADD CONSTRAINT `payment_transactions_purchase_id_foreign` FOREIGN KEY (`purchase_id`) REFERENCES `purchases`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_approved_by_user_id_foreign` FOREIGN KEY (`approved_by_user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quizzes` ADD CONSTRAINT `quizzes_resource_group_id_foreign` FOREIGN KEY (`resource_group_id`) REFERENCES `resource_groups`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quiz_choices` ADD CONSTRAINT `quiz_choices_quiz_question_id_foreign` FOREIGN KEY (`quiz_question_id`) REFERENCES `quiz_questions`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quiz_grades` ADD CONSTRAINT `quiz_grades_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quiz_grades` ADD CONSTRAINT `quiz_grades_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `quiz_questions` ADD CONSTRAINT `quiz_questions_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `resources` ADD CONSTRAINT `resources_resource_group_id_foreign` FOREIGN KEY (`resource_group_id`) REFERENCES `resource_groups`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `resource_groups` ADD CONSTRAINT `resource_groups_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `resource_groups` ADD CONSTRAINT `resource_groups_instructor_id_foreign` FOREIGN KEY (`instructor_id`) REFERENCES `instructors`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `role_users` ADD CONSTRAINT `role_users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `role_users` ADD CONSTRAINT `role_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `rubric_scores` ADD CONSTRAINT `rubric_scores_clo_id_foreign` FOREIGN KEY (`clo_id`) REFERENCES `clos`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `rubric_score_submission` ADD CONSTRAINT `rubric_score_submission_rubric_score_id_foreign` FOREIGN KEY (`rubric_score_id`) REFERENCES `rubric_scores`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `rubric_score_submission` ADD CONSTRAINT `rubric_score_submission_submission_id_foreign` FOREIGN KEY (`submission_id`) REFERENCES `submissions`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sections` ADD CONSTRAINT `sections_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `sections` ADD CONSTRAINT `sections_resource_group_id_foreign` FOREIGN KEY (`resource_group_id`) REFERENCES `resource_groups`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `students` ADD CONSTRAINT `students_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `submissions` ADD CONSTRAINT `submissions_assignment_id_foreign` FOREIGN KEY (`assignment_id`) REFERENCES `assignments`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `submissions` ADD CONSTRAINT `submissions_rubric_score_id_foreign` FOREIGN KEY (`rubric_score_id`) REFERENCES `rubric_scores`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `submissions` ADD CONSTRAINT `submissions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `users_watched_sections` ADD CONSTRAINT `users_watched_sections_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `users_watched_sections` ADD CONSTRAINT `users_watched_sections_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;
*/