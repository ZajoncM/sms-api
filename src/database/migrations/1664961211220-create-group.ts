import { MigrationInterface, QueryRunner } from "typeorm";

export class createGroup1664961211220 implements MigrationInterface {
    name = 'createGroup1664961211220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "semester" integer NOT NULL DEFAULT '1', "educator_id" integer, CONSTRAINT "REL_751707f4c47ce18ea8846ea8fa" UNIQUE ("educator_id"), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "student" ADD "group_id" integer`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_1bd5a468c54488b86d50a117f15" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_751707f4c47ce18ea8846ea8fab" FOREIGN KEY ("educator_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_751707f4c47ce18ea8846ea8fab"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_1bd5a468c54488b86d50a117f15"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "group_id"`);
        await queryRunner.query(`DROP TABLE "group"`);
    }

}
