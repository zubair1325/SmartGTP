import express from "express";
import Thread from "../models/thread.js";
import wrapAsync from "../utils/wrapAsync.js";
import getOpenAIResponse from "../utils/openai.js";
import ExpressError from "../utils/ExpressError.js";

const router = express.Router();

router.post(
  "/test",
  wrapAsync(async (req, res) => {
    const data = new Thread({
      threadId: "xyz",
      title: "new testing xyz2",
    });
    const saveData = await data.save();
    console.log(saveData);
    res.send(saveData);
  }),
);
router.get(
  "/thread",
  wrapAsync(async (req, res) => {
    let allThreads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(allThreads);
  }),
);
router.get(
  "/thread/:threadId",
  wrapAsync(async (req, res) => {
    let { threadId } = req.params;
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
  wrapAsync(async (req, res) => {
    let { threadId, message } = req.body;
    if (!threadId || !message) {
      throw new ExpressError("missing required fields!", 400);
    }
    console.log("user message =" + message);
    let isThread = await Thread.findOne({ threadId });
    if (!isThread) {
      isThread = new Thread({
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
      isThread.message.push({ role: "user", content: message });
    }
    const assistanceReply = await getOpenAIResponse(message);
    console.log(assistanceReply.choices[0].message.content);

    isThread.message.push({
      role: "assistance",
      content: assistanceReply.choices[0].message.content,
    });
    isThread.updatedAt = new Date();
    await isThread.save();
    res.json({ reply: assistanceReply.choices[0].message.content });
  }),
);

export default router;
