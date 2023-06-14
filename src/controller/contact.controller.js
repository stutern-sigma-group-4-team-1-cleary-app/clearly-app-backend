import Contact from "../model/contact.model";
import { contactValidation } from "../validators/user.validator";
import { User } from "../model/user.model";
import Contact from "./../model/contact.model";

export const addContact = async (req, res) => {
  const { error } = contactValidation(req.body);
  if (!error) {
    const { contacts } = req.body;
    contacts.map(async (contact) => {
      const foundContact = await Contact.findOne({
        phoneNumber: contact.phoneNumber,
      });
      const foundUser = await User.findOne({ email: req.user });
      if (!foundContact) {
        const newContact = await new Contact({
          name: contact.name,
          phoneNumber: contact.phoneNumber,
        });
        newContact.push(foundContact._id);
        newContact.save();
        await foundUser.push(newContact._id);
        foundUser.save();
        return res.status(200).json({
          success: true,
          message: "New contact added",
          data: {},
        });
      }
    });
    const aUser = foundContact.contacts.filter((contact) => {
      return contact === foundContact._id;
    });
    if (!aUser) {
      foundUser.push(foundContact._id);
      foundUser.save();
      return res.status(200).json({
        success: true,
        message: "User's contact updated",
        data: {},
      });
    }

    //   const foundUser = await User.findOne({ email: req.user ,     belongsTo: { $in: [foundUser._id] },});
    //   const foundContact = await User.findOne({
    //     phoneNumber: contact.phoneNumber,
    //   });
  }
  return res.status(422).json({
    success: false,
    message: "Failed validation",
    data: error,
  });
};

export const getUserContacts = async (req, res) => {
  const foundUser = await User.findOne({ email: req.user });
  const userContact = await Contact.find({
    belongsTo: { $in: [foundUser._id] },
  });
  userContact.map(async (contact) => {
    const contactHasAccount = await User.findOne({
      phoneNumber: contact.phoneNumber,
    });
    if (contactHasAccount) {
      await Contact.update(
        { _id: contact._id },
        { $set: { hasAnAccount: true } }
      );
    }
  });
  const userContactList = userContact.filter((contact) => {
    return contact.hasAnAccount === true;
  });
  return res.status(200).json({
    success: true,
    message: "Contact List retrieved successfully",
    data: userContactList,
  });
};
