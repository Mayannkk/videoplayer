import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'; // mongoose aggregate pipeline

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      //   index: true,
    },
    description: {
      type: String,
    },
    videoFile: {
      type: String, //cloudinary video URL
      required: true,
    },
    thumbnail: {
      type: String, //cloudinary image URL
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    duration: {
      type: Number,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate); // now we can add aggregation queries.
export const Video = mongooose.model('Video', videoSchema);
