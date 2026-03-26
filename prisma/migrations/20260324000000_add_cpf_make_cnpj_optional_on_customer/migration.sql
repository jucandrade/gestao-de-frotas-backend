-- AlterTable: make cnpj optional and add cpf (unique, optional) on customers
ALTER TABLE "customers" ALTER COLUMN "cnpj" DROP NOT NULL;
ALTER TABLE "customers" ADD COLUMN "cpf" TEXT;
CREATE UNIQUE INDEX "customers_cpf_key" ON "customers"("cpf");
