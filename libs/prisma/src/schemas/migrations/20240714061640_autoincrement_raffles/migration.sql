-- AlterTable
CREATE SEQUENCE raffle_id_seq;
ALTER TABLE "Raffle" ALTER COLUMN "id" SET DEFAULT nextval('raffle_id_seq');
ALTER SEQUENCE raffle_id_seq OWNED BY "Raffle"."id";
