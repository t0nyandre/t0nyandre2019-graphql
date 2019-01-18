import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  OneToMany,
} from "typeorm";
import { Post } from "./post";

@Entity("post_categories")
export class PostCategory extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column("varchar", { length: 200 }) icon: string;

  @Column("varchar", { length: 150 }) name: string;

  @OneToMany(() => Post, post => post.category)
  posts: Promise<Post[]>;
}
// TODO: Add validations for post categories
