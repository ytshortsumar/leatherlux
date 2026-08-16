/* Content for the Customer Service pages (Shipping, Returns, FAQs, Privacy).
   Kept as plain data so one <Support topic="..." /> component can render each.
   Copy is written to match the store as built: free shipping, PKR pricing,
   cash on delivery, and the workshop in Dera Ghazi Khan. */

const supportContent = {
  shipping: {
    tag: 'Customer Service',
    heading: 'Shipping & Delivery',
    subtext: 'How and when your handcrafted leather order reaches you.',
    sections: [
      {
        heading: 'Free shipping across Pakistan',
        body: [
          'Every LeatherLux order ships free, anywhere in Pakistan — there are no delivery charges added at checkout, no matter the size of your order.',
        ],
      },
      {
        heading: 'Dispatch & delivery times',
        body: [
          'Because each piece is made and inspected by hand, we prepare your order for dispatch within 1–2 business days. Once it is on the way, delivery usually takes a further 3–5 business days depending on your city.',
        ],
      },
      {
        heading: 'Tracking your order',
        body: [
          'When your order is dispatched, we share tracking details on the phone number and email you provide at checkout, so you always know where your leather is.',
        ],
      },
      {
        heading: 'Collect from the workshop',
        body: [
          'Prefer to pick it up yourself? You are welcome to collect your order — and see how it is made — at our workshop: Shop No. 15, Near Pakistani Chowk, Dera Ghazi Khan.',
        ],
      },
    ],
  },

  returns: {
    tag: 'Customer Service',
    heading: 'Returns & Exchanges',
    subtext: 'Not quite right? Here is how to return or exchange your order.',
    sections: [
      {
        heading: 'Our 14-day promise',
        body: [
          'If something is not right, you can return or exchange it within 14 days of delivery. The item should be unused and in its original condition, with any tags and packaging intact.',
        ],
      },
      {
        heading: 'How to start a return',
        body: [
          'Reach out through our Contact page with your name and order details, and tell us whether you would like a return or an exchange. We will confirm the next steps and where to send the item.',
        ],
      },
      {
        heading: 'Exchanges',
        body: [
          'Want a different piece or size instead? Exchanges are welcome within the same 14-day window, subject to availability. If there is a price difference, we will settle it fairly before sending the replacement.',
        ],
      },
      {
        heading: 'Refunds',
        body: [
          'Once we receive your returned item and check its condition, we process your refund promptly. Natural variation in full-grain leather — grain, tone, and small marks — is a feature of the material, not a fault.',
        ],
      },
    ],
  },

  faq: {
    tag: 'Customer Service',
    heading: 'Frequently Asked Questions',
    subtext: 'Quick answers to the things customers ask us most.',
    faqs: [
      {
        q: 'Is your leather really full-grain?',
        a: 'Yes. Every LeatherLux piece is made from full-grain leather — the top, strongest layer of the hide, left unsanded so the natural grain stays intact. We never use bonded or plastic-coated “genuine” leather.',
      },
      {
        q: 'How do I care for my leather?',
        a: 'Keep it dry, wipe it with a soft cloth, and apply a little leather conditioner every few months. Avoid soaking it or leaving it in direct heat. Treated well, full-grain leather softens and develops a richer patina over the years.',
      },
      {
        q: 'Do you ship across Pakistan?',
        a: 'Yes — we offer free shipping nationwide. Orders are dispatched within 1–2 business days and usually arrive within 3–5 business days.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We offer cash on delivery: you place your order online, and pay when it reaches you. You can also arrange payment directly with our team when collecting from the workshop.',
      },
      {
        q: 'Can I return or exchange an item?',
        a: 'Yes. Unused items in original condition can be returned or exchanged within 14 days of delivery. See our Returns & Exchanges page for the full details.',
      },
      {
        q: 'Do you take custom orders?',
        a: 'We do take on select custom work. Send us a message through the Contact page or visit the workshop in Dera Ghazi Khan to talk through what you have in mind.',
      },
      {
        q: 'Where are you located?',
        a: 'Our workshop and store is at Shop No. 15, Near Pakistani Chowk, Dera Ghazi Khan, Pakistan. You are welcome to visit us.',
      },
    ],
  },

  privacy: {
    tag: 'Customer Service',
    heading: 'Privacy Policy',
    subtext: 'What information we collect, and how we look after it.',
    updated: 'August 2026',
    sections: [
      {
        heading: 'The short version',
        body: [
          'We only ask for the information we need to process your order and answer your questions, we keep it to ourselves, and we never sell it. This page explains that in plain terms.',
        ],
      },
      {
        heading: 'What we collect',
        body: [
          'When you place an order or send a message, you share details such as your name, email, phone number, and delivery address. If you subscribe to our newsletter, we keep the email address you enter.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'We use your details for one thing: to fulfil your order, arrange delivery, and reply to your enquiry. Newsletter emails are used only to send occasional updates and offers — you can ask us to stop at any time.',
        ],
      },
      {
        heading: 'Your cart stays with you',
        body: [
          'Your shopping cart is saved in your own browser, on your device — not on our servers. Clearing your browser storage clears your cart, and nobody else can see it.',
        ],
      },
      {
        heading: 'Who else is involved',
        body: [
          'Our website is hosted on Vercel and our product catalogue is managed through Google Firebase. These trusted services help us run the store; we do not share your personal details with anyone for marketing.',
        ],
      },
      {
        heading: 'Questions about your data',
        body: [
          'If you would like to know what we hold or ask us to remove your details, get in touch through our Contact page and we will take care of it.',
        ],
      },
    ],
  },
}

export default supportContent
