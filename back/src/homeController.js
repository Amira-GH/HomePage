import { ObjectID } from 'mongodb';

const homeController = (collection) => {

  const getHomeDivs = async () => {
    try {
      let homeDivs = await collection.find().toArray();
      return homeDivs;
    } catch (e) {
      throw new Error("Was not able to retrieve home Divs");
    }
  }

  const getHomeProjects = async () => {
    try {
      let homeProjects = await collection.find({}, {sort: { date: -1 }}).toArray();
      return homeProjects;
    } catch (e) {
      throw new Error("Was not able to retrieve home projects");
    }
  }

  const updateHome = async (Id, updates) => {

    console.log("test",updates)
    await collection.updateMany({ _id: ObjectID(Id) }, {
      $set: updates
    });
    let update = await collection.findOne({ _id: ObjectID(Id) });
    return update;
  }

  // let home = await collection.find({}, {sort: { date: -1 }}).toArray();

//   const createContact = async (contact) => {
//     await collection.insertOne(contact);
//     let contacts = await collection.find().toArray();
//     return contacts;
//   }

//   const updateContact = async (contactId, updates) => {
//     await collection.updateOne({ _id: ObjectID(contactId) }, {
//       $set: updates
//     });
//     let contact = await collection.findOne({ _id: ObjectID(contactId) });
//     return contact;
//   }

//   const deleteContact = async (contactId) => {
//     await collection.deleteOne({ _id: ObjectID(contactId) });
//     let contacts = await collection.find().toArray();
//     return contacts;
//   }

  const controller = {
    getHomeDivs,
    getHomeProjects,
    // createContact,
    updateHome,
    // deleteContact
  }

  return controller;
}

export default homeController;