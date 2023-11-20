import { Connection, Client } from '@temporalio/client';
import { pizzaWorkflow } from './workflows';
import { Address, Customer, Pizza, PizzaOrder, TASK_QUEUE_NAME } from './shared';

async function run() {
  const connection = await Connection.connect({ address: 'localhost:7233' });

  const client = new Client({
    connection,
  });

  // TODO Part B: call client.taskQueue.updateBuildIdCompatibility() to inform the Task
  // Queue of your Build ID. You can also do this via the CLI if you are changing
  // a currently running workflow. An example of how to do it via the SDK is
  // below. Don't forget to change the BuildID to match your Worker.
  //
  // await client.taskQueue.updateBuildIdCompatibility('your_task_queue_name', {
  //   operation: 'addNewIdInNewDefaultSet',
  //   buildId: 'deadbeef',
  // });

  // TODO Part D: call client.taskQueue.updateBuildIdCompatibility() again to add another
  // compatible Build ID to the same Task Queue. This can be done if you are
  // making backwards-compatible changes to your Workers.
  //
  // await client.taskQueue.updateBuildIdCompatibility('your_task_queue_name', {
  //   operation: 'addNewCompatibleVersion',
  //   buildId: 'deadbeef',
  //   existingCompatibleBuildId: 'some-existing-build-id',
  // });

  const order = createPizzaOrder();

  const handle = await client.workflow.start(pizzaWorkflow, {
    args: [order],
    taskQueue: TASK_QUEUE_NAME,
    workflowId: `pizza-workflow-order-${order.orderNumber},`,
  });

  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

function createPizzaOrder(): PizzaOrder {
  const customer: Customer = {
    customerID: 12983,
    name: 'María García',
    email: 'maria1985@example.com',
    phone: '415-555-7418',
  };

  const address: Address = {
    line1: '701 Mission Street',
    line2: 'Apartment 9C',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94103',
  };

  const p1: Pizza = {
    description: 'Large, with mushrooms and onions',
    price: 1500,
  };

  const p2: Pizza = {
    description: 'Small, with pepperoni',
    price: 1200,
  };

  const p3: Pizza = {
    description: 'Medium, with extra cheese',
    price: 1300,
  };

  const items: Pizza[] = [p1, p2];

  const order: PizzaOrder = {
    orderNumber: 'Z1238',
    customer,
    items,
    address,
    isDelivery: true,
  };

  return order;
}
