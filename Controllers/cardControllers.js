const server = require('../db');
// const pool = server.openDB()

const queryAll = 'SELECT * FROM card';
const queryThree = 'SELECT * FROM card ORDER BY RANDOM() LIMIT 3';
const queryInsertCard =
  'INSERT INTO card_owner (user_id, card_id) VALUES ($1, $2)';

exports.getAllCards = async (req, res) => {
  const pool = server.openDb();

  pool.query(queryAll, (error, result) => {
    if (error) {
      res.statusMessage = 'Something went wrong with the DB. Try again later.';
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json(result.rows);
  });
};

exports.getThreeCards = async (req, res) => {
  const pool = server.openDb();

  pool.query(queryThree, (error, result) => {
    if (error) {
      res.statusMessage = 'Something went wrong with the DB. Try again later.';
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json(result.rows);
  });
  await pool.query('UPDATE users SET gems = gems - 200 WHERE id = $1', [req.user.id])
};

exports.insertCard = async (req, res) => {
  try {
  const pool = server.openDb();

  await pool.query(queryInsertCard, [req.user.id, req.body.id]);

  res.status(200).json({ message: 'done' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserCollection = async (req, res) =>{
  try{
    const pool = server.openDb() 

     pool.query('select * from card_owner join card on card_owner.card_id = card.id where user_id = $1', [req.user.id], (err, cards) =>{
      res.status(200).json({userCards: cards.rows})
    })
  } catch(err){
    res.status(500).json({ error: err.message });
  }
}

exports.buyCard = async (req, res) =>{
  try{
    const pool = server.openDb()
    const cardID = req.params.id * 1;
    const userID = req.user.id;

    const user = await pool.query('SELECT * FROM users WHERE id = $1', [userID])
    if(!user.rows.length){
      return res.status(404).json({status: 'fail', message: 'User not found'})
    }
    const userBalance = user.rows[0].gems;

    const card = await pool.query('SELECT * FROM card WHERE id = $1',[cardID])
    if(!card.rows.length){
      return res.status(404).json({status: 'fail', message: 'Card not found'})
    }
    const cardPrice = card.rows[0].price

    if(cardPrice > userBalance){
      return res.status(405).json({status: 'fail', message: `Please purchase more gems to buy ${card.rows[0].name}`})
    }
    pool.query('UPDATE users SET gems = gems - $1 WHERE id = $2', [cardPrice, userID])

    pool.query(queryInsertCard, [userID, cardID], (err, result)=>{
      res.status(200).json({status: 'success'})
    })
  }catch(err){
    res.status(500).json({status: 'error',message: err.message})
  }
}