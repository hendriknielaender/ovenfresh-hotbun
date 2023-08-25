import type { InferModel } from "drizzle-orm";
import {
  foreignKey,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const project = sqliteTable(
  "Project",
  {
    id: text("id").primaryKey(),
    createdAt: integer("createdAt", { mode: "timestamp" }).default(
      "CURRENT_TIMESTAMP",
    ),
    organizationId: text("organizationId"),
    userId: text("userId"),
    name: text("name"),
    tier: text("tier").default("FREE"),
    url: text("url"),
  },
  (project) => ({
    organizationIdx: uniqueIndex("organizationIdx").on(project.organizationId),
    userIdIdx: uniqueIndex("userIdIdx").on(project.userId),
  }),
);

export type Project = InferModel<typeof project>;

export const customer = sqliteTable("Customer", {
  id: text("id").primaryKey(),
  stripeId: text("stripeId").unique(),
  subscriptionId: text("subscriptionId"),
  clerkUserId: text("clerkUserId"),
  clerkOrganizationId: text("clerkOrganizationId"),
  name: text("name"),
  plan: text("plan"),
  paidUntil: integer("paidUntil", { mode: "timestamp" }),
  endsAt: integer("endsAt", { mode: "timestamp" }),
});

export type Customer = InferModel<typeof customer>;

export const apiKey = sqliteTable("ApiKey", {
  id: text("id").primaryKey(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(
    "CURRENT_TIMESTAMP",
  ),
  expiresAt: integer("expiresAt", { mode: "timestamp" }),
  lastUsed: integer("lastUsed", { mode: "timestamp" }),
  revokedAt: integer("revokedAt", { mode: "timestamp" }),
  projectId: text("projectId"),
  clerkUserId: text("clerkUserId"),
  name: text("name").default("Secret Key"),
  key: text("key").unique(),
});

export type ApiKey = InferModel<typeof apiKey>;

export const ingestion = sqliteTable("Ingestion", {
  id: text("id").primaryKey(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(
    "CURRENT_TIMESTAMP",
  ),
  projectId: text("projectId"),
  apiKeyId: text("apiKeyId"),
  schema: text("schema"),
  hash: text("hash"),
  parent: text("parent"),
  origin: text("origin"),
});

export type Ingestion = InferModel<typeof ingestion>;
