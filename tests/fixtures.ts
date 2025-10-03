import { test as base} from '@playwright/test';

import { SprintPage } from '../pages/SprintPage';
import { ComplicatedPage } from '../pages/ComplicatedPage';
import { SimpleElemsPage } from '../pages/SimpleElemsPage';
import { LandingPage } from '../pages/LandingPage';
import { FakePricingPage } from '../pages/FakePricingPage';

// Define a custom type for the pages factory
type PagesFactory = {
  sprint: () => SprintPage;
  complicated: () => ComplicatedPage;
  simpleElems: () => SimpleElemsPage;
  landing: () => LandingPage;
  fakePricing: () => FakePricingPage;
};

// Extend the base test to include the pages factory
export const test = base.extend<{ pages: PagesFactory }>({
  pages: async ({ page }, use) => {
    
    const factory: PagesFactory = {
      sprint: () => new SprintPage(page),
      complicated: () => new ComplicatedPage(page),
      simpleElems: () => new SimpleElemsPage(page),
      landing: () => new LandingPage(page),
      fakePricing: () => new FakePricingPage(page),
    };

    await use(factory);
  },
});

export const expect = test.expect;