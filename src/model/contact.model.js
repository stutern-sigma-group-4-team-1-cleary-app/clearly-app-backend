import mongoose from "mongoose";

const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  phoneNumber: {
    required: true,
    type: String,
  },
  hasAnAccount: {
    type: Boolean,
    required: true,
  },
  belongsTo: [
    {
      type: Types.Schema.ObjectId,
      ref: "User",
    },
  ],
});

const Contact = model("Contacnt", contactSchema);

export default Contact;
