/*
  Warnings:

  - You are about to drop the column `interval` on the `doctor_config` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_doctor_config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "doctor_id" INTEGER NOT NULL,
    "appts_per_hour" TEXT,
    "start_interval_time" DATETIME,
    "end_interval_time" DATETIME,
    "start_time" DATETIME,
    "end_time" DATETIME,
    CONSTRAINT "doctor_config_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_doctor_config" ("appts_per_hour", "doctor_id", "end_time", "id", "start_time") SELECT "appts_per_hour", "doctor_id", "end_time", "id", "start_time" FROM "doctor_config";
DROP TABLE "doctor_config";
ALTER TABLE "new_doctor_config" RENAME TO "doctor_config";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
