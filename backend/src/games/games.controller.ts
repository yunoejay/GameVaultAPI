import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('api/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  async getAllGames(@Query('limit') limit?: string) {
    const gameLimit = limit ? parseInt(limit, 10) : 100;
    return this.gamesService.getAllGames(gameLimit);
  }

  @Get('random')
  async getRandomGame() {
    return this.gamesService.getRandomGame();
  }

  @Get('search')
  async searchGames(@Query('query') query: string) {
    if (!query) {
      return { games: [], total: 0 };
    }
    return this.gamesService.searchGames(query);
  }

  @Get('user')
  async getUserGames() {
    return this.gamesService.getUserGames();
  }

  @Post()
  async createUserGame(@Body() body: CreateGameDto) {
    return this.gamesService.createUserGame(body);
  }

  @Get(':id')
  async getGameById(@Param('id') id: string) {
    return this.gamesService.getGameById(id);
  }
}
