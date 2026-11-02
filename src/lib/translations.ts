export type Language = 'en' | 'my';

export interface Translations {
  nav: {
    services: string;
    about: string;
    experience: string;
    contact: string;
    bookNow: string;
    adminPortal: string;
    adminDashboard: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subtitle: string;
    scheduleVisit: string;
    exploreServices: string;
    ratingText: string;
    suiteTitle: string;
    suiteSubtitle: string;
    reserveNow: string;
    locationLabel: string;
    hoursLabel: string;
    hoursValue: string;
    phoneLabel: string;
    bookingLabel: string;
    bookingValue: string;
  };
  services: {
    kicker: string;
    headline: string;
    subtitle: string;
    mins: string;
    selectBook: string;
    dedicatedSession: string;
    customServiceFallback: string;
    serviceNames: Record<string, { name: string; description: string }>;
  };
  about: {
    kicker: string;
    headline: string;
    p1: string;
    p2: string;
    stampTitle: string;
    stampDesc: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
  };
  experience: {
    kicker: string;
    headline: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  booking: {
    kicker: string;
    headline: string;
    subtitle: string;
    step1Tab: string;
    step2Tab: string;
    step3Tab: string;
    step1Title: string;
    step1Indicator: string;
    continueToTime: string;
    step2Title: string;
    changeService: string;
    chooseDate: string;
    selectedDay: string;
    hoursNote: string;
    noticeNote: string;
    openingsCount: string;
    dateUnavailableTitle: string;
    dateUnavailableDesc: string;
    noSlotsTitle: string;
    noSlotsDesc: string;
    selectedTimeLabel: string;
    backToServices: string;
    continueToDetails: string;
    step3Title: string;
    step3Indicator: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    phoneLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    summaryTitle: string;
    serviceLabel: string;
    durationLabel: string;
    dateLabel: string;
    timeSlotLabel: string;
    totalInvestment: string;
    paymentNote: string;
    backToDateTime: string;
    submitting: string;
    confirmButton: string;
    validationMissing: string;
    validationInputs: string;
  };
  successModal: {
    kicker: string;
    headline: string;
    subtitle: string;
    selectedService: string;
    specialNotes: string;
    doneButton: string;
  };
  footer: {
    tagline: string;
    adminLink: string;
    scheduleTitle: string;
    monSat: string;
    monSatHours: string;
    sun: string;
    sunHours: string;
    contactTitle: string;
    callAndWhatsapp: string;
    rightsReserved: string;
    byAppointment: string;
  };
  admin: {
    dashboardTitle: string;
    returnToWeb: string;
    overview: string;
    appointments: string;
    services: string;
    hours: string;
    blocked: string;
    settings: string;
    signOut: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      services: 'Services',
      about: 'Our Sanctuary',
      experience: 'The Experience',
      contact: 'Hours & Location',
      bookNow: 'Book Appointment',
      adminPortal: 'Admin Login',
      adminDashboard: 'Admin Dashboard',
    },
    hero: {
      kicker: 'Bespoke Beauty Care · Sanchaung, Yangon',
      headline: 'Where Artistry Meets Pure Serenity',
      subtitle:
        'Immerse yourself in bespoke beauty rituals, botanical hydration therapies, and couture makeup artistry tailored to your individual radiance at Glow & Glam Beauty Salon & Spa.',
      scheduleVisit: 'Schedule Your Visit',
      exploreServices: 'Explore Services',
      ratingText: '4.9 / 5 Rating from over 350+ cherished clients in Yangon',
      suiteTitle: 'Signature Suite Experience',
      suiteSubtitle: 'Private consultations & tranquil treatment rooms',
      reserveNow: 'Reserve Now',
      locationLabel: 'Location',
      hoursLabel: 'Salon Hours',
      hoursValue: 'Mon - Sat: 9AM-7PM · Sun: 10AM-4PM',
      phoneLabel: 'WhatsApp & Call',
      bookingLabel: 'Online Booking',
      bookingValue: 'Instant Slot Confirmation',
    },
    services: {
      kicker: 'Curated Treatment Menu',
      headline: 'Tailored Rituals & Clinical Artistry',
      subtitle:
        'Every session is customized with pharmaceutical-grade botanicals, dermatological protocols, and personalized attention in our calm private suites.',
      mins: 'mins',
      selectBook: 'Select & Book',
      dedicatedSession: '1-on-1 Dedicated Session',
      customServiceFallback: 'Custom professional beauty salon service tailored to your personal goals and skin condition.',
      serviceNames: {
        'Signature Facial': {
          name: 'Signature Facial',
          description:
            'A deeply restorative ritual combining botanical lymphatic drainage, gentle deep pore extractions, enzyme fruit exfoliation, and chilled rose quartz contouring.',
        },
        'Full Makeup Session': {
          name: 'Full Makeup Session',
          description:
            'Bespoke event and gala makeup with custom skin priming, seamless airbrush or cream base, tailored eye styling, and long-wear sealing.',
        },
        'Brow Shaping & Tint': {
          name: 'Brow Shaping & Tint',
          description:
            'Architectural brow mapping tailored to your face structure, precision organic thread or wax sculpting, and botanical henna or tint infusion.',
        },
        'Lash Lift & Tint': {
          name: 'Lash Lift & Tint',
          description:
            'Nourishing keratin lash lift that dramatically enhances your natural lashes, paired with a rich obsidian gloss tint lasting 6 to 8 weeks.',
        },
        'Bridal Consultation': {
          name: 'Bridal Consultation',
          description:
            'An exclusive private consultation including skin diagnostic, veil and neckline harmonization, color palette design, and complete bridal trial application.',
        },
      },
    },
    about: {
      kicker: 'Our Philosophy & Sanctuary',
      headline: 'Dedicated to Elevated Care, Calm Luxury, and Natural Confidence',
      p1: 'Founded on the belief that beauty rituals should be restorative for the mind as well as transformative for the skin, Glow & Glam brings together world-class aesthetic techniques and a serene, private lounge environment.',
      p2: 'Whether you are preparing for a wedding celebration, refreshing with our signature hydrating facials, or perfecting your everyday brow architecture, our licensed specialists give you undivided focus and warm personal care.',
      stampTitle: 'Pure Elegance',
      stampDesc: 'Organic botanicals, bespoke artistry & clinical hygiene standards.',
      pillar1Title: 'Clinical Hygiene',
      pillar1Desc: 'Medical-grade sterilization for all tools & private suites.',
      pillar2Title: 'Botanical Care',
      pillar2Desc: 'Cruelty-free, dermatologically tested premium serums.',
      pillar3Title: 'Calm Atmosphere',
      pillar3Desc: 'Quiet, private treatment spaces designed for true rest.',
      pillar4Title: 'Bespoke Artistry',
      pillar4Desc: 'Tailored consultations designed around your facial features.',
    },
    experience: {
      kicker: 'The Client Journey',
      headline: 'Three Steps to Timeless Radiance',
      subtitle:
        'Every detail of your visit to Glow & Glam is curated for unhurried comfort, personal diagnostic attention, and lasting beauty results.',
      step1Title: 'Diagnostic Skin Consultation',
      step1Desc:
        'We begin with a gentle moisture barrier analysis and aesthetic consultation to tailor formulations specifically to your complexion.',
      step2Title: 'Private Suite Treatment',
      step2Desc:
        'Relax in our tranquil sound-insulated treatment suites with ambient warmth, botanical aromatherapy, and continuous specialist care.',
      step3Title: 'Post-Care Glow Regimen',
      step3Desc:
        'Leave with immediate radiant skin, curated post-treatment guidance, and complimentary herbal infusion tea in our lounge.',
    },
    booking: {
      kicker: 'Seamless Reservation',
      headline: 'Reserve Your Beauty Ritual',
      subtitle: 'Select your preferred treatment, discover real-time opening slots, and secure your session.',
      step1Tab: '1. Select Service',
      step2Tab: '2. Date & Time',
      step3Tab: '3. Client Details',
      step1Title: 'Choose Your Treatment',
      step1Indicator: 'Step 1 of 3',
      continueToTime: 'Continue to Date & Time',
      step2Title: 'Select Appointment Date & Time',
      changeService: 'Change Service',
      chooseDate: 'Choose Date',
      selectedDay: 'Selected Day',
      hoursNote: '• Operating hours: Mon-Sat 9AM-7PM, Sun 10AM-4PM',
      noticeNote: '• Minimum booking notice: 2 hours ahead',
      openingsCount: 'openings available',
      dateUnavailableTitle: 'Date Unavailable',
      dateUnavailableDesc: 'The salon is closed on this date for private events or holiday schedule. Please select another date.',
      noSlotsTitle: 'No Open Slots On This Day',
      noSlotsDesc: 'All appointments are currently booked, or the salon is closed for this weekday. Try choosing another upcoming date.',
      selectedTimeLabel: 'Selected Time',
      backToServices: '← Back to Services',
      continueToDetails: 'Continue to Details',
      step3Title: 'Your Details & Booking Confirmation',
      step3Indicator: 'Step 3 of 3',
      fullNameLabel: 'Full Name *',
      fullNamePlaceholder: 'e.g. May Thu Aung',
      emailLabel: 'Email Address *',
      phoneLabel: 'Phone / WhatsApp *',
      notesLabel: 'Special Requests / Notes (Optional)',
      notesPlaceholder: 'Skin sensitivities, preferred aesthetician, occasion details...',
      summaryTitle: 'Appointment Summary',
      serviceLabel: 'Service:',
      durationLabel: 'Duration:',
      dateLabel: 'Date:',
      timeSlotLabel: 'Time Slot:',
      totalInvestment: 'Total Investment:',
      paymentNote: '* Payment is completed in person upon service conclusion. Cancellations are free up to 24 hours prior to scheduled visit.',
      backToDateTime: '← Back to Date & Time',
      submitting: 'Submitting Request...',
      confirmButton: 'Confirm & Book Appointment',
      validationMissing: 'Please select a service, date, and available time slot.',
      validationInputs: 'Please fill in your full name, email address, and phone number.',
    },
    successModal: {
      kicker: 'Appointment Requested',
      headline: 'We Look Forward to Welcoming You',
      subtitle:
        'Your appointment request has been recorded. Our concierge team will reach out via phone or WhatsApp to finalize your booking details.',
      selectedService: 'Selected Service',
      specialNotes: 'Special Notes',
      doneButton: 'Done & Return to Salon',
    },
    footer: {
      tagline:
        'Yangon’s premier boutique beauty salon offering signature botanical facials, couture bridal artistry, and bespoke lash & brow architecture in a peaceful sanctuary.',
      adminLink: 'Salon Owner & Manager Portal',
      scheduleTitle: 'Salon Schedule',
      monSat: 'Monday – Saturday',
      monSatHours: '9:00 AM – 7:00 PM',
      sun: 'Sunday',
      sunHours: '10:00 AM – 4:00 PM',
      contactTitle: 'Contact & Sanctuary',
      callAndWhatsapp: '(Calls & WhatsApp)',
      rightsReserved: 'All rights reserved.',
      byAppointment: 'By Appointment Only',
    },
    admin: {
      dashboardTitle: 'Salon Management Portal',
      returnToWeb: 'Return to Salon Website',
      overview: 'Overview',
      appointments: 'Appointments',
      services: 'Services',
      hours: 'Business Hours',
      blocked: 'Blocked Dates',
      settings: 'Business Settings',
      signOut: 'Sign Out',
    },
  },
  my: {
    nav: {
      services: 'ဝန်ဆောင်မှုများ',
      about: 'ကျွန်ုပ်တို့ အလှပြင်ခန်းမ',
      experience: 'အလှအပ ခရီးစဉ်',
      contact: 'ဖွင့်ချိန်နှင့် လိပ်စာ',
      bookNow: 'ရက်ချိန်းရယူရန်',
      adminPortal: 'မန်နေဂျာ ဝင်ရောက်ရန်',
      adminDashboard: 'စီမံခန့်ခွဲမှု ဒက်ရှ်ဘုတ်',
    },
    hero: {
      kicker: 'အထူးသီးသန့် အလှပြုပြင်မှု · စမ်းချောင်း၊ ရန်ကုန်',
      headline: 'အနုပညာဆန်သောအလှတရားနှင့် အေးချမ်းမှုတို့ ဆုံဆည်းရာ',
      subtitle:
        'စမ်းချောင်း၊ ရန်ကုန်မြို့ရှိ Glow & Glam Beauty Salon & Spa တွင် သင့်အတွက် သီးသန့် အသားအရေထိန်းသိမ်းမှု၊ ရေဓာတ်ဖြည့်ပေါင်းတင်ခြင်းနှင့် မင်္ဂလာပွဲတက် အလှပြင်မိတ်ကပ် ဝန်ဆောင်မှုများကို စိတ်ချမ်းမြေ့စွာ ခံစားလိုက်ပါ။',
      scheduleVisit: 'ရက်ချိန်းရယူရန်',
      exploreServices: 'ဝန်ဆောင်မှုများ ကြည့်ရှုရန်',
      ratingText: 'ရန်ကုန်မြို့ရှိ အထူးအားပေးသော မိတ်ဟောင်းမိတ်သစ် ၃၅၀+ ကျော်ထံမှ ၄.၉/၅ ရမှတ် ရရှိထားပါသည်',
      suiteTitle: 'သီးသန့် ဆလွန်းခန်းမ အတွေ့အကြုံ',
      suiteSubtitle: 'သီးသန့် အခန်းတွင်း သေချာစွာ ဂရုစိုက် ပြုပြင်ပေးခြင်း',
      reserveNow: 'ယခု ကြိုတင်စာရင်းသွင်းပါ',
      locationLabel: 'တည်နေရာ',
      hoursLabel: 'ဆလွန်းဖွင့်ချိန်',
      hoursValue: 'တနင်္လာ - စနေ: မနက် ၉ - ည ၇ | တနင်္ဂနွေ: မနက် ၁၀ - ညနေ ၄',
      phoneLabel: 'ဖုန်းနှင့် WhatsApp',
      bookingLabel: 'အွန်လိုင်း ရက်ချိန်း',
      bookingValue: 'ချက်ချင်း စာရင်းသွင်း အတည်ပြုချက်ရရှိမည်',
    },
    services: {
      kicker: 'ရွေးချယ်ထားသော အလှပြုပြင် ဝန်ဆောင်မှုများ',
      headline: 'ကျွမ်းကျင်သော လက်ရာနှင့် အထူးကုထုံးများ',
      subtitle:
        'ဆေးဝါးအဆင့်မီ သဘာဝထုတ်ကုန်များ၊ အရေပြားကျန်းမာရေးစံနှုန်းများနှင့်အတူ ကျွန်ုပ်တို့၏ အေးချမ်းသော သီးသန့်အခန်းများတွင် နွေးထွေးစွာ ဝန်ဆောင်မှုပေးပါသည်။',
      mins: 'မိနစ်',
      selectBook: 'ရွေးချယ်ပြီး ရက်ချိန်းယူမည်',
      dedicatedSession: 'သီးသန့် ၁ ဦးချင်း အထူးပြုစုစောင့်ရှောက်မှု',
      customServiceFallback: 'သင့်အသားအရေနှင့် အလှအပရည်မှန်းချက်အတွက် အထူးပြုလုပ်ထားသော ပရော်ဖက်ရှင်နယ် ဝန်ဆောင်မှု။',
      serviceNames: {
        'Signature Facial': {
          name: 'ဆင်းဂနေးချာ မျက်နှာပေါင်းတင်ကုထုံး',
          description:
            'အရေပြားအတွင်းပိုင်း ဂျီးချွတ် သန့်စင်ပေးခြင်း၊ သဘာဝအသီးအနှံ အင်ဇိုင်းဖြင့် ချေးချွတ်ခြင်းနှင့် နှင်းဆီသလင်းကျောက်အေးဖြင့် ပင့်တင်ထိန်းသိမ်းပေးသော အထူးကုထုံးဖြစ်ပါသည်။',
        },
        'Full Makeup Session': {
          name: 'ပွဲတက် အလှပြင်မိတ်ကပ် ဝန်ဆောင်မှု',
          description:
            'ညစာစားပွဲ၊ မင်္ဂလာပွဲနှင့် ဂုဏ်ပြုအခမ်းအနားများအတွက် အသားအရေအခံ ပြင်ဆင်မှု၊ မျက်နှာပုံဖော် ကွန်တိုဆွဲခြင်းနှင့် ကြာရှည်ခံသော မိတ်ကပ်လက်ရာဖြစ်ပါသည်။',
        },
        'Brow Shaping & Tint': {
          name: 'မျက်ခုံးပုံဖော်ခြင်းနှင့် အရောင်တင်ခြင်း',
          description:
            'သင့်မျက်နှာကျနှင့် လိုက်ဖက်သော မျက်ခုံးအချိုးအစားကို တိုင်းတာပုံဖော်ပြီး သဘာဝဆေးရည်ဖြင့် အရောင်ဆိုးတင်ပေးသော ဝန်ဆောင်မှုဖြစ်ပါသည်။',
        },
        'Lash Lift & Tint': {
          name: 'မျက်တောင်ကော့တင်ခြင်းနှင့် အရောင်ဆိုးခြင်း',
          description:
            'သဘာဝမျက်တောင်များကို ထိခိုက်မှုမရှိစေဘဲ ကီရာတင်ဓာတ်ဖြင့် ကော့ညွတ်စေပြီး နက်မှောင်ပြောင်လက်သော အရောင်ဆိုးပေးခြင်း (၆ ပတ်မှ ၈ ပတ်အထိ ခံပါသည်)။',
        },
        'Bridal Consultation': {
          name: 'သတို့သမီး သီးသန့် အလှပြင်ဆွေးနွေးပွဲ',
          description:
            'မင်္ဂလာဝတ်စုံ၊ လည်တိုင်ပုံစံနှင့် လိုက်ဖက်သော အသားအရေစစ်ဆေးခြင်း၊ မိတ်ကပ်စမ်းသပ်ပြင်ဆင်ခြင်းနှင့် အကြံပေးဆွေးနွေးခြင်း သီးသန့်အစီအစဉ်ဖြစ်ပါသည်။',
        },
      },
    },
    about: {
      kicker: 'ကျွန်ုပ်တို့၏ ခံယူချက်နှင့် အလှပြင်ခန်းမ',
      headline: 'အဆင့်အတန်းမြင့် ဂရုစိုက်မှု၊ အေးချမ်းမှုနှင့် သဘာဝယုံကြည်မှုအတွက် ရည်ရွယ်ပါသည်',
      p1: 'အလှအပ ပြုပြင်ခြင်းသည် ခန္ဓာကိုယ်သာမက စိတ်နှလုံးကိုပါ လန်းဆန်းစေရမည်ဟူသော ခံယူချက်ဖြင့် Glow & Glam ကို စမ်းချောင်းမြို့နယ်တွင် တည်ထောင်ခဲ့ပါသည်။',
      p2: 'မင်္ဂလာအခမ်းအနားအတွက် ပြင်ဆင်လိုသည်ဖြစ်စေ၊ အသားအရေ ရေဓာတ်ဖြည့်လိုသည်ဖြစ်စေ၊ မျက်ခုံးနှင့် မျက်တောင် အလှဆင်လိုသည်ဖြစ်စေ ကျွန်ုပ်တို့၏ ကျွမ်းကျင်သူများက နွေးထွေးစွာ ဝန်ဆောင်မှုပေးပါမည်။',
      stampTitle: 'စင်ကြယ်သော အလှတရား',
      stampDesc: 'သဘာဝထုတ်ကုန်များ၊ အနုစိတ်လက်ရာနှင့် ဆေးဘက်ဝင် သန့်ရှင်းရေးစံနှုန်းများ။',
      pillar1Title: 'ဆေးဘက်ဝင် သန့်ရှင်းရေး',
      pillar1Desc: 'ကိရိယာများနှင့် အခန်းများကို စနစ်တကျ ပိုးသတ်သန့်စင်ထားပါသည်။',
      pillar2Title: 'သဘာဝ ထုတ်ကုန်များ',
      pillar2Desc: 'တိရစ္ဆာန်များကို မညှဉ်းပန်းဘဲ အရေပြားစစ်ဆေးပြီးသား သဘာဝဆီရမ်များသာ အသုံးပြုပါသည်။',
      pillar3Title: 'အေးချမ်းသော ပတ်ဝန်းကျင်',
      pillar3Desc: 'တိတ်ဆိတ်ငြိမ်သက်ပြီး အနားယူနိုင်သော သီးသန့်ဝန်ဆောင်မှု အခန်းများ။',
      pillar4Title: 'စိတ်ကြိုက် အလှဖန်တီးမှု',
      pillar4Desc: 'လူကြီးမင်း၏ မျက်နှာသွင်ပြင်နှင့် အံဝင်ခွင်ကျ အနုပညာဆန်ဆန် ပြင်ဆင်ပေးပါသည်။',
    },
    experience: {
      kicker: 'ဧည့်သည်တော်များ၏ အတွေ့အကြုံ',
      headline: 'ထာဝရ တောက်ပသော အလှဆီသို့ အဆင့် ၃ ဆင့်',
      subtitle:
        'Glow & Glam သို့ လာရောက်လည်ပတ်မှုတိုင်းကို အလျင်စလိုမရှိစေဘဲ စိတ်အေးချမ်းသာစွာဖြင့် အကောင်းဆုံးရလဒ်ရရှိရန် စီစဉ်ထားပါသည်။',
      step1Title: 'အသားအရေ စစ်ဆေးဆွေးနွေးခြင်း',
      step1Desc:
        'သင့်အသားအရေ ရေဓာတ်အခြေအနေကို သေချာစွာ စစ်ဆေးပြီး အသင့်တော်ဆုံး ပေါင်းတင်ဆေးရည်များကို ရွေးချယ်ပေးပါသည်။',
      step2Title: 'သီးသန့်အခန်းတွင်း ပြုစုကုသခြင်း',
      step2Desc:
        'အသံလုံသော သီးသန့်အခန်းအတွင်း သင်းပျံ့သော သဘာဝရနံ့၊ နူးညံ့သောအလင်းရောင်တို့ဖြင့် အနားယူရင်း ပြုပြင်မှုခံယူနိုင်ပါသည်။',
      step3Title: 'အိမ်ပြန် အသားအရေထိန်းသိမ်းမှု ညွှန်ကြားချက်',
      step3Desc:
        'ချက်ချင်းကြည်လင်တောက်ပလာသော အသားအရေနှင့်အတူ ဆက်လက်ထိန်းသိမ်းရန် အကြံပြုချက်များနှင့် ဆေးဖက်ဝင်လက်ဖက်ရည်ကို ဧည့်ခံပေးပါသည်။',
    },
    booking: {
      kicker: 'လွယ်ကူမြန်ဆန်သော ရက်ချိန်းရယူမှု',
      headline: 'သင့်ရက်ချိန်းကို အွန်လိုင်းမှ စာရင်းသွင်းပါ',
      subtitle: 'နှစ်သက်ရာ ဝန်ဆောင်မှုကို ရွေးချယ်ပြီး အားလပ်သော အချိန်ဇယားများမှ စိတ်ကြိုက်ရွေးချယ်နိုင်ပါသည်။',
      step1Tab: '၁။ ဝန်ဆောင်မှု ရွေးရန်',
      step2Tab: '၂။ ရက်စွဲနှင့် အချိန်',
      step3Tab: '၃။ အချက်အလက်များ',
      step1Title: 'ပြုလုပ်လိုသော ဝန်ဆောင်မှုကို ရွေးချယ်ပါ',
      step1Indicator: 'အဆင့် ၁ / ၃',
      continueToTime: 'ရက်စွဲနှင့် အချိန် ရွေးရန် ဆက်သွားမည်',
      step2Title: 'ရက်စွဲနှင့် အားလပ်သော အချိန် ရွေးချယ်ပါ',
      changeService: 'ဝန်ဆောင်မှု ပြန်ပြောင်းရန်',
      chooseDate: 'ရက်စွဲ ရွေးချယ်ပါ',
      selectedDay: 'ရွေးချယ်ထားသော နေ့စွဲ',
      hoursNote: '• ဆလွန်းဖွင့်ချိန်: တနင်္လာ-စနေ မနက် ၉ - ည ၇၊ တနင်္ဂနွေ မနက် ၁၀ - ညနေ ၄',
      noticeNote: '• အနည်းဆုံး ကြိုတင်ချိန်းဆိုရမည့်အချိန်: ၂ နာရီ ကြိုတင်ရပါမည်',
      openingsCount: 'အားလပ်သော အချိန်များ',
      dateUnavailableTitle: 'ဤရက်တွင် ဆလွန်းပိတ်ပါသည်',
      dateUnavailableDesc: 'အထူးပွဲ သို့မဟုတ် အများပြည်သူရုံးပိတ်ရက်ဖြစ်သောကြောင့် ဤရက်တွင် ဝန်ဆောင်မှုပိတ်ထားပါသည်။ ကျေးဇူးပြု၍ အခြားရက်ကို ရွေးချယ်ပါ။',
      noSlotsTitle: 'ဤရက်တွင် အချိန်ပြည့်သွားပါပြီ',
      noSlotsDesc: 'ဤရက်တွင် အချိန်များအားလုံး ကြိုတင်စာရင်းပြည့်သွားပါပြီ သို့မဟုတ် ဖွင့်ချိန်မဟုတ်ပါ။ ကျေးဇူးပြု၍ အခြားရက်ကို ရွေးချယ်ပေးပါ။',
      selectedTimeLabel: 'ရွေးချယ်ထားသော အချိန်',
      backToServices: '← ဝန်ဆောင်မှုများသို့ ပြန်သွားရန်',
      continueToDetails: 'အချက်အလက်ဖြည့်ရန် ဆက်သွားမည်',
      step3Title: 'လူကြီးမင်း၏ အချက်အလက်များနှင့် ရက်ချိန်းအတည်ပြုချက်',
      step3Indicator: 'အဆင့် ၃ / ၃',
      fullNameLabel: 'အမည် အပြည့်အစုံ *',
      fullNamePlaceholder: 'ဥပမာ - မသူဇာအောင်',
      emailLabel: 'အီးမေးလ် လိပ်စာ *',
      phoneLabel: 'ဖုန်း / WhatsApp နံပါတ် *',
      notesLabel: 'အထူးတောင်းဆိုချက် / မှတ်ချက် (ရှိပါက)',
      notesPlaceholder: 'အသားအရေမတည့်မှု၊ အထူးလိုအပ်ချက်၊ သီးသန့်တောင်းဆိုလိုသည်များ...',
      summaryTitle: 'ရက်ချိန်း အနှစ်ချုပ်',
      serviceLabel: 'ဝန်ဆောင်မှု -',
      durationLabel: 'ကြာမြင့်ချိန် -',
      dateLabel: 'ရက်စွဲ -',
      timeSlotLabel: 'အချိန် -',
      totalInvestment: 'စုစုပေါင်း ကုန်ကျစရိတ် -',
      paymentNote: '* ငွေပေးချေမှုကို ဆလွန်းသို့ လာရောက်သည့်အခါမှသာ ပေးချေရပါမည်။ ရက်ချိန်းမတိုင်မီ ၂၄ နာရီအလိုအထိ အခမဲ့ ပြန်လည်ဖျက်သိမ်းနိုင်ပါသည်။',
      backToDateTime: '← ရက်စွဲနှင့် အချိန်သို့ ပြန်သွားရန်',
      submitting: 'ရက်ချိန်း တင်သွင်းနေပါသည်...',
      confirmButton: 'ရက်ချိန်း အတည်ပြုစာရင်းသွင်းမည်',
      validationMissing: 'ကျေးဇူးပြု၍ ဝန်ဆောင်မှု၊ ရက်စွဲနှင့် အချိန်ကို ဦးစွာ ရွေးချယ်ပေးပါ။',
      validationInputs: 'ကျေးဇူးပြု၍ အမည်၊ အီးမေးလ်နှင့် ဖုန်းနံပါတ် အပြည့်အစုံ ဖြည့်စွက်ပေးပါ။',
    },
    successModal: {
      kicker: 'ရက်ချိန်း တောင်းဆိုမှု အောင်မြင်ပါသည်',
      headline: 'လူကြီးမင်းအား နွေးထွေးစွာ ကြိုဆိုရန် စောင့်မျှော်နေပါသည်',
      subtitle:
        'လူကြီးမင်း၏ ရက်ချိန်းတောင်းဆိုမှုကို မှတ်တမ်းတင်ပြီးပါပြီ။ ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုအဖွဲ့မှ ဖုန်း သို့မဟုတ် WhatsApp ဖြင့် အသေးစိတ်အတည်ပြုရန် ဆက်သွယ်ပေးပါမည်။',
      selectedService: 'ရွေးချယ်ထားသော ဝန်ဆောင်မှု',
      specialNotes: 'အထူးမှတ်ချက်',
      doneButton: 'ပြီးပါပြီ · ဆလွန်းပင်မစာမျက်နှာသို့ ပြန်သွားမည်',
    },
    footer: {
      tagline:
        'စမ်းချောင်းမြို့နယ်ရှိ နာမည်ကျော် ဘိုတစ်အလှပြင်ဆလွန်းဖြစ်ပြီး သဘာဝမျက်နှာပေါင်းတင်ခြင်း၊ မင်္ဂလာပွဲတက်မိတ်ကပ်နှင့် မျက်ခုံးမျက်တောင် ပြုပြင်ခြင်းတို့ကို သီးသန့်အေးချမ်းစွာ ဝန်ဆောင်မှုပေးနေပါသည်။',
      adminLink: 'ဆလွန်းပိုင်ရှင်နှင့် မန်နေဂျာ ဝင်ရောက်ရန်',
      scheduleTitle: 'ဆလွန်းဖွင့်ချိန်များ',
      monSat: 'တနင်္လာ – စနေ',
      monSatHours: 'မနက် ၉:၀၀ – ည ၇:၀၀',
      sun: 'တနင်္ဂနွေ',
      sunHours: 'မနက် ၁၀:၀၀ – ညနေ ၄:၀၀',
      contactTitle: 'ဆက်သွယ်ရန်နှင့် တည်နေရာ',
      callAndWhatsapp: '(ဖုန်းနှင့် WhatsApp)',
      rightsReserved: 'မူပိုင်ခွင့်များ ရယူထားပြီးဖြစ်ပါသည်။',
      byAppointment: 'ကြိုတင်ရက်ချိန်းဖြင့်သာ လက်ခံပါသည်',
    },
    admin: {
      dashboardTitle: 'ဆလွန်း စီမံခန့်ခွဲမှု ပေါ်တယ်',
      returnToWeb: 'ဆလွန်း ဝက်ဘ်ဆိုက်သို့ ပြန်သွားရန်',
      overview: 'ခြုံငုံသုံးသပ်ချက်',
      appointments: 'ရက်ချိန်းများ',
      services: 'ဝန်ဆောင်မှုများ',
      hours: 'ဖွင့်ချိန်သတ်မှတ်ချက်',
      blocked: 'ပိတ်ရက်များ',
      settings: 'ဆိုင်အချက်အလက်',
      signOut: 'ထွက်မည်',
    },
  },
};
