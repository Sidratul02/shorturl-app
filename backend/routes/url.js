import express from "express";
import Url from "../models/Url.js";
import { nanoid } from "nanoid";

const router = express.Router();


router.post("/shorten", async (req, res) => {

    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ error: "originalUrl is required" });
        }

        try{
            new URL(originalUrl);
        }
        catch (error) {
            return res.status(400).json({ error: "Invalid URL format" });
        }

        let shortId;
        let exists = true;

        while (exists) {
            shortId = nanoid(7);
            exists = await Url.exists({ shortId });
        }
         
        const url = await Url.create({
            shortId, originalUrl
        });

        res.json({
            shortId: url.shortId,
            shortUrl: `${process.env.BASE_URL}/${shortId}`,
            clicks: url.clicks,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "server error" });
    }
});

router.get("/:shortId", async (req, res) => {
    try {
        const { shortId } = req.params;   


        const url = await Url.findOne({ shortId });
        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }
        url.clicks += 1;
        await url.save();
        return res.redirect(url.originalUrl);  
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }

    });

export default router;