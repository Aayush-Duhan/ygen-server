const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }  // ✅ Store password as plain text
}, { timestamps: true });

// ✅ Remove hashing before saving (TEMPORARY DEBUGGING ONLY)
UserSchema.pre('save', async function (next) {
  next();  // Skip hashing, store password as plain text
});

// ✅ Simple password comparison (TEMPORARY DEBUGGING ONLY)
UserSchema.methods.comparePassword = async function (enteredPassword) {
  console.log("🔹 Comparing Passwords (Plain Text):");
  console.log("   Entered:", `"${enteredPassword}"`);
  console.log("   Stored in DB:", `"${this.password}"`);
  
  return enteredPassword === this.password;  // ✅ Direct string comparison
};

const User = mongoose.model('User', UserSchema);
module.exports = User;