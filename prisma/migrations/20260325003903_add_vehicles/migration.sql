-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "plate" TEXT NOT NULL,
    "chassis" TEXT,
    "prefix" TEXT,
    "manufacturer" TEXT,
    "model" TEXT,
    "year" INTEGER,
    "color" TEXT,
    "fuel" TEXT,
    "renavam" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Ativo',
    "customerId" TEXT,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_key" ON "vehicles"("plate");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
