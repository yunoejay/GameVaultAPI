import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_games' })
export class UserGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 100, nullable: true })
  genre?: string;

  @Column({ length: 100, nullable: true })
  platform?: string;

  @Column({ type: 'int', nullable: true })
  year?: number | null;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 500, nullable: true })
  image?: string;

  @Column({ name: 'game_url', length: 500, nullable: true })
  gameUrl?: string;

  @Column({ length: 200, nullable: true })
  developer?: string;

  @Column({ length: 200, nullable: true })
  publisher?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
