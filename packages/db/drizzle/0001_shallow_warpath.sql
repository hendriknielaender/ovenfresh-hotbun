CREATE TABLE `ApiKey` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT 'CURRENT_TIMESTAMP',
	`expiresAt` integer,
	`lastUsed` integer,
	`revokedAt` integer,
	`projectId` text,
	`clerkUserId` text,
	`name` text DEFAULT 'Secret Key',
	`key` text
);
--> statement-breakpoint
CREATE TABLE `Customer` (
	`id` text PRIMARY KEY NOT NULL,
	`stripeId` text,
	`subscriptionId` text,
	`clerkUserId` text,
	`clerkOrganizationId` text,
	`name` text,
	`plan` text,
	`paidUntil` integer,
	`endsAt` integer
);
--> statement-breakpoint
CREATE TABLE `Ingestion` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT 'CURRENT_TIMESTAMP',
	`projectId` text,
	`apiKeyId` text,
	`schema` text,
	`hash` text,
	`parent` text,
	`origin` text
);
--> statement-breakpoint
CREATE TABLE `Project` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT 'CURRENT_TIMESTAMP',
	`organizationId` text,
	`userId` text,
	`name` text,
	`tier` text DEFAULT 'FREE',
	`url` text
);
--> statement-breakpoint
DROP TABLE `customer`;--> statement-breakpoint
DROP TABLE `order_detail`;--> statement-breakpoint
DROP TABLE `employee`;--> statement-breakpoint
DROP TABLE `order`;--> statement-breakpoint
DROP TABLE `product`;--> statement-breakpoint
DROP TABLE `supplier`;--> statement-breakpoint
CREATE UNIQUE INDEX `ApiKey_key_unique` ON `ApiKey` (`key`);--> statement-breakpoint
CREATE UNIQUE INDEX `Customer_stripeId_unique` ON `Customer` (`stripeId`);--> statement-breakpoint
CREATE UNIQUE INDEX `organizationIdx` ON `Project` (`organizationId`);--> statement-breakpoint
CREATE UNIQUE INDEX `userIdIdx` ON `Project` (`userId`);