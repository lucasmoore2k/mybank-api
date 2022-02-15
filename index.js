import express from 'express';
import accountRouter from './routes/account.routes.js';
import {promises as fs} from 'fs';

global.fileName = "accounts.json";


const {readFile, writeFile} = fs;

const app = express();
app.use(express.json())

app.use('/account', accountRouter);

app.listen(3000, async () => {
    try{
        await readFile('accounts.js');
        console.log('Api started! File read!')
    }catch(err){
        const initialJson = {
            nextId:1,
            accounts: []
        }
        writeFile('accounts.json', JSON.stringify(initialJson)).then(()=>{
            console.log('Api started! File created!')
        }).catch(err=> {
            console.log(err);
        })
    }
})