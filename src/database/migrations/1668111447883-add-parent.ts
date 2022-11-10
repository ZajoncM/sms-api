import { MigrationInterface, QueryRunner } from "typeorm";

export class addParent1668111447883 implements MigrationInterface {
    name = 'addParent1668111447883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ADD "parent_id" integer`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_5deeed737ab258e71965421fc96" FOREIGN KEY ("parent_id") REFERENCES "parent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_5deeed737ab258e71965421fc96"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "parent_id"`);
    }

}
