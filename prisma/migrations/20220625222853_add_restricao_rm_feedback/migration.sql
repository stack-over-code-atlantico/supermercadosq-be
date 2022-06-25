/*
  Warnings:

  - You are about to drop the column `feedbacks_comentarios` on the `comentario` table. All the data in the column will be lost.
  - You are about to drop the column `feedbacks_produtos` on the `produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comentario" DROP COLUMN "feedbacks_comentarios";

-- AlterTable
ALTER TABLE "produto" DROP COLUMN "feedbacks_produtos",
ADD COLUMN     "alergia" TEXT,
ADD COLUMN     "descricao" TEXT;

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "restricao_alimenticia" SET DATA TYPE VARCHAR(255);
