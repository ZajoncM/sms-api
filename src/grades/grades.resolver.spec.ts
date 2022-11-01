import { Test, TestingModule } from '@nestjs/testing';
import { GradesResolver } from './grades.resolver';

describe('GradesResolver', () => {
  let resolver: GradesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradesResolver],
    }).compile();

    resolver = module.get<GradesResolver>(GradesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
