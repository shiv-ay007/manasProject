import { model, Schema } from "mongoose";


const vistorSchema=new Schema(
    {
        count: { type: Number, default: 0 }
    },
    {
        timestamps:true
    }
)


const Visitor=model("VistorModel",vistorSchema)

export default Visitor

