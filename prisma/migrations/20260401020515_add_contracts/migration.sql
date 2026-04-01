-- CreateTable
CREATE TABLE "contracts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contractNumber" INTEGER,
    "customerId" TEXT,
    "customerName" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "contractType" TEXT,
    "contractYear" INTEGER,
    "extraCodeDRAC" TEXT,
    "deliveryLocation" TEXT,
    "totalValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "generalBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "productPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "productValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "servicePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "serviceValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reserved" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reserveBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reservedProduct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "usedProduct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reservedService" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "usedService" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contract_items" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ctoAcronym" TEXT,
    "ctoName" TEXT,
    "productPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "servicePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reserved" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "productReserve" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "usedProduct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "productBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "serviceReserve" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "usedService" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "serviceBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ctoCategory" TEXT,
    "contractId" TEXT NOT NULL,

    CONSTRAINT "contract_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_items" ADD CONSTRAINT "contract_items_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
