async function createAccount(account) {
    const data = JSON.parse(await readFile(global.fileName))
    account = { id: data.nextId++, ...account};
    data.accounts.push(account);

    await writeFile(global.fileName , JSON.stringify(data));

    return account;
}

export default {
    createAccount
}