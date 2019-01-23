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
import { CommentScore } from "./commentScore";

@Entity("comments")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column("text") content: string;

  @OneToOne(() => CommentScore, vote => vote.comment, { cascade: true })
  @JoinColumn()
  score: CommentScore;

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
