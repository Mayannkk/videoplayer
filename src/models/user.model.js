import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'; // for password hashing
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary image URL
      required: true,
    },
    coverImage: {
      type: String, //cloudinary image URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

/**
 * Method to encrypt password before saving
 * pre() is a mongoose hook(middleware) that runs before saving(because we pass 'save') a document.
 * pre will accept a value for the event it should run, and a callback function that will run before the event.
 * Don't use arrow function here because we need to access 'this' context.
 * here 'this' refers to the userSchema.
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash the password if it has been modified (or set new password)

  this.password = await bcrypt.hash(this.password, 10); // Hash the password before saving
  next(); // Proceed to the next middleware
});

/**
 * Here mongoose gives us a object methods that we can use to add custom methods to the schema.
 * Here we are adding a method isPasswordCorrect to the userSchema. Normally like we add methods or propery to objects in javascript.
 *
 */
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare the provided password with the hashed password
};

userSchema.methods.generateAccessToken = function () {
  /**
   * This method generates an access token for the user.
   * It uses the user's id, email, userName, and fullName to create a JWT token.
   * jwt.sign() method takes three arguments:
   * 1. Payload: The data to be encoded in the token.
   * 2. Secret: A secret key used to sign the token.
   * 3. Options: An object that contains options for the token, such as expiry time.
   */
  return jwt.sign(
    {
      _id: this._id, // This id is given by mongoose when the user data is saved in database.
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET, // secret key to sign the token
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // token expiry time
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  // Refresh token will be generated exactly like access token.
  return jwt.sign(
    {
      _id: this._id, // This id is given by mongoose when the user data is saved in database.
    },
    process.env.REFRESH_TOKEN_SECRET, // secret key to sign the token
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // token expiry time
    }
  );
};

export const User = mongoose.model('User', userSchema);
