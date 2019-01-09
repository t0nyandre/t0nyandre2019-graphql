import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  OneToMany,
} from "typeorm";
import * as yup from "yup";
import { Post } from "./post";
import { catIcon, catName } from "./validations/post";

@Entity("post_categories")
export class PostCategory extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column("varchar", { length: 200 }) icon: string;

  @Column("varchar", { length: 150 }) name: string;

  @OneToMany(() => Post, post => post.category)
  posts: Promise<Post[]>;
}

export const categoryValidation = yup.object().shape({
  icon: catIcon,
  name: catName,
});
// TODO: Add validations for post categories
