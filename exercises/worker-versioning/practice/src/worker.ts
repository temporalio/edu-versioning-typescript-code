import * as activities from './activities';
import { TASK_QUEUE_NAME } from './shared';
import { NativeConnection, Worker } from '@temporalio/worker';

async function run() {
  const connection = await NativeConnection.connect({ address: 'localhost:7233' });

  // TODO Part B: In the object being passed into Worker.create(), add a `buildId` key and set it to a build ID string. Also add a `useVersioning` key and set it to true.

  const worker = await Worker.create({
    taskQueue: TASK_QUEUE_NAME,
    connection,
    workflowsPath: require.resolve('./workflows'),
    activities,
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});