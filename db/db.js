const {connect} = require('mongoose');

const dbConnection = () => {
    connect('mongodb://root:admin@localhost/authentification?authSource=admin&useUnifiedTopology=true',{ 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
}

module.exports = dbConnection