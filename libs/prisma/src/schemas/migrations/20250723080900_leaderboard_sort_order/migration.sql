-- 1. Create the new enum type
CREATE TYPE "LeaderboardType" AS ENUM ('LOW', 'HIGH', 'NONE');

-- 2. Add the new column temporarily
ALTER TABLE "Game"
ADD COLUMN "leaderboard_temp" "LeaderboardType" NOT NULL DEFAULT 'NONE';

-- 3. Migrate boolean values to enum (cast strings to enum type)
UPDATE "Game"
SET "leaderboard_temp" = CASE
  WHEN "leaderboard" = true THEN 'HIGH'::"LeaderboardType"
  ELSE 'NONE'::"LeaderboardType"
END;

-- 4. Drop the old boolean column
ALTER TABLE "Game" DROP COLUMN "leaderboard";

-- 5. Rename the temp column to the original name
ALTER TABLE "Game" RENAME COLUMN "leaderboard_temp" TO "leaderboard";
