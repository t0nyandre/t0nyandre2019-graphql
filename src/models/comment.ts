import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Post } from "./post";
import { User } from "./user";
import { content } from "./validations/comment";
import * as yup from "yup";

@Entity("comments")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column("text") content: string;

  @Column("int2", { default: 0 }) score: number;

  @ManyToOne(() => Comment, comment => comment.child_comments, { nullable: true })
  parent_comment: Promise<Comment>;

  @OneToMany(() => Comment, comment => comment.parent_comment, { nullable: true })
  child_comments: Promise<Comment[]>;

  @ManyToOne(() => Post, post => post.comments, { nullable: true })
  post: Promise<Post>;

  @ManyToOne(() => User, user => user.comments, { nullable: false })
  author: Promise<User>;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}

export const commentValidation = yup.object().shape({
  content,
});