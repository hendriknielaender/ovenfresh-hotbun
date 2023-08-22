export enum ProjectTier {
  FREE = "FREE",
  PRO = "PRO"
}

export enum SubscriptionPlan {
  FREE = "FREE",
  STANDARD = "STANDARD",
  PRO = "PRO"
}

const createProjectTable = `
CREATE TABLE IF NOT EXISTS Project (
    id TEXT PRIMARY KEY NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    organizationId TEXT,
    userId TEXT,
    name TEXT NOT NULL,
    tier TEXT DEFAULT 'FREE' CHECK (tier IN ('FREE', 'PRO')),
    url TEXT,
    INDEX (organizationId),
    INDEX (userId)
);
`;

const createCustomerTable = `
CREATE TABLE IF NOT EXISTS Customer (
    id TEXT PRIMARY KEY NOT NULL,
    stripeId TEXT UNIQUE NOT NULL,
    subscriptionId TEXT,
    clerkUserId TEXT NOT NULL,
    clerkOrganizationId TEXT,
    name TEXT,
    plan TEXT CHECK (plan IN ('FREE', 'STANDARD', 'PRO')),
    paidUntil DATETIME,
    endsAt DATETIME,
    INDEX (clerkUserId)
);
`;

const createApiKeyTable = `
CREATE TABLE IF NOT EXISTS ApiKey (
    id TEXT PRIMARY KEY NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    expiresAt DATETIME,
    lastUsed DATETIME,
    revokedAt DATETIME,
    projectId TEXT NOT NULL,
    clerkUserId TEXT NOT NULL,
    name TEXT DEFAULT 'Secret Key',
    key TEXT UNIQUE NOT NULL,
    INDEX (projectId)
);
`;

const createIngestionTable = `
CREATE TABLE IF NOT EXISTS Ingestion (
    id TEXT PRIMARY KEY NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    projectId TEXT NOT NULL,
    apiKeyId TEXT NOT NULL,
    schema TEXT NOT NULL,  -- SQLite does not have JSON type, so using TEXT
    hash TEXT NOT NULL,
    parent TEXT,
    origin TEXT NOT NULL,
    INDEX (projectId)
);
`;

export { createProjectTable, createCustomerTable, createApiKeyTable, createIngestionTable };

