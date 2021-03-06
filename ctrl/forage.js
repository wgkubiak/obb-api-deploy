const Forage = require("../models/forage");

exports.getForageData = (require, result, next) => {
  const id = parseInt(require.params.id);

  Forage.findAll( {
    attributes: [
      "idPen",
      "fgAbout",
      "fgQty", 
      "fgPrice",
      "creationDate",
      "producer",
      "expiration"
    ]
  }
    ,{
      where: {
        idPen: id
      }
    })
    .then(forage => {
      result.status(200).json(forage);
    })
    .catch(error => {
      result.status(400).json({error: error})
    });
};


exports.getForageDataLast = (require, result, next) => {
  const id = parseInt(require.params.id);

  Forage.findAll({
    limit: 1,
    order: [
      ["creationDate", "DESC"]
    ],
      where: {
        idPen: id
      }
    })
    .then(forage => {
      result.status(200).json(forage);
    })
    .catch(error => {
      result.status(400).json({error: error})
    });
};


//TODO Get all/latest forage for every ID (ask if there is more than one)

exports.postAddForage = (require, result, next) => {
  const penID = require.body.idPen;
  const forageAbout = require.body.fgAbout;
  const forageQty = require.body.fgQty;
  const foragePrice = require.body.fgPrice;
  const creationDate = require.body.creationDate;
  const producer = require.body.producer;
  const expiration = require.body.expiration;

  Forage.create({
      idPen: penID,
      fgAbout: forageAbout,
      fgQty: forageQty,
      fgPrice: foragePrice,
      creationDate: creationDate,
      producer: producer,
      expiration: expiration
    })
    .then(out => {
      console.log(out);
    })
    .catch(error => {
      result.status(400).json({error: error})
    });
};

exports.postEditForage = (require, result, next) => {
  const id = parseInt(require.params.id);

  const upPenID = require.body.idPen;
  const upForageAbout = require.body.fgAbout;
  const upForageQty = require.body.fgQty;
  const upForagePrice = require.body.fgPrice;
  const upCreationDate = require.body.creationDate;
  const upProducer = require.body.producer;
  const upExpiration = require.body.expiration;

  Forage.update({
      idPen: upPenID,
      fgAbout: upForageAbout,
      fgQty: upForageQty,
      fgPrice: upForagePrice,
      creationDate: upCreationDate,
      producer: upProducer,
      expiration: upExpiration
    }, {
      where: {
        id: id
      }
    })
    .then(res => {
      result.send(`Updated ${res}`);
    })
    .catch(error => {
      result.status(400).json({error: error})
    });
};

exports.deleteForage = (require, result, next) => {
  const id = parseInt(require.params.id);

  Forage.destroy({
      where: {
        id: id
      }
    })
    .then(res => {
      result.send(`Updated ${res}`);
    })
    .catch(error => {
      result.status(400).json({error: error})
    });
};