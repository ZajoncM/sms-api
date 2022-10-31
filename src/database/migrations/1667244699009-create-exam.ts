import { MigrationInterface, QueryRunner } from "typeorm";

export class createExam1667244699009 implements MigrationInterface {
    name = 'createExam1667244699009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exam" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "course_id" integer, CONSTRAINT "PK_56071ab3a94aeac01f1b5ab74aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exam" ADD CONSTRAINT "FK_c44570a9bacccccad298bcfcd4a" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" DROP CONSTRAINT "FK_c44570a9bacccccad298bcfcd4a"`);
        await queryRunner.query(`DROP TABLE "exam"`);
    }

}
