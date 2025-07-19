/*
  Warnings:

  - You are about to drop the column `id_rol` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Rol` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[description]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_rol_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "id_rol",
ADD COLUMN     "id_role" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Rol";

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_description_key" ON "Product"("description");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
