/**
 * Container Generator
 */

import { Actions, PlopGeneratorConfig } from 'node-plop';
import path from 'path';
import inquirer from 'inquirer';

import { pathExists } from '../utils';
import { baseGeneratorPath } from '../paths';

inquirer.registerPrompt('directory', require('inquirer-directory'));

export enum ApiProptNames {
  'apiName' = 'apiName',
  'path' = 'path',
}

type Answers = { [P in ApiProptNames]: string };

export const rootStatePath = path.join(
  __dirname,
  '../../../src/types/RootState.ts',
);

export const apiGenerator: PlopGeneratorConfig = {
  description: 'Add a redux toolkit api',
  prompts: [
    {
      type: 'input',
      name: ApiProptNames.apiName,
      message: 'What should it be called (automatically adds ...Api postfix)',
    },
  ],
  actions: data => {
    const answers = data as Answers;
    const apiName = answers.apiName.endsWith('Api')
      ? answers.apiName
      : answers.apiName + 'Api';

    const apiPath = `${baseGeneratorPath}/services/api/${apiName}`;

    if (pathExists(apiPath)) {
      throw new Error(`Api '${answers.apiName}' already exists`);
    }
    const actions: Actions = [];

    actions.push({
      type: 'add',
      path: `${apiPath}/index.ts`,
      templateFile: './api/index.ts.hbs',
      abortOnFail: true,
      data: {},
    });

    actions.push({
      type: 'add',
      path: `${apiPath}/types.ts`,
      templateFile: './api/types.ts.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'prettify',
      data: { path: `${apiPath}/**` },
    });

    return actions;
  },
};
