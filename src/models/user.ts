import * as argon2 from "argon2";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import * as yup from "yup";
import { username, password, email } from "./validations/user";
import { Post } from "./post";
import { ApolloError } from "apollo-server-core";
import { Comment } from "./comment";
import { CommentVote } from "./votes";

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

  @Column({ type: "enum", enum: Roles, default: "USER" }) role: Roles;

  @Column("varchar", { length: 255, unique: true }) email: string;

  @Column("text") password: string;

  @Column("text", { nullable: true }) about: string;

  @Column("varchar", { length: 255, nullable: true }) avatar: string;

  @Column("boolean", { default: false }) confirmed: boolean;

  @OneToMany(() => Post, post => post.author)
  posts: Promise<Post[]>;

  @OneToMany(() => Comment, comment => comment.author)
  comments: Promise<Comment[]>;

  @ManyToMany(() => CommentVote, vote => vote.voters)
  votes: Promise<CommentVote[]>;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    try {
      this.password = await argon2.hash(this.password, {
        type: argon2.argon2d,
      });
    } catch (error) {
      throw new ApolloError("Something went wrong while creating your account. Please try again.");
    }
  }
}

export const registerValidation = yup.object().shape({
  username,
  email,
  password,
});
