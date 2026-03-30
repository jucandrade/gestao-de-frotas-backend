-- CreateTable
CREATE TABLE "suppliers" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "tradeName" TEXT,
    "supplierType" TEXT,
    "contactName" TEXT,
    "quotationContact" TEXT,
    "personType" TEXT,
    "cnpj" TEXT,
    "cpf" TEXT,
    "stateRegistration" TEXT,
    "ieIndicator" TEXT,
    "rg" TEXT,
    "zipCode" TEXT,
    "streetType" TEXT,
    "street" TEXT,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT,
    "city" TEXT,
    "state" TEXT,
    "stateName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "phone2" TEXT,
    "mobile" TEXT,
    "fax" TEXT,
    "paymentCondition" TEXT,
    "paymentDescription" TEXT,
    "discountPercentage" DOUBLE PRECISION,
    "site" TEXT,
    "observations" TEXT,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_contacts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sequence" INTEGER,
    "name" TEXT NOT NULL,
    "positionCode" TEXT,
    "positionDescription" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "supplierId" TEXT NOT NULL,

    CONSTRAINT "supplier_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_cnpj_key" ON "suppliers"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_cpf_key" ON "suppliers"("cpf");

-- AddForeignKey
ALTER TABLE "supplier_contacts" ADD CONSTRAINT "supplier_contacts_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
