const express = require("express");
const router = express.Router();
const axios = require("axios");
const Event = require("../models/Event");
const generateOTP = require("../otp/otp");
const sendOTP = require("../otp/mailer");

let storedOTP = null;  
let otpExpirationTime = null; 

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

router.post("/generate-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const otp = generateOTP();  
  storedOTP = otp;  
  otpExpirationTime = Date.now() + 5 * 60 * 1000;  

  await sendOTP(email, otp);  

  return res.status(200).json({ message: 'OTP sent to your email' });
});


router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json({ error: 'OTP is required' });
  }


  if (Date.now() > otpExpirationTime) {
    return res.status(400).json({ error: 'OTP has expired' });
  }


  if (otp === storedOTP) {
    return res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
});

router.post("/fetch-events", async (req, res) => {
  const { city, type } = req.body;

  if (!city || !type) {
    return res.status(400).json({ error: "City and type are required" });
  }

  try {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&city=${city}&classificationName=${type}`;
    const response = await axios.get(url);
    const events = response.data._embedded?.events || [];

    let newEvents = [];

    for (let event of events) {
      const exists = await Event.findOne({ id: event.id });
      if (!exists) {
        const imageUrl = event.images?.[0]?.url || "";

        const newEvent = new Event({
          id: event.id,
          name: event.name,
          city: city,
          genre: type,
          date: event.dates.start.localDate,
          url: event.url,
          image: imageUrl,
        });

        await newEvent.save();
        newEvents.push(newEvent);
      }
    }

    if (newEvents.length === 0) {
      return res.json({ message: "No new updates", stored: false });
    }

    res.json({ message: "New events saved", stored: true, newEvents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

router.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json({ events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events from database" });
  }
});

module.exports = router;
