const jwt = require('jsonwebtoken');
const {
  getGoogleOAuthTokens,
  addUser,
  decodeToken,
} = require('../services/user.service');
const {
  createToken,
  createTokenProfile,
} = require('../services/auth.service');
require('dotenv')
  .config();

const googleLogin = async (req, res) => {
  try {
    const code = req.body.tokenId;
    const resp = await getGoogleOAuthTokens(code);
    console.log("yaha login ho rha hai")
    console.log(resp);
    // eslint-disable-next-line camelcase
    const { id_token } = resp.data;
    const user = jwt.decode(id_token, { complete: false });

    user.access_token = resp.data.access_token;
    user.refresh_token = resp.data.refresh_token;
    // user.roll = user.email.split('.')[1];
    // console.log(user.email);
    // user.roll=user.email.match(/\.(\d+me)/)[1];
    const match = user.email.match(/\.(\d+me)@/);
    // console.log(match);

  if (match && match[1]) {
    user.roll = match[1];
    console.log(match[1])
  } else {
    console.error(`No match found in email: ${user.email}`);
    user.roll = 'unknown';  // Set to a default value or handle appropriately
  }

    user.registeredAt = user.iat;
    console.log(user)
    const person = await addUser(user);
    const token = person.hallNumber ? await createTokenProfile(person) : await createToken(person);
    const userData = decodeToken(token);
    userData.exp = new Date(Date.now() + 1800000);
    console.log(process.env.NODE_ENV === 'production');
    res.status(202)
      .cookie('token', token, {
        expires: new Date(Date.now() + 1800000),
        httpOnly: true,
        sameSite: process.env.NODE_ENV==='production'? 'none': 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
      .send({ userData });
  } catch (error) {
    console.log(error);
    res.status(500)
      .send({ error });
  }
};

const logout = (req, res) => {
  res.clearCookie('token')
    .sendStatus(200);
};

module.exports = {
  googleLogin,
  logout,
};
