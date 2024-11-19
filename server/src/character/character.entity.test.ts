import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { User } from '../user/user.entity';
import { World } from '../world/world.entity';

describe('Character Entity', () => {
  let characterRepository: Repository<Character>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Character, User, World],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Character]),
      ],
    }).compile();

    characterRepository = module.get<Repository<Character>>(
      getRepositoryToken(Character),
    );
  });

  it('should create a character with default values', async () => {
    const character = new Character();
    const savedCharacter = await characterRepository.save(character);

    expect(savedCharacter.id).toBeDefined();
    expect(savedCharacter.name).toBe('New Character');
    expect(savedCharacter.visibility).toBe(1);
  });

  it('should create a character with specified values', async () => {
    const character = new Character();
    character.name = 'Hero';
    character.type = 'Warrior';
    character.visibility = 2;

    const savedCharacter = await characterRepository.save(character);

    expect(savedCharacter.name).toBe('Hero');
    expect(savedCharacter.type).toBe('Warrior');
    expect(savedCharacter.visibility).toBe(2);
  });

  it('should create a character with relationships', async () => {
    const user = new User();
    user.username = 'Test User';
    const savedUser = await characterRepository.manager.save(user);

    const world = new World();
    world.name = 'Test World';
    const savedWorld = await characterRepository.manager.save(world);

    const character = new Character();
    character.owner = savedUser;
    character.world = savedWorld;

    const savedCharacter = await characterRepository.save(character);

    expect(savedCharacter.owner).toBeDefined();
    expect(savedCharacter.owner.id).toBe(savedUser.id);
    expect(savedCharacter.world).toBeDefined();
    expect(savedCharacter.world.id).toBe(savedWorld.id);
  });
});
