import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Comment } from "./comment";
import { User } from "./user";

export enum Vote {
    UP,
    DOWN,
}

@Entity("comment_votes")
export class CommentVote extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column("int", { default: 0 }) value: number;

  @OneToOne(() => Comment, comment => comment.score, { nullable: false })
  comment: Promise<Comment>;

  @ManyToMany(() => User, user => user.votes, { nullable: true })
  @JoinTable()
  voters: Promise<User[]>;

  @UpdateDateColumn()
  lastVoteAt: Date;
}
