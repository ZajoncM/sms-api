import { MigrationInterface, QueryRunner } from "typeorm";

export class createRoleEntities1664901820212 implements MigrationInterface {
    name = 'createRoleEntities1664901820212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "user_id" integer, CONSTRAINT "REL_0cc43638ebcf41dfab27e62dc0" UNIQUE ("user_id"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" SERIAL NOT NULL, "user_id" integer, CONSTRAINT "REL_93f6fa64874b010c5f3a87c3b8" UNIQUE ("user_id"), CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parent" ("id" SERIAL NOT NULL, "user_id" integer, CONSTRAINT "REL_2e1c234ae8f8bb156922e8e417" UNIQUE ("user_id"), CONSTRAINT "PK_bf93c41ee1ae1649869ebd05617" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_0cc43638ebcf41dfab27e62dc09" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_93f6fa64874b010c5f3a87c3b8b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parent" ADD CONSTRAINT "FK_2e1c234ae8f8bb156922e8e417d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parent" DROP CONSTRAINT "FK_2e1c234ae8f8bb156922e8e417d"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_93f6fa64874b010c5f3a87c3b8b"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_0cc43638ebcf41dfab27e62dc09"`);
        await queryRunner.query(`DROP TABLE "parent"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "student"`);
    }

}
