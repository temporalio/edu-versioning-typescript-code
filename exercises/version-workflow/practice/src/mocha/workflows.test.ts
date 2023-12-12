import { TestWorkflowEnvironment } from '@temporalio/testing';
import { before, describe, it } from 'mocha';

// TODO: Uncomment the following lines
// import { Worker } from '@temporalio/worker';
// import fs from 'fs';

describe('Loan processing workflow', () => {
  let testEnv: TestWorkflowEnvironment;

  before(async () => {
    testEnv = await TestWorkflowEnvironment.createTimeSkipping();
  });

  after(async () => {
    await testEnv?.teardown();
  });

  it('successfully replays Workflow history from file', async () => {
    // TODO: Read the history file from disk
    // TODO: Parse the file contents as JSON
    // TODO: Use Worker.runReplayHistory and pass the `workflowsPath` option and the history.
  });
});
