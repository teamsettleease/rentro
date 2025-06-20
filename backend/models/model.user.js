const {Schema, model} = require("mongoose");
const {createHmac, randomBytes} = require("crypto");
const { generateUserToken } = require("../services/services.authentication");

const userSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profileImageUrl:{
        type:String,
        default: "/images/default.png"
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Tanent", "Landlord", "Enterprise"],
        default: "Tanent"
    },
        isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});


userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified("password")) return next();

    const salt = randomBytes(16).toString();
    const hashPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex")

    this.salt = salt;  
    this.password = hashPassword;

    next();
 
})

userSchema.static("matchPasswordandGenerateToken", async function(email, password){
    const user = await this.findOne({email});

    if(!user) throw new Error("User not found");

    const salt = user.salt;
    const hashPassword = user.password;

    const userProvidedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    if( hashPassword !== userProvidedPassword) throw new Error("password didn't match");

    const token = generateUserToken(user);
    return token;
})



const User = model("user",userSchema);

module.exports = User;