// models/ShortLink.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IShortLink extends Document {
    url: string;
    shortcode: string;
    createdAt: Date;
}

const ShortLinkSchema = new Schema<IShortLink>({
    url: { type: String, required: true },
    shortcode: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

export const ShortLink = mongoose.models.ShortLink || mongoose.model<IShortLink>("ShortLink", ShortLinkSchema);