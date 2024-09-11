import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';

import { Post } from './post.model';
import { TagPost } from './tag-post.model';

@Table({
  tableName: 'Tags',
  timestamps: true,
  underscored: true,
})
export class Tag extends Model {
  @Column({
    allowNull: false,
    unique: true,
  })
  name: string;

  @BelongsToMany(() => Post, () => TagPost)
  posts: Post[];
}
