const { getAllLostItems, checkClaimed, deleteLostItem} = require('../services/lostItems.service');
const { getLostItemsDTO } = require('../dto/lostItems.dto');
const ejs = require('ejs');
const {mailSenderService} = require('../services/mail.service');
const {getUser} = require('../services/user.service');

module.exports.getItems = async (req, res) => {
  const searchFields = req.query;
  try {
    const { document, count } = await getAllLostItems(searchFields, getLostItemsDTO.selectedFields);
    const data = document.map(getLostItemsDTO.execute);
    res.send({ data, count });
  } catch (err) {
    console.log(err);
  }
};

module.exports.foundIt = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const document = await checkClaimed({ id, user });
    if (document) {
      res.send({ status: 1, data: document });
      const mailOptions = {
        from:"Lost and Found",
        to: document.submittedBy,
        subject: "Claimed Item",
      };
      const dir = __dirname.split('\\');// jab production mai jayenge toh yaha / yeh add krna pdega 
      console.log(dir);
      dir.pop();
      console.log(__dirname);

      ejs.renderFile(dir.join('/') + '/views/claim.ejs', {user: req.user}, (err, data) => {
        if (err)
          console.log(err);
        else
          mailOptions.html = data;
        mailSenderService(mailOptions, data);
      });

      const mailOptions1 = {
        from:"Lost and Found",
        to: req.user.email,
        subject: "Claimed Item",
      };

      const user = await getUser(document.submittedBy);

      ejs.renderFile(dir.join('/') + '/views/claim.ejs', {user: user}, (err, data) => {
        if (err)
          console.log(err);
        else
          mailOptions1.html = data;
        mailSenderService(mailOptions1, data);
      });

    } else res.send({ status: 0, data: null });
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteItem =  async (req, res) => {
  try{
    const { id } = req.params;
    const user = req.user;
    const document = await deleteLostItem({ id, user });
    if(document === 200)
      res.status(200).send('deleted');
    else if(document === 401)
      res.status(401).send("You cannot delete as you are not the author");
    else if(document === 404)
      res.status(404).send("Item not found");
  }catch (e) {
    console.log(e);
    res.status(500).send({message: 'Internal Server Error'});
  }
}
