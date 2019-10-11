import { Projects } from '../../../dist';
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

describe('Projects.create', () => {
  it('should create a valid project', async () => {
    run(
      `gitlab projects create --gl-host https://test.com --gl-token 123213 --name "Test CLI Project" `,
    );

    expect(Projects.constructor).toHaveBeenCalledWith({
      host: 'https://test.com',
      token: '123213',
    });

    expect(Projects.create).toHaveBeenCalledWith({ name: "Test CLI Project" });
  });
});
