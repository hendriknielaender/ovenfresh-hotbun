import type { ColumnType } from "kysely";

import type { ProjectTier, SubscriptionPlan } from "./enums";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type ApiKey = {
  id: string;
  createdAt: Generated<Timestamp>;
  expiresAt: Timestamp | null;
  lastUsed: Timestamp | null;
  revokedAt: Timestamp | null;
  projectId: string;
  clerkUserId: string;
  name: Generated<string>;
  key: string;
};
export type Customer = {
  id: string;
  stripeId: string;
  subscriptionId: string | null;
  clerkUserId: string;
  clerkOrganizationId: string | null;
  name: string | null;
  plan: SubscriptionPlan | null;
  paidUntil: Timestamp | null;
  endsAt: Timestamp | null;
};
export type Ingestion = {
  id: string;
  createdAt: Generated<Timestamp>;
  projectId: string;
  apiKeyId: string;
  schema: unknown;
  hash: string;
  parent: string | null;
  origin: string;
};
export type Project = {
  id: string;
  createdAt: Generated<Timestamp>;
  organizationId: string | null;
  userId: string | null;
  name: string;
  tier: Generated<ProjectTier>;
  url: string | null;
};
export type DB = {
  ApiKey: ApiKey;
  Customer: Customer;
  Ingestion: Ingestion;
  Project: Project;
};
