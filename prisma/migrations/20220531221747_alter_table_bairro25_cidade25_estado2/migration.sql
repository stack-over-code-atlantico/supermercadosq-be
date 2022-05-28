-- CreateTable
CREATE TABLE "comentario" (
    "id_comentario" SERIAL NOT NULL,
    "mensagem" TEXT NOT NULL,
    "status" VARCHAR(9),
    "data_comentario" DATE NOT NULL,
    "editado" BOOLEAN,
    "feedbacks_comentarios" INTEGER,
    "id_produto" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_aprovado" INTEGER,

    CONSTRAINT "comentario_pkey" PRIMARY KEY ("id_comentario")
);

-- CreateTable
CREATE TABLE "endereco" (
    "id_endereco" SERIAL NOT NULL,
    "logradouro" VARCHAR(100) NOT NULL,
    "numero" VARCHAR(5) NOT NULL,
    "bairro" VARCHAR(25) NOT NULL,
    "cidade" VARCHAR(25) NOT NULL,
    "estado" VARCHAR(2) NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id_endereco")
);

-- CreateTable
CREATE TABLE "produto" (
    "id_produto" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "ingredientes" TEXT NOT NULL,
    "imagem" BYTEA,
    "data_postagem" DATE NOT NULL,
    "editado" BOOLEAN,
    "status" VARCHAR(9),
    "feedbacks_produtos" INTEGER,
    "id_usuario" INTEGER NOT NULL,
    "id_aprovado" INTEGER,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id_produto")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "cpf_cnpj" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "senha" VARCHAR(50) NOT NULL,
    "nivel" VARCHAR(15),
    "nome_social" VARCHAR(50),
    "ativo" BOOLEAN NOT NULL,
    "telefone" VARCHAR(11),
    "restricao_alimenticia" VARCHAR(40),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cpf_cnpj_key" ON "usuario"("cpf_cnpj");

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produto"("id_produto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_id_aprovado_fkey" FOREIGN KEY ("id_aprovado") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_id_aprovado_fkey" FOREIGN KEY ("id_aprovado") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
