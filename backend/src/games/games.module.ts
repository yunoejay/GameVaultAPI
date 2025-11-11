import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { UserGame } from './user-game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserGame])],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
