const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const AccountSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  name: String,
  password: String,
}, { timestamps: true })

AccountSchema.pre('save', async function (next) {
  const account = this
  if (account.isModified('password')) {
    const hash = await bcrypt.hash(account.password, 10)
    account.password = hash
  }
})

module.exports = mongoose.model('Accounts', AccountSchema)
