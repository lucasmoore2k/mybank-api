import {promises as fs} from 'fs';
import AccountService from '../services/account.service.js'

const {readFile, writeFile} = fs;

async function createAccount(req,res,next){
    try {
        let account = req.body;
        account = await AccountService.createAccount(account);
        res.send(account);
    }catch(err){
        next(err);
    }
}

async function getAccount(req,res,next){
    try {
        const data = JSON.parse(await readFile(global.fileName))
        delete data.nextId;
        res.send(data);
    }catch(err){
        next(err);
    }
}

async function getAccountById(req,res,next){
    try {
        const data = JSON.parse(await readFile(global.fileName))
        const account = data.accounts.find(account => account.id === parseInt(req.params.id))

        res.send(account);
    }catch(err){
        next(err);
    }
}

async function deleteAccount(req,res,next){
    try {
        const data = JSON.parse(await readFile(global.fileName))
        data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id))

        await writeFile(global.fileName, JSON.stringify(data,null,2))
        console.log('teste: '+JSON.stringify(data,null,2))
        res.end();
    }catch(err){
        next(err);
    }
}

async function updateAccount(req,res,next){
    try {
        const account = req.body;
        const data = JSON.parse(await readFile(global.fileName))
        
        const index = data.accounts.findIndex(a => a.id === account.id);

        data.accounts[index] = account;
        await writeFile(global.fileName, JSON.stringify(data))

        res.send(account);
    }catch(err){
        next(err);
    }
}

async function updateBalance(req,res,next){
    try {
        const account = req.body;
        const data = JSON.parse(await readFile(global.fileName))
        
        const index = data.accounts.findIndex(a => a.id === account.id);

        data.accounts[index].balance = account.balance;
        await writeFile(global.fileName, JSON.stringify(data))

        res.send(data.accounts[index]);
    }catch(err){
       next(err);
    }
}

export default {
    createAccount,
    getAccount,
    getAccountById,
    deleteAccount,
    updateAccount,
    updateBalance
};