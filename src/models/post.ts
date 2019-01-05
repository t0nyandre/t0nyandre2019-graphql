import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  Entity,
  ManyToOne,
} from "typeorm";
import { image, title, description, content } from "./validations/post";
import * as yup from "yup";
import { User } from "./user";
import { PostCategory } from "./post-category";

export enum PostStatus {
  PUBLISHED = 1,
  DRAFT = 0,
  ARCHIVED = 2,
}

export enum CommentStatus {
  OPEN = 1,
  CLOSED = 0,
}

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 200, nullable: true }) image: string;

  @Column("varchar", { length: 150 }) title: string;

  @ManyToOne(() => PostCategory, category => category.posts)
  category: PostCategory;

  @Column("text") description: string;

  @Column("text", { nullable: true }) content: string;

  @Column({ type: "enum", enum: PostStatus, default: "DRAFT" })
  status: PostStatus;

  @Column({ type: "enum", enum: CommentStatus, default: "OPEN" })
  comment_status: CommentStatus;

  @ManyToOne(() => User, author => author.posts)
  author: User;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}

// TODO: Add validation for enum and author
export const postValidation = yup.object().shape({
  image,
  title,
  description,
  content,
});
