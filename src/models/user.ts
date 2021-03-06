import * as argon2 from "argon2";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ApolloError } from "apollo-server-core";

import { Profile } from "./profile";
import { Post } from "./post";

export enum Roles {
  ADMIN,
  PRO,
  WRITER,
  USER,
}

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 160, unique: true }) username: string;

  @Column({ type: "enum", enum: Roles, default: Roles.USER }) role: Roles;

  @Column("varchar", { length: 255, unique: true }) email: string;

  @Column("text") password: string;

  @Column("boolean", { default: false }) confirmed: boolean;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, post => post.author)
  posts: Promise<Post[]>;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    try {
      this.password = await argon2.hash(this.password, {
        type: argon2.argon2d,
      });
    } catch (error) {
      throw new ApolloError(
        "Something went wrong while creating your account. Please try again."
      );
    }
  }
}
