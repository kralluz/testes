-- CreateTable
CREATE TABLE "appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patient_name" TEXT,
    "patient_phone" TEXT,
    "doctor_id" INTEGER NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "appointment" DATETIME,
    "status" TEXT,
    CONSTRAINT "appointment_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointment_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exam" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "doctor_id" INTEGER NOT NULL,
    CONSTRAINT "exam_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "doctor_config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "doctor_id" INTEGER NOT NULL,
    "appts_per_hour" TEXT,
    "interval" TEXT,
    "start_time" DATETIME,
    "end_time" DATETIME,
    CONSTRAINT "doctor_config_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "doctor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "specialty" TEXT
);
