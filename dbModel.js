import mongoose from "mongoose";

const TikTokSchema = mongoose.Schema({
    url: String,
    likes: Number,
    shares: Number,
    messages: Number,
    channel: String,
    description: String,
    song: String
});

export default mongoose.model("TikTok_Video", TikTokSchema)