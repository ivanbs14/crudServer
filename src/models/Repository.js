import { mongoose } from 'mongoose';

const { Schema, ObjectId } = mongoose;

const repositorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
            unique: true
        },
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Repository', repositorySchema);