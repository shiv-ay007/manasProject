import { model, Schema } from "mongoose"

const crafterSchema=new Schema(
    {
        name:{
            type:String
        },
        email:{
            type:String
        },
        phoneNumber:{
            type:String
        },
        message:{
            type:String
        }     
    },
    {
        timestamps:true
    }
)

// const crafterModel=model("Code_Crafter_Review",crafterSchema)
const createCrafterModel = (connection) => connection.model('Crafter_Review', crafterSchema);

export default createCrafterModel;

// export default crafterModel

