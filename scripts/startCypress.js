const getPort = require('get-port');
const concurrently = require('concurrently');

(async () => {
  const PORT = await getPort({ port: 8765 });
  const CYPRESS_BASE_URL = `http://localhost:${PORT}`;

  return concurrently(
    [
      {
        name: 'app',
        command: 'npx --no-install react-scripts start',
        env: {
          BROWSER: 'none',
          PORT,
          REACT_APP_ENV: 'test',
          ...process.env,
        },
      },
      {
        name: 'cypress',
        command: `npx --no-install wait-on ${CYPRESS_BASE_URL} && npx --no-install cypress open`,
        env: {
          CYPRESS_BASE_URL,
          ...process.env,
        },
      },
    ],
    {
      killOthers: ['failure', 'success'],
    },
  );
})().catch((err) => {
  if (
    Array.isArray(err) &&
    err.every(({ exitCode }) => exitCode === 0 || exitCode === 'SIGTERM')
  ) {
    process.exit(0);
    return;
  }

  console.error(err);
  process.exit(err.exitCode || 1);
});
