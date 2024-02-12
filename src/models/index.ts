import paginate from "./plugins/paginate.plugin";
import toJSON from "./plugins/toJSON.plugin";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    workspaces: [
      {
        isLogin: {
          type: Boolean,
          default: false,
        },
        refreshToken: {
          type: String,
        },
        value: {
          type: String,
          required: [true, "Please provide value"],
          lowercase: true,
          trim: true,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],
    avatar: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      trim: true,
      immutable: true,
    },
    modelsKey: {
      type: String,
      unique: true,
      required: [true, "Please provide modelsKey Key"],
      trim: true,
      lowercase: true,
      immutable: true,
    },

    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
    },

    accountStatus: {
      type: String,
      enum: ["free", "premium", "gold", "pro"],
      default: "free",
      required: [true, "Please provide account status"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword: any) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

// add plugin that converts mongoose to json

UserSchema.plugin(toJSON); // plugin => add /: on create pass
UserSchema.plugin(paginate);

export default (prefix: string) =>
  mongoose.model(prefix + ".users", UserSchema);
