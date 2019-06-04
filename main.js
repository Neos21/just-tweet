#!/usr/bin/env node

const twitter = require('twitter');

// Credentials : Input your credentials here
const credentials = {
  consumer_key       : '',
  consumer_secret    : '',
  access_token_key   : '',
  access_token_secret: '',
};

// Get credentials from environment variables
Object.keys(credentials).forEach((keyName) => {
  const envName = `TWITTER_${keyName.toUpperCase()}`;
  
  // Overwrite the credential if environment variable exists
  if(process.env[envName]) {
    credentials[keyName] = process.env[envName];
  }
  
  if(!credentials[keyName]) {
    console.error(`\n[Aborted] : Please set ${envName}.`);
    return process.exit(1);
  }
});

const client = new twitter(credentials);

const args = process.argv.slice(2, process.argv.length);

if(args.length === 0) {
  console.error('\n[Aborted] : Please input any text.');
  return process.exit(1);
}

const tweet = args.join(' ');

client.post('statuses/update', {
  status: tweet
})
  .then((_tweet) => {
    console.log('\nSuccess.');
  })
  .catch((error) => {
    console.error('\n[Error] :\n', error);
    process.exit(1);
  });
