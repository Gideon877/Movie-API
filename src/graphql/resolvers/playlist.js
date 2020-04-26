// const bcrypt = require('bcrypt');

// const Event = require('../../models/event');
// const PlayList = require('../../models/playlist');
// const { transformEvent, transformPlaylist } = require('./merge');


// module.exports = {
//     playlists: async (args, req) => {
//         if(!req.isAuth) {
//             throw new Error('Unauthencticated');
//         }
//         // try {
//         //     const bookings = await PlayList.find();
//         //     return bookings.map(booking => {
//         //         return transformBooking(booking)
//         //     })
//         // } catch (error) {
//         //     throw error;
//         // }
//     },
    
    
//     addToList: async (args, req) => {
//         if(!req.isAuth) {
//             throw new Error('Unauthencticated');
//         }
//         // try {
//         //     const fetchedEvent = await Event.findOne({ _id: args.eventId });
//         //     const booking = new Booking({
//         //         user: req.userId,
//         //         event: fetchedEvent
//         //     })

//         //     const result = await PlayList.save();
//         //     return transformBooking(result);
//         // } catch (error) {
//         //     throw error;
//         // }
//     },

//     removeFromList: async (args, req) => {
//         if(!req.isAuth) {
//             throw new Error('Unauthencticated');
//         }
//         // try {
//         //     const booking = await Booking
//         //         .findById(args.bookingId)
//         //         .populate('event');

//         //     const event = transformEvent(PlayList.event)

//         //     await PlayList.deleteOne({ _id: args.bookingId })
//         //     return event;

//         // } catch (error) {
//         //     throw error;
//         // }
//     },

    
  
// }