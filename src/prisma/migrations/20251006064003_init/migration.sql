-- CreateTable
CREATE TABLE "TransformerSubstation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransformerSubstation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransformerSubstation_name_key" ON "TransformerSubstation"("name");
