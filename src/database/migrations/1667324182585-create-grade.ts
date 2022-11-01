import { MigrationInterface, QueryRunner } from "typeorm";

export class createGrade1667324182585 implements MigrationInterface {
    name = 'createGrade1667324182585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "grade" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "exam_id" integer, "student_id" integer, CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exam" ADD "weight" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "grade" ADD CONSTRAINT "FK_3bc8daa26bdb6d7f62296102465" FOREIGN KEY ("exam_id") REFERENCES "exam"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grade" ADD CONSTRAINT "FK_9bffea35c23fe4b3467e6f72604" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grade" DROP CONSTRAINT "FK_9bffea35c23fe4b3467e6f72604"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP CONSTRAINT "FK_3bc8daa26bdb6d7f62296102465"`);
        await queryRunner.query(`ALTER TABLE "exam" DROP COLUMN "weight"`);
        await queryRunner.query(`DROP TABLE "grade"`);
    }

}
