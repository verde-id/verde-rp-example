import fs from 'fs'

if(!process.env.CONFIG_FILE) throw 'Please specify config file';
let config = JSON.parse(fs.readFileSync(process.env.CONFIG_FILE).toString());
process.env.REQUESTS_CONTRACT_ADDR = config.contractAddress.request; 
process.env.DIRECTORY_CONTRACT_ADDR = config.contractAddress.directory;
process.env.RP_ADDR = config.partyAddress[1];

require('source-map-support/register');

require('./greenBoxApi');
require('./web/server');
