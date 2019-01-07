import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { Post } from "./post";
import { User } from "./user";
import { ApolloError } from "apollo-server-core";

@Entity("comments")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column("text") content: string;

  @Column("int2", { default: 0 }) score: number;

  @Column("int", { nullable: true }) parent: number;

  @ManyToOne(() => Post, post => post.comments, { nullable: false })
  post: Promise<Post>;

  @ManyToOne(() => User, user => user.comments, { nullable: false })
  author: Promise<User>;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @BeforeInsert()
  async checkParent() {
      if (this.parent) {
          throw new ApolloError("Cant be a comment of a comment of a post."); // fix this errormsg
      }
  }
}
