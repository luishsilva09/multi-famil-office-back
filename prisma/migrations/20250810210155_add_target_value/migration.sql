/*
  Warnings:

  - Added the required column `targetValue` to the `Goals` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "deadline" DATETIME NOT NULL,
    "targetValue" REAL NOT NULL,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "Goals_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Goals" ("clientId", "deadline", "id", "title") SELECT "clientId", "deadline", "id", "title" FROM "Goals";
DROP TABLE "Goals";
ALTER TABLE "new_Goals" RENAME TO "Goals";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
