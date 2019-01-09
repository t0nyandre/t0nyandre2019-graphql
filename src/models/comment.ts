import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Post } from "./post";
import { User } from "./user";
import { content } from "./validations/comment";
import * as yup from "yup";
import { CommentVote } from "./votes";

@Entity("comments")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column("text") content: string;

  @OneToOne(() => CommentVote, vote => vote.comment)
  @JoinColumn()
  score: CommentVote;

  @ManyToOne(() => Comment, comment => comment.childComments, { nullable: true })
  parentComment: Promise<Comment>;

  @OneToMany(() => Comment, comment => comment.parentComment, { nullable: true })
  childComments: Promise<Comment[]>;

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
