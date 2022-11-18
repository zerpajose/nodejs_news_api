import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Post } from '../../posts/entities/post.entity';

@Table
export class Tag extends Model {
  @Column(DataType.STRING)
  tag: string;

  @ForeignKey(() => Post)
  @Column(DataType.INTEGER)
  post_id: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @BelongsTo(() => Post)
  post: Post;
}
