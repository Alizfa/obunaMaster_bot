const TelegramBot = require("node-telegram-bot-api");
const token = "7271483081:AAEIUtU0rCiMyW67qsGtfp7nherEUffNESM"; // Bu yerga o'z botingizning tokenini kiriting
const bot = new TelegramBot(token, { polling: true });

// Start komandasi uchun xabar
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Instagram", callback_data: "instagram" }],
        [{ text: "Telegram", callback_data: "telegram" }],
        [{ text: "TikTok", callback_data: "tiktok" }],
        [{ text: "Telegram Premium", callback_data: "premium" }],
      ],
    },
  };
  bot.sendMessage(chatId, "Kerakli bo'limni tanlang:", opts);
});

// Tugmalar bosilganda ishlovchi funksiyalar
bot.on("callback_query", (callbackQuery) => {
  const message = callbackQuery.message;
  const data = callbackQuery.data;

  if (data === "instagram") {
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Obunachi qo'shish", callback_data: "instagram_add" }],
          [{ text: "Video ko'rish", callback_data: "instagram_video" }],
          [{ text: "Story ko'rish", callback_data: "instagram_story" }],
          [{ text: "Reels like", callback_data: "instagram_reels" }],
        ],
      },
    };
    bot.sendMessage(message.chat.id, "Instagram bo'limi:", opts);
  } else if (data === "instagram_add") {
    bot.sendMessage(
      message.chat.id,
      `1000 ta obunachi narxi 9000 sum.
🚫Obunani bekor qilish: 0%
♻️Kafolat va qayta tiklash: 60 kun
🗣Profil ochiq bo'lishi kerak.
📎Profil havolasi yuboring. Misol uchun: @muhammadali.ibrokhimov`
    );
  } else if (data === "telegram" || data === "tiktok" || data === "premium") {
    bot.sendMessage(message.chat.id, "Operator siz bilan bog'lanadi...");
  } else if (data === "pay_now") {
    bot
      .sendMessage(
        message.chat.id,
        `Ushbu kartaga to'lov qiling: 
Muhammadali Ibroximov 
4187 8000 1374 6094 
06/26`
      )
      .then(() => {
        const opts = {
          reply_markup: {
            inline_keyboard: [
              [{ text: "To'lov qildim", callback_data: "payment_done" }],
            ],
          },
        };
        bot.sendMessage(
          message.chat.id,
          "To'lovni amalga oshirgandan so'ng, quyidagi tugmani bosing:",
          opts
        );
      });
  } else if (data === "pay_later") {
    bot.sendMessage(message.chat.id, "Siz bilan keyinroq bog'lanamiz.");
  } else if (data === "payment_done") {
    bot.sendMessage(
      message.chat.id,
      "To'lovingiz uchun rahmat! Tez orada obunachilar keladi."
    );
  }
});

// Text messages
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.startsWith("@")) {
    const profile = text.trim().replace("@", "");
    bot.sendMessage(chatId, "Obunachi miqdorini kiriting: misol uchun: 1000");
  } else if (/^\d+$/.test(text)) {
    const amount = parseInt(text);
    const price = amount * 9;
    bot
      .sendMessage(chatId, `Obunachi qo'shish narxi: ${price} sum bo'ldi`)
      .then(() => {
        const opts = {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Hozir", callback_data: "pay_now" }],
              [{ text: "Keyinroq", callback_data: "pay_later" }],
            ],
          },
        };
        bot.sendMessage(chatId, "Hozir to'lov qilasizmi yoki keyinroq?", opts);
      });
  } else {
    bot.sendMessage(chatId, "Xato xabar!");
  }
});
