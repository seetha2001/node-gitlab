import { Labels } from '../../../dist';
import { exec } from 'child_process';
import { promisify } from 'util';

const run = promisify(exec);

jest.mock('../../../src/core/infrastructure/KyRequester', () => ({
  get: jest.fn(() => {
    body: [];
  }),
  post: jest.fn(() => {
    body: {
    }
  }),
  put: jest.fn(() => {
    body: {
    }
  }),
}));

describe('Labels.create', () => {
  it('should create a valid label on a project', async () => {
    run(
      `gitlab labels create --gl-host https://test.com --gl-token 123213 --resource-id ${project.id} --labelName Test Label1 --color #FFAABB`,
    );

    expect(Labels.constructor).toHaveBeenCalledWith({
      host: 'https://test.com',
      token: '123213',
    });

    expect(Labels.create).toHaveBeenCalledWith(project.id, 'Test Label1', '#FFAABB');
  });
});
