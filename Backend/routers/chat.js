import express from "express";
import Thread from "../models/thread.js";
import wrapAsync from "../utils/wrapAsync.js";
import getOpenAIResponse from "../utils/openAi.js";
import ExpressError from "../utils/ExpressError.js";
import protect from "../middleware/protect.js";
import multer from "multer";
import fs from "fs";
import Groq from "groq-sdk";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

const router = express.Router();

ffmpeg.setFfmpegPath(ffmpegPath);

// ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const upload = multer({
  dest: "uploads/",
});
// ---------------
router.get(
  "/thread",
  protect,
  wrapAsync(async (req, res) => {
    console.log(req.user);

    let allThreads = await Thread.find({
      threadOwnerId: req.user._id,
    }).sort({ updatedAt: -1 });

    res.json(allThreads);
  }),
);
router.get(
  "/thread/:threadId",

  wrapAsync(async (req, res) => {
    let { threadId } = req.params;
    console.log(req.user);
    const oneThread = await Thread.findOne({ threadId });
    if (!oneThread) {
      throw new ExpressError("Chat not found!", 404);
    }
    res.json(oneThread.message);
  }),
);
router.delete(
  "/thread/:threadId",
  wrapAsync(async (req, res) => {
    let { threadId } = req.params;
    let deleteThread = await Thread.findOneAndDelete({ threadId });
    if (!deleteThread) {
      throw new ExpressError("Chat not found!", 404);
    }
    console.log(deleteThread);
    res.status(200).json({ success: "Chat delete successfully" });
  }),
);

router.post(
  "/chat",
  protect,
  wrapAsync(async (req, res) => {
    let { threadId, message } = req.body;
    if (!threadId || !message) {
      throw new ExpressError("missing required fields!", 400);
    }

    console.log("user message =", message);
    let isThread = await Thread.findOne({
      threadId,
      threadOwnerId: req.user._id,
    });

    if (!isThread) {
      isThread = new Thread({
        threadOwnerId: req.user._id,
        threadId,
        title: message,
        message: [
          {
            role: "user",
            content: message,
          },
        ],
      });
    } else {
      isThread.message.push({
        role: "user",
        content: message,
      });
    }

    const assistanceReply = await getOpenAIResponse(message);

    console.log(assistanceReply.choices[0].message.content);

    isThread.message.push({
      role: "assistance",
      content: assistanceReply.choices[0].message.content,
    });

    isThread.updatedAt = new Date();

    await isThread.save();

    res.json({
      reply: assistanceReply.choices[0].message.content,
    });
  }),
);

router.get(
  "/thread/:threadId/owner",
  protect,
  wrapAsync(async (req, res) => {
    const { threadId } = req.params;

    const thread = await Thread.findOne({
      threadId,
    });

    if (!thread) {
      throw new ExpressError("Thread not found", 404);
    }

    const isOwner = thread.threadOwnerId.toString() === req.user._id.toString();

    res.json({
      success: true,
      isOwner,
    });
  }),
);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/speech-to-text", upload.single("audio"), async (req, res) => {
  try {
    console.log("FILE RECEIVED:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No audio file received",
      });
    }

    // convert webm → wav
    const wavPath = req.file.path + ".wav";

    await new Promise((resolve, reject) => {
      ffmpeg(req.file.path)
        .toFormat("wav")
        .audioFrequency(16000)
        .audioChannels(1)
        .on("end", resolve)
        .on("error", reject)
        .save(wavPath);
    });

    // send to Groq
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(wavPath),
      model: "whisper-large-v3-turbo",
      response_format: "json",
      language: "en",
    });

    // cleanup files
    fs.unlinkSync(req.file.path);
    fs.unlinkSync(wavPath);

    res.json({
      success: true,
      text: transcription.text,
    });
  } catch (error) {
    console.log("SPEECH ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
export default router;
