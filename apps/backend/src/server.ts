import app from './app';

app
  .listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  })
  .on('error', (error) => {
    console.error(`An error occurred: ${JSON.stringify(error)}`); // TODO: create logger instance with winston
  });
