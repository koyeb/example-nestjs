import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';
import { WorldModule } from './world/world.module';
import { TierModule } from './tier/tier.module';
import { RelationshipModule } from './relationship/relationship.module';
import { GenderModule } from './gender/gender.module';
import { SpeciesModule } from './species/species.module';
import { VisibilityModule } from './visibility/visibility.module';
import { ClassesModule } from './classes/classes.module';
import { CharTypeModule } from './char-type/char-type.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-mute-paper-a46hw29p.us-east-1.pg.koyeb.app',
      port: 5432,
      username: 'koyeb-adm',
      password: 'qtfSDhQ8rxT3',
      database: 'koyebdb',
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      extra: {
        ssl: {
          mode: 'require',
        },
      },
    }),
    AuthModule,
    UserModule,
    CharacterModule,
    WorldModule,
    TierModule,
    RelationshipModule,
    GenderModule,
    SpeciesModule,
    VisibilityModule,
    ClassesModule,
    CharTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
