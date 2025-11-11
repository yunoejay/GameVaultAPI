import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGame } from './user-game.entity';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  private readonly apiUrl = 'https://www.freetogame.com/api/games';
  private cachedGames: any[] = [];
  private cacheTime: number = 0;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000;
  private usingFallback: boolean = false;

  constructor(
    private configService: ConfigService,
    @InjectRepository(UserGame) private readonly repo: Repository<UserGame>,
  ) {}

  async getAllGames(limit: number = 10) {
    try {
      const now = Date.now();
      
      if (this.cachedGames.length > 0 && now - this.cacheTime < this.CACHE_DURATION) {
        console.log(`✅ Returning cached games (${this.cachedGames.length} games cached, expires in ${Math.round((this.CACHE_DURATION - (now - this.cacheTime)) / 1000 / 60)} minutes)`);
        return {
          games: this.cachedGames.slice(0, limit),
          total: this.cachedGames.length,
        };
      }
      
      console.log(`Cache expired or empty. Fetching ALL games from FreeToGame API...`);
      
      try {
        const response = await axios.get(this.apiUrl, {
          timeout: 15000,
        });
        
        const allGames = response.data || [];
        
        this.cachedGames = allGames.map(game => ({
          id: game.id.toString(),
          title: game.title,
          genre: game.genre,
          platform: game.platform,
          year: game.release_date?.split('-')[0] || 'N/A',
          description: game.short_description,
          image: game.thumbnail,
          gameUrl: game.game_url,
          developer: game.developer,
          publisher: game.publisher,
        }));
        
        this.cacheTime = now;
        this.usingFallback = false;
        
        console.log(`Successfully fetched and cached ${this.cachedGames.length} games from FreeToGame! Cache valid for 24 hours.`);

        return {
          games: this.cachedGames.slice(0, limit),
          total: this.cachedGames.length,
        };
      } catch (apiError) {
        console.error('FreeToGame API error:', apiError.message);
        throw new HttpException(
          'Failed to fetch games from FreeToGame API',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
      throw new HttpException(
        'Failed to fetch games',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRandomGame() {
    try {
      if (this.cachedGames.length === 0) {
        await this.getAllGames(500);
      }
      
      if (this.cachedGames.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.cachedGames.length);
        console.log(`Returning random game from cache (${this.cachedGames.length} games available)`);
        return this.cachedGames[randomIndex];
      }
    
      throw new HttpException(
        'No games available',
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      console.error('Error in getRandomGame:', error.message);
      throw new HttpException(
        'Failed to get random game',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchGames(query: string) {
    try {
      if (this.cachedGames.length === 0) {
        await this.getAllGames(500);
      }
    
      const lowerQuery = query.toLowerCase();
      const filtered = this.cachedGames.filter(game => 
        game.title.toLowerCase().includes(lowerQuery) ||
        game.genre.toLowerCase().includes(lowerQuery) ||
        game.description.toLowerCase().includes(lowerQuery)
      );
      
      console.log(`Search for "${query}" found ${filtered.length} results in cache`);
      
      return {
        games: filtered,
        total: filtered.length,
      };
    } catch (error) {
      console.error('Error in searchGames:', error.message);
      return {
        games: [],
        total: 0,
      };
    }
  }

  async getGameById(id: string) {
    try {
      if (this.cachedGames.length > 0) {
        const game = this.cachedGames.find(g => g.id === id);
        if (game) {
          return game;
        }
      }

      const allGames = await this.getAllGames(500);
      const game = allGames.games.find(g => g.id === id);
      
      if (!game) {
        throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
      }
      
      return game;
    } catch (error) {
      throw new HttpException(
        'Game not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createUserGame(dto: CreateGameDto): Promise<UserGame> {
    const game = this.repo.create({
      title: dto.title,
      genre: dto.genre,
      platform: dto.platform,
      year: dto.year ?? null,
      description: dto.description,
      image: dto.image,
      gameUrl: dto.gameUrl,
      developer: dto.developer,
      publisher: dto.publisher,
    });
    return await this.repo.save(game);
  }

  async getUserGames(): Promise<UserGame[]> {
    return await this.repo.find({ order: { id: 'DESC' } });
  }
}
