import joi from 'joi';

export const newFileSchema = joi.object({
    title: joi.string().min(3).required(),
    description: joi.string().min(10).required(),
    csvlink: joi.string().uri().required(),
    keywords: joi.array().items(joi.string().min(3)).required()
})