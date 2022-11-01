import { MigrationInterface, QueryRunner } from "typeorm";

export class createAttendance1667290903043 implements MigrationInterface {
    name = 'createAttendance1667290903043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."attendance_type_enum" AS ENUM('PRESENT', 'ABSENT')`);
        await queryRunner.query(`CREATE TABLE "attendance" ("id" SERIAL NOT NULL, "type" "public"."attendance_type_enum" NOT NULL DEFAULT 'ABSENT', "lesson_id" integer, "student_id" integer, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_231d6c08ae2a023f6e64fef4b5f" FOREIGN KEY ("lesson_id") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_6200532f3ef99f639a27bdcae7f" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_6200532f3ef99f639a27bdcae7f"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_231d6c08ae2a023f6e64fef4b5f"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "description"`);
        await queryRunner.query(`DROP TABLE "attendance"`);
        await queryRunner.query(`DROP TYPE "public"."attendance_type_enum"`);
    }

}
