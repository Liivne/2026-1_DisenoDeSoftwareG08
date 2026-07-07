/*
  Warnings:

  - You are about to drop the column `citaId` on the `VaccinationRecord` table. All the data in the column will be lost.
  - You are about to drop the `Cita` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[appointmentId]` on the table `VaccinationRecord` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appointmentId` to the `VaccinationRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."AppointmentStatus" ADD VALUE 'EN_PROCESO';
ALTER TYPE "public"."AppointmentStatus" ADD VALUE 'AUSENTE';

-- DropForeignKey
ALTER TABLE "public"."Cita" DROP CONSTRAINT "Cita_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Cita" DROP CONSTRAINT "Cita_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Cita" DROP CONSTRAINT "Cita_vaccinationPointId_fkey";

-- DropForeignKey
ALTER TABLE "public"."VaccinationRecord" DROP CONSTRAINT "VaccinationRecord_citaId_fkey";

-- DropIndex
DROP INDEX "public"."VaccinationRecord_citaId_key";

-- AlterTable
ALTER TABLE "public"."VaccinationRecord" DROP COLUMN "citaId",
ADD COLUMN     "appointmentId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Cita";

-- CreateTable
CREATE TABLE "public"."Appointment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "vaccinationPointId" INTEGER NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "status" "public"."AppointmentStatus" NOT NULL DEFAULT 'PENDIENTE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VaccinationRecord_appointmentId_key" ON "public"."VaccinationRecord"("appointmentId");

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "public"."Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_vaccinationPointId_fkey" FOREIGN KEY ("vaccinationPointId") REFERENCES "public"."VaccinationPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VaccinationRecord" ADD CONSTRAINT "VaccinationRecord_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
