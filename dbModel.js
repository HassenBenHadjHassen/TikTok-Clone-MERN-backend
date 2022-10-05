import mongoose from "mongoose";

const TikTokSchema = mongoose.Schema({
    url: String,
    likes: String,
    shares: String,
    messages: String,
    channel: String,
    description: String,
    song: String
});

export default mongoose.model("TikTok_Video", TikTokSchema)