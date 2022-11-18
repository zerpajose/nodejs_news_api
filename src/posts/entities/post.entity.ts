import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Tag } from '../../tags/entities/tag.entity';

@Table
export class Post extends Model {
  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  url: string;

  @Column(DataType.STRING)
  author: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @HasMany(() => Tag)
  tag: Tag[];
}
