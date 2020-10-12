const User = require('@db/models/UserModel')

const registerOrUpdateUser = async (accessToken, profile) => {
  const userData = {
    familyName: profile.name.familyName
      ? profile.name.familyName
      : profile.family_name,
    givenName: profile.name.givenName
      ? profile.name.givenName
      : profile.given_name,
    providerId: profile.id,
    email:
      profile.emails !== undefined ? profile.emails[0].value : profile.email,
    picture:
      profile.photos !== undefined ? profile.photos[0].value : profile.picture,
    provider: profile.provider,
    token: accessToken,
  }

  return User.findOneAndUpdate({ providerId: userData.providerId }, userData, {
    new: true,
    upsert: true,
  })
}

module.exports = { registerOrUpdateUser }
