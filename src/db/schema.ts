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
    url: text("url").notNull(),
    type: text("type").references(() => componentTypes.name),
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

export const componentTypes = pgTable(
  "component_types",
  {
    name: text("name").primaryKey(),
  },
  () => [
    pgPolicy("authenticated_component_types", {
      as: "permissive",
      to: authenticatedRole,
      for: "select",
    }),
  ],
).enableRLS();
