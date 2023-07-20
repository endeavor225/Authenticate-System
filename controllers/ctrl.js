const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/model');
const userValidation = require('../validation/validation')

/**
 * 
 * @param {'express.Resquest'} req 
 * @param {'express.Response'} res 
 */

exports.inscription = (req, res) => {

    // ** Recuperer les donnees
    const {body} = req

    // ** Validation des donnees
    const {error} = userValidation(body).userValidationSignUp
    if(error) return res.status(401).json(error.details[0].message)

    // ** Hash du mot de passe
    bcrypt.hash(body.password, 10)
    .then((hash) => {
        if(!hash) return res.status(500).json({msg: "Server Error"})

        delete body.password // Supprimer le mot de passe
        new User({...body, password: hash})
        .save()
        .then((user) => {
            console.log(user)
            res.status(201).json({msg: "User saved"})
        })
        .catch((error) => res.status(500).json(error))
    })
    .catch((error) => res.status(500).json(error))
    
}

exports.connexion = async (req, res) => {
    const {email, password} = req.body

    // ** Validation des donnees
    const {error} = userValidation(req.body).userValidationLogin
    if(error) return res.status(401).json(error.details[0].message)

    // ** Trouver le user dans la base de donnees
    User.findOne({email: email})
    .then((user) => {
        if(!user) return res.status(404).json({msg: "User noot found"})
        
        // ** Vérification du mot de passe
        bcrypt.compare(password, user.password)
        .then((match) => {
            if(!match) return res.status(500).json({msg: "Server Error"})
            res.status(200).json({
                email: user.email,
                id: user.id,
                token: jwt.sign({id: user.id}, "SECRET_KEY", {expiresIn: "12h"})
            })
        })
        .catch((error) => res.status(500).json(error))
    })
    .catch((error) => res.status(500).json(error))
}