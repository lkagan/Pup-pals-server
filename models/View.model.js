const { Schema, model } = require("mongoose");

const viewSchema = new Schema({
        viewed_by: {
            type: Schema.Types.ObjectId,
            ref: "Dog",
            required: true
        },
        viewed_for: {
            type: Schema.Types.ObjectId,
            ref: "Dog",
            required: true
        },
        liked: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

viewSchema.index({ viewed_by: 1, viewed_for: 1 }, {unique: true});

const View = model("View", viewSchema);

module.exports = View;
