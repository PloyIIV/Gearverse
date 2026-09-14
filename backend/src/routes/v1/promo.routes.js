import { Router } from "express";
import { Promo } from "../../models/promocode.model.js";

export const promoRouter = Router();

promoRouter.get('/', async (req, res, next) => {
    try {
        const response = await Promo.find()
        console.log(response)
        return res.json({
            response
        })
    } catch (error) {
        next(error)
    }
})

promoRouter.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const response = await Promo.create(req.body)
        console.log(response)
        return res.json({
            response
        })
    } catch (error) {
        next(error)
    }
})