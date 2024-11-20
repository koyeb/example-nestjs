import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharType } from '../../char-type/char-type.entity';
import { Classes } from '../../classes/classes.entity';
import { Gender } from '../../gender/gender.entity';
import { Species } from '../../species/species.entity';
import { Visibility } from '../../visibility/visibility.entity';

@Injectable()
export class DatabaseSeederService {
  constructor(
    @InjectRepository(CharType)
    private charTypeRepository: Repository<CharType>,
    @InjectRepository(Classes)
    private classesRepository: Repository<Classes>,
    @InjectRepository(Gender)
    private genderRepository: Repository<Gender>,
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
    @InjectRepository(Visibility)
    private visibilityRepository: Repository<Visibility>,
  ) {}

  async seed() {
    console.log('Starting database seeding...');
    await this.seedCharTypes();
    await this.seedClasses();
    await this.seedGenders();
    await this.seedSpecies();
    await this.seedVisibilities();
  }

  private async seedCharTypes() {
    const existingTypes = await this.charTypeRepository.find();
    console.log('Existing CharTypes:', existingTypes);

    if (existingTypes.length === 0) {
      console.log('No CharTypes found. Creating default types...');
      const charTypes = [
        { desc: 'Non-Player Character' },
        { desc: 'Player Character' },
      ];

      for (const type of charTypes) {
        const newCharType = this.charTypeRepository.create(type);
        await this.charTypeRepository.save(newCharType);
        console.log('Created CharType:', newCharType);
      }

      console.log('Character types seeded successfully');
    } else {
      console.log('CharTypes already exist. Skipping seeding.');
    }
  }

  private async seedClasses() {
    const existingClasses = await this.classesRepository.find();
    console.log('Existing Classes:', existingClasses);

    if (existingClasses.length === 0) {
      console.log('No Classes found. Creating default classes...');
      const classes = [
        { desc: 'Artificer' },
        { desc: 'Barbarian' },
        { desc: 'Bard' },
        { desc: 'Cleric' },
        { desc: 'Druid' },
        { desc: 'Fighter' },
        { desc: 'Monk' },
        { desc: 'Paladin' },
        { desc: 'Ranger' },
        { desc: 'Rogue' },
        { desc: 'Sorceror' },
        { desc: 'Warlock' },
        { desc: 'Wizard' },
      ];

      for (const classType of classes) {
        const newClass = this.classesRepository.create(classType);
        await this.classesRepository.save(newClass);
        console.log('Created Class:', newClass);
      }

      console.log('Classes seeded successfully');
    } else {
      console.log('Classes already exist. Skipping seeding.');
    }
  }

  private async seedGenders() {
    const existingGenders = await this.genderRepository.find();
    console.log('Existing Genders:', existingGenders);

    if (existingGenders.length === 0) {
      console.log('No Genders found. Creating default genders...');
      const genders = [
        { desc: 'Female' },
        { desc: 'Male' },
        { desc: 'Nonbinary' },
        { desc: 'Custom' },
      ];

      for (const gender of genders) {
        const newGender = this.genderRepository.create(gender);
        await this.genderRepository.save(newGender);
        console.log('Created Gender:', newGender);
      }

      console.log('Genders seeded successfully');
    } else {
      console.log('Genders already exist. Skipping seeding.');
    }
  }

  private async seedSpecies() {
    const existingSpecies = await this.speciesRepository.find();
    console.log('Existing Species:', existingSpecies);

    if (existingSpecies.length === 0) {
      console.log('No Species found. Creating default species...');
      const species = [
        { desc: 'Aasimar' },
        { desc: 'Dragonborn' },
        { desc: 'Dwarf' },
        { desc: 'Elf' },
        { desc: 'Firbolg' },
        { desc: 'Gnome' },
        { desc: 'Goliath' },
        { desc: 'Half-Elf' },
        { desc: 'Half-Orc' },
        { desc: 'Halfling' },
        { desc: 'Human' },
        { desc: 'Lizardfolk' },
        { desc: 'Orc' },
        { desc: 'Tabaxi' },
        { desc: 'Tiefling' },
        { desc: 'Custom' },
      ];

      for (const speciesType of species) {
        const newSpecies = this.speciesRepository.create(speciesType);
        await this.speciesRepository.save(newSpecies);
        console.log('Created Species:', newSpecies);
      }

      console.log('Species seeded successfully');
    } else {
      console.log('Species already exist. Skipping seeding.');
    }
  }

  private async seedVisibilities() {
    const existingVisibilities = await this.visibilityRepository.find();
    console.log('Existing Visibilities:', existingVisibilities);

    if (existingVisibilities.length === 0) {
      console.log('No Visibilities found. Creating default visibilities...');
      const visibilities = [
        { desc: 'Everyone' },
        { desc: 'Restricted' },
        { desc: 'GM Only' },
      ];

      for (const visibility of visibilities) {
        const newVisibility = this.visibilityRepository.create(visibility);
        await this.visibilityRepository.save(newVisibility);
        console.log('Created Visibility:', newVisibility);
      }

      console.log('Visibilities seeded successfully');
    } else {
      console.log('Visibilities already exist. Skipping seeding.');
    }
  }
} 