import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';

import { Tag } from './tag.model';
import { Post } from './post.model';

@Table({
  tableName: 'TagsPosts',
  timestamps: true,
  underscored: true,
})
export class TagPost extends Model {
  @ForeignKey(() => Post)
  @Column({
    allowNull: false,
  })
  postId: number;

  @ForeignKey(() => Tag)
  @Column({
    allowNull: false,
  })
  tagId: number;
}
