export type WhySection = {
  title: string;
  items: readonly string[];
};

export type WhyData = {
  want: WhySection;
  staySame: WhySection;
};

export const whyData = {
  want: {
    title: "Why I want to make it",
    items: [
      "I'll be wealthy. I will be able to buy whatever I want, no limits or price tags ever.",
      "I'll be able to provide and protect my family and loved ones forever. I'll be able to pay my parents back for everything they've done for me and let them reap the benefits of investing so much in me.",
      "I'll be very attractive and will be sought out.",
      "I'll be completely independent. I'll have freedom. I can do whatever I want.",
      "I'll be able to say I've accomplished what I've always wanted and be proud of myself.",
      "I want to live an exceptional and unique and unforgettable life.",
      "I will be remembered in history.",
      "I will leave an impact and will leave a ripple in time and space. I will have had use, meaning, a purpose, an impact.",
      "I will earn respect and awe from everyone. I will be admired.",
      "I'll have real power to make anything happen and make any other dreams or hobbies come to fruition.",
      "I will be able to meet and connect with anyone. I'll be able to join my idols.",
    ],
  },
  staySame: {
    title: "Why I don't want to stay the same",
    items: [
      "I don't have financial freedom. Money (the lack of it) controls my life. I'm not free. Always limited by money.",
      "I can't do everything I want to do. I can't do whatever I want. I don't have time freedom.",
      "I am unable to give my family and loved ones an exceptional life. I'm unable to pay back my parents for all they've done.",
      "I'd be disrespecting all my parents hard work and efforts.",
      "I am no one, powerless. Just another person.",
      "No one knows who I am.",
      "I keep feeling like I'm wasting my potential. Like I'm capable of great things. I don't want to have wasted my life.",
      "I can't just get anyone I want now.",
      "I will be forgotten after I die.",
      "I will never experience the 0.001% lifestyle.",
      "I will never meet any of my idols or be able to connect with great, unique, and successful people.",
    ],
  },
} as const satisfies WhyData;
