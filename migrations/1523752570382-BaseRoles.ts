import {MigrationInterface, QueryRunner} from "typeorm";
import { UserRolesEnum } from '../src/roles/roles.enum';

export class BaseRoles1523752570382 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`INSERT INTO role (role) values ('${UserRolesEnum.SUPER_ADMIN}') `);
    await queryRunner.query(`INSERT INTO role (role) values ('${UserRolesEnum.SITE_ADMIN}') `);
    await queryRunner.query(`INSERT INTO role (role) values ('${UserRolesEnum.USER}') `);
    await queryRunner.query(`INSERT INTO role (role) values ('${UserRolesEnum.PHANTOM}') `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM role WHERE role IN ['${UserRolesEnum.SUPER_ADMIN}','${UserRolesEnum.SITE_ADMIN}','${UserRolesEnum.USER}','${UserRolesEnum.PHANTOM}']`);
  }

}
