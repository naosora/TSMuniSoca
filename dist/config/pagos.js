/* import express = require('express');
import { Router } from 'express'
const router = Router();

const pool = require('../databas')



router.get('/add', (req, res) => {
    res.render('links/add');
});
router.post('/add',async  (req, res) => {
    const { cantidad, idtipo } = req.body;
    const newlink = {
        cantidad,
        idtipo,
       
    };
    //console.log(newlink);
   await pool.query('INSERT INTO pagoscaja set ?',[newlink]);
    res.json('REcibido');
});


export default router; */ 
