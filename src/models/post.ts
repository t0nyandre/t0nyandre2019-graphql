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
import * as slug from "@sindresorhus/slugify";
import { PostCategory } from "./postCategory";
import { ApolloError } from "apollo-server-core";
import { User } from "./user";

export enum PostStatus {
  DRAFT,
  PUBLISHED,
  ARCHIVED,
}

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 200, nullable: true }) image: string;

  @Column("varchar", { length: 150 }) title: string;

  @ManyToOne(() => PostCategory, category => category.posts, {
    nullable: false,
  })
  category: Promise<PostCategory>;

  @Column("text") description: string;

  @Column("text", { nullable: true }) content: string;

  @Column("varchar", { length: 150 }) slug: string;

  @Column({ type: "enum", enum: PostStatus, default: PostStatus.DRAFT })
  status: PostStatus;

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
