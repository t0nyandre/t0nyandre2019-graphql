import * as argon2 from "argon2";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as yup from "yup";
import { username, password, email } from "./validations/user";

export enum Roles {
  ADMIN,
  PRO,
  WRITER,
  USER,
}

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column("varchar", { length: 160, unique: true })
  public username: string;

  @Column({ type: "enum", enum: Roles, default: "USER" })
  public role: Roles;

  @Column("varchar", { length: 255, unique: true })
  public email: string;

  @Column("text")
  public password: string;

  @Column("boolean", { default: false })
  public confirmed: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @BeforeInsert()
  public async hashPasswordBeforeInsert() {
    try {
      this.password = await argon2.hash(this.password, {
        type: argon2.argon2d,
      });
    } catch (error) {
      // tslint:disable-next-line
      console.log(
        `Something went wrong while creating your account. Please try again.`,
      );
    }
  }
}

export const registerValidation = yup.object().shape({
  username,
  email,
  password,
});
