/*
  Warnings:

  - You are about to drop the column `id_aprovado` on the `comentario` table. All the data in the column will be lost.
  - You are about to drop the column `id_aprovado` on the `produto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comentario" DROP CONSTRAINT "comentario_id_aprovado_fkey";

-- DropForeignKey
ALTER TABLE "produto" DROP CONSTRAINT "produto_id_aprovado_fkey";

-- AlterTable
ALTER TABLE "comentario" DROP COLUMN "id_aprovado",
ADD COLUMN     "id_admin_relator" INTEGER;

-- AlterTable
ALTER TABLE "produto" DROP COLUMN "id_aprovado",
ADD COLUMN     "id_admin_relator" INTEGER;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_id_admin_relator_fkey" FOREIGN KEY ("id_admin_relator") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_id_admin_relator_fkey" FOREIGN KEY ("id_admin_relator") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
