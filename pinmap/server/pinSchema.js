const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
    name: { type: String, required: true },
    loc: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    creationTime: { type: Date, default: Date.now },
}, { collection: 'pins' });


pinSchema.index({ loc: '2dsphere' });


const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;