import { MigrationInterface, QueryRunner } from "typeorm";

export class createCourse1664993779296 implements MigrationInterface {
    name = 'createCourse1664993779296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT 'Pusty', "teacher_id" integer, "group_id" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_f4acb7f54962af04a558b1a5ed9" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_e5ff1032679363daced4f770e4f" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_e5ff1032679363daced4f770e4f"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_f4acb7f54962af04a558b1a5ed9"`);
        await queryRunner.query(`DROP TABLE "course"`);
    }

}
