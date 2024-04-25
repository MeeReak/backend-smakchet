import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: {
    lat: { type: String, required: true },
    lng: { type: String, required: true }
  },
  category: { type: String, enum: ['category1', 'category2', 'category3'], required: true },
  thumbnail: { type: String, required: true },
  host_id: { type: String, required: true },
  description: { type: String, required: true },
  viewer: { type: Number, required: true },
  date: {
    startdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
    starttime: { type: Date, required: true },
    endtime: { type: Date, required: true }
  }
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
