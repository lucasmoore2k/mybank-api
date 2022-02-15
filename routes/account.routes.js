import express from 'express';
import AccountController from '../controllers/account.controller.js';

const router = express.Router();

router.get('/', AccountController.getAccount);
router.get('/:id', AccountController.getAccountById);
router.post('/', AccountController.createAccount);
router.delete('/:id', AccountController.deleteAccount);
router.patch('/updateBalance', AccountController.updateAccount);
router.put('/:id', AccountController.updateBalance);

router.use('/', (error,req,res,next) =>{
    console.log(error)
    res.status(400).send({error: err.message });
})


export default router;