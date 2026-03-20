-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyCode" TEXT,
    "companyName" TEXT NOT NULL,
    "tradeName" TEXT,
    "empCodFW" TEXT,
    "branchCode" TEXT,
    "cnpj" TEXT NOT NULL,
    "stateRegistration" TEXT,
    "municipalRegistration" TEXT,
    "cnae" TEXT,
    "taxRegime" TEXT,
    "zipCode" TEXT,
    "streetType" TEXT,
    "streetName" TEXT,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT,
    "cityCode" TEXT,
    "cityName" TEXT,
    "state" TEXT,
    "stateCode" TEXT,
    "country" TEXT,
    "fullAddress" TEXT,
    "phone" TEXT,
    "fax" TEXT,
    "reportPhones" TEXT,
    "logoType" TEXT,
    "logo" TEXT,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");
