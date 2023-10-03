import EventSource from 'eventsource';
import { PROJECT_DUMMY } from '../mock/project-generator.js';

const SSEHeader = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
  'Access-Control-Allow-Origin': '*',
  'Transfer-Encoding': 'gzip',
};

function* arrayGen(data) {
  for (let i = 0; i < data.length; i++) {
    let each = data[i];
    yield each;
  }
}

function sendDataAtIntervals(res, gen, interval) {
  const interval$ = setInterval(() => {
    const data = gen.next().value;
    console.log(data);

    if (data) {
      res.write(`event: project-detail\n`);
      res.write(`data: ${JSON.stringify(data)}`);
      res.write(`\n\n`);
    } else {
      res.write(`event: closestream\n`);
      res.write(`data: null`);
      res.write(`\n\n`);
      clearInterval(interval$);
    }
  }, interval);
}



// SSE generator
export function generateProjectSprintSSE(req, res) {
  res.writeHead(200, SSEHeader);
  res.flushHeaders();

  const PROJECT_DUMMY_GEN = arrayGen(PROJECT_DUMMY);

  sendDataAtIntervals(res, PROJECT_DUMMY_GEN, 3000);
}

// fetch the SSE data from the other API, modify it and send it as another SSE
export function fetchProjectDataSSE(req, res) {
  res.writeHead(200, SSEHeader);
  res.flushHeaders();
  const projectDataSse = new EventSource(
    'http://localhost:8084/api/generate-sse'
  );

  function onProjectDataBatchFired(resp) {
    res.status(200);

    res.write(`event: project-detail-fetch\n`);
    res.write(`data: ${(resp.data)}`);
    res.write(`\n\n`);
    // res.flush()
  }

  function onClosestreamFired(resp) {
    console.log('closestream received');
    res.write(`event: closestream-fetch\n`);
    res.write(`data: null`);
    res.write(`\n\n`);
    // res.flush()
  }

  projectDataSse.on('project-detail', onProjectDataBatchFired);

  projectDataSse.on('closestream', onClosestreamFired);

  projectDataSse.on('error', () => {});
}
