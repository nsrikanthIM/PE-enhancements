import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const medicarePlans = pgTable("medicare_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  planName: text("plan_name").notNull(),
  carrier: text("carrier").notNull(),
  year: integer("year").notNull(),
  starRating: integer("star_rating").notNull(),
  monthlyPremium: decimal("monthly_premium", { precision: 10, scale: 2 }).notNull(),
  medicalDeductible: decimal("medical_deductible", { precision: 10, scale: 2 }).notNull(),
  outOfPocketMax: decimal("out_of_pocket_max", { precision: 10, scale: 2 }).notNull(),
  rxDrugDeductible: decimal("rx_drug_deductible", { precision: 10, scale: 2 }).notNull(),
  estimatedAnnualRxCost: decimal("estimated_annual_rx_cost", { precision: 10, scale: 2 }).notNull(),
  pharmaciesCovered: integer("pharmacies_covered").notNull(),
  doctorName: text("doctor_name"),
  matchScore: integer("match_score").notNull(),
  recommended: integer("recommended").notNull().default(0),
});

export const insertMedicarePlanSchema = createInsertSchema(medicarePlans).omit({
  id: true,
});

export type InsertMedicarePlan = z.infer<typeof insertMedicarePlanSchema>;
export type MedicarePlan = typeof medicarePlans.$inferSelect;
