import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  Entity,
  ManyToOne,
  BeforeInsert,
} from "typeorm";
import { image, title, description, content } from "./validations/post";
import * as yup from "yup";
import * as slug from "@sindresorhus/slugify";
import { User } from "./user";
import { PostCategory } from "./post-category";
import { ApolloError } from "apollo-server-core";

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

  @ManyToOne(() => PostCategory, category => category.posts, { nullable: false })
  category: Promise<PostCategory>;

  @Column("text") description: string;

  @Column("text", { nullable: true }) content: string;

  @Column("varchar", { length: 150 }) slug: string;

  @Column({ type: "enum", enum: PostStatus, default: "DRAFT" })
  status: PostStatus;

  @Column({ type: "enum", enum: CommentStatus, default: "OPEN" })
  comment_status: CommentStatus;

  @ManyToOne(() => User, author => author.posts, { nullable: false })
  author: Promise<User>;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @BeforeInsert()
  async slugifyTitle() {
    try {
      this.slug = await slug(this.title, {
        decamelize: true,
        lowercase: true,
      });
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}

// TODO: Add validation for enum and author
export const postValidation = yup.object().shape({
  image,
  title,
  description,
  content,
});
