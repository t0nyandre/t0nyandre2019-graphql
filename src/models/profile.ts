import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Post } from "./post";
import { CommentVote } from "./votes";
import { Comment } from "./comment";

@Entity("profiles")
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 150, nullable: true }) firstName: string;

  @Column("varchar", { length: 150, nullable: true }) lastName: string;

  @Column("varchar", { length: 255, nullable: true }) avatar: string;

  @Column("text", { nullable: true }) bio: string;

  @Column("varchar", { length: 200, nullable: true }) webUrl: string;

  @Column("varchar", { length: 200, nullable: true }) blogUrl: string;

  @Column("varchar", { length: 200, nullable: true }) location: string;

  @Column("varchar", { length: 100, nullable: true }) youtubeUsername: string;

  @Column("varchar", { length: 100, nullable: true }) twitterUsername: string;

  @Column("varchar", { length: 100, nullable: true }) githubUsername: string;

  @Column("varchar", { length: 100, nullable: true }) gitlabUsername: string;

  @Column("varchar", { length: 100, nullable: true }) facebookUsername: string;

  @OneToMany(() => Post, post => post.author)
  posts: Promise<Post[]>;

  @OneToMany(() => Comment, comment => comment.author)
  comments: Promise<Comment[]>;

  @ManyToMany(() => CommentVote, vote => vote.voters)
  votes: Promise<CommentVote[]>;

  @UpdateDateColumn() updatedAt: Date;
}
