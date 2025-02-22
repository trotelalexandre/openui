import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  pgPolicy,
  uuid,
} from "drizzle-orm/pg-core";
import { authenticatedRole, authUsers, authUid } from "drizzle-orm/supabase";

export const components = pgTable(
  "components",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    code: text("code").notNull(),
    userId: uuid("user_id").references(() => authUsers.id),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    pgPolicy("authenticated_components", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
      using: sql`${table.userId}::uuid = ${authUid}`,
    }),
  ],
).enableRLS();
