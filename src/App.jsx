
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ArrowDown,
  ArrowUpRight,
  Camera,
  Cake,
  Gift,
  Heart,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const photos = [
  {
    src: "/images/ramisa-1.jpg",
    fallback:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900",
    caption: "The Main Character",
    note: "নিজেকে সবসময় main character ভাবার দিনলিপি।",
    rotation: -3,
  },
  {
    src: "/images/ramisa-2.jpg",
    fallback:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900",
    caption: "Certified Drama Queen",
    note: "Drama ছাড়া যার দিন সম্পূর্ণ হয় না!",
    rotation: 2,
  },
  {
    src: "/images/ramisa-3.jpg",
    fallback:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900",
    caption: "The Pretty Chaos",
    note: "Cute face, unlimited chaos. 😂",
    rotation: -2,
  },
  {
    src: "/images/ramisa-4.jpg",
    fallback:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900",
    caption: "One of a Kind",
    note: "কপি পাওয়া যায়, কিন্তু original একটাই।",
    rotation: 3,
  },
];

const memories = [
  {
    number: "01",
    title: "The Day You Became Famous",
    description:
      "তোমার confidence দেখে মনে হয় পৃথিবীর সব camera তোমার জন্যই বানানো।",
    image: "/images/ramisa-5.jpg",
  },
  {
    number: "02",
    title: "Unlimited Gossip Subscription",
    description:
      "তোমার কাছে news channel-ও হার মানবে। Breaking news কখনো শেষ হয় না!",
    image: "/images/ramisa-6.jpg",
  },
  {
    number: "03",
    title: "Officially Getting Older",
    description:
      "বয়স বাড়ছে ঠিকই, কিন্তু maturity এখনো delivery-তে আছে।",
    image: "/images/ramisa-7.jpg",
  },
];

const wishes = [
  "তোমার life হোক Wi-Fi-এর মতো — সবসময় connected, কখনো disconnected না!",
  "তোমার হাসি থাকুক 24/7, আর tension থাকুক airplane mode-এ!",
  "তোমার সব wish পূরণ হোক — শুধু আমার কাছে treat চাওয়ার wish বাদে! 😂",
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GoldButton({ children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full
        bg-[#a78037] px-6 py-3.5 text-sm font-semibold text-white
        shadow-lg shadow-[#a78037]/20 transition-all duration-300
        hover:-translate-y-1 hover:bg-[#8d692c] active:scale-95
        ${className}`}
    >
      {children}
    </button>
  );
}

function PhotoImage({ photo, alt, className = "", loading = "lazy" }) {
  return (
    <img
      src={photo.src}
      onError={(event) => {
        if (event.currentTarget.dataset.fallbackUsed === "true") return;

        event.currentTarget.dataset.fallbackUsed = "true";
        event.currentTarget.src = photo.fallback;
      }}
      alt={alt}
      loading={loading}
      className={className}
    />
  );
}

function MemoryImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  const fallback =
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900";

  return (
    <img
      src={failed ? fallback : src}
      onError={() => {
        if (!failed) setFailed(true);
      }}
      alt={alt}
      loading="lazy"
      className="aspect-[16/10] w-full rounded-xl object-cover"
    />
  );
}

export default function App() {
  const audioRef = useRef(null);

  const [musicOn, setMusicOn] = useState(false);
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(null);
  const [surprised, setSurprised] = useState(false);
  const [wishIndex, setWishIndex] = useState(0);

  const startMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      await audio.play();
      setMusicOn(true);
    } catch (error) {
      console.error("Music playback failed:", error);
      setMusicOn(false);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    await startMusic();
  };

  const openSurprise = () => {
    setOpened(true);
    startMusic();
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 130,
      spread: 100,
      origin: { y: 0.65 },
      colors: ["#a78037", "#f2d58a", "#ffffff", "#d9b6b0"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors: ["#a78037", "#f2d58a", "#ffffff"],
      });
    }, 250);

    setSurprised(true);
  };

  const movePhoto = (direction) => {
    setSelected((current) => {
      if (current === null) return current;
      return (current + direction + photos.length) % photos.length;
    });
  };

  return (
    <main className="luxury-bg min-h-screen overflow-hidden">
      <audio
        ref={audioRef}
        src="/birthday-music.mp3"
        loop
        preload="auto"
        onPlay={() => setMusicOn(true)}
        onPause={() => setMusicOn(false)}
        onError={(event) => {
          console.error("Audio file error:", event.currentTarget.error);
          setMusicOn(false);
        }}
      />

      {/* Welcome */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#fbf8f1] px-5"
          >
            <div className="absolute inset-5 rounded-3xl border border-[#d9c69b] sm:inset-8" />

            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 mx-auto max-w-md text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-[#d9c69b] bg-white shadow-xl shadow-[#a78037]/10"
              >
                <Gift size={43} strokeWidth={1.1} className="text-[#a78037]" />
              </motion.div>

              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#a78037]">
                A Little Surprise For
              </p>

              <h1
                className="shimmer text-5xl sm:text-7xl"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Ramisa
              </h1>

              <p className="mx-auto mb-8 mt-5 max-w-xs text-sm leading-7 text-[#777064]">
                Warning: Birthday content ahead. May contain excessive
                compliments and unnecessary drama. 😂
              </p>

              <GoldButton onClick={openSurprise}>
                Open Your Surprise <Sparkles size={16} />
              </GoldButton>

              <p className="mt-6 text-xs tracking-widest text-[#a69b87]">
                MADE ESPECIALLY FOR YOU · ✦
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <header className="relative z-10 border-b border-[#e8dfcd]">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9c69b] text-[#a78037]">
              <Sparkles size={19} />
            </span>
            <span>
              <span className="block font-serif text-lg tracking-wide">
                For Ramisa
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#9b8861]">
                A Birthday Edition
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm text-[#665f53] md:flex">
            <a className="transition hover:text-[#a78037]" href="#gallery">
              Gallery
            </a>
            <a className="transition hover:text-[#a78037]" href="#memories">
              Memories
            </a>
            <a className="transition hover:text-[#a78037]" href="#wish">
              Birthday Wish
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="#wish"
              className="rounded-full border border-[#d9c69b] px-3 py-2 text-xs font-medium text-[#8d692c] transition hover:bg-[#a78037] hover:text-white sm:px-4"
            >
              Her Special Day ✦
            </a>

            <button
              type="button"
              onClick={toggleMusic}
              aria-label={musicOn ? "Pause music" : "Play music"}
              aria-pressed={musicOn}
              className="flex items-center gap-2 rounded-full border border-[#d9c69b] px-3 py-2 text-xs text-[#8d692c] transition hover:bg-[#a78037] hover:text-white sm:px-4"
            >
              {musicOn ? "Ⅱ Pause Music" : "♫ Play Music"}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:py-32"
      >
        <Reveal className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e3d4b3] bg-white/60 px-4 py-2 text-xs text-[#927137]">
            <Sparkles size={14} />
            TODAY IS ALL ABOUT YOU
          </div>

          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#9b8861]">
            Happy Birthday
          </p>

          <h1
            className="text-6xl leading-[1.08] tracking-tight sm:text-8xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Dear
            <br />
            <span className="gold-text italic">Ramisa.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#766e61] sm:text-lg">
            Another year older, a little wiser...
            <span className="font-medium text-[#a78037]">
              {" "}well, let's not get ahead of ourselves. 😂
            </span>
            {" "}You deserve a day as wonderful as you are.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <GoldButton onClick={launchConfetti}>
              Click here to Begin the Party <Sparkles size={16} />
            </GoldButton>
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 px-3 py-3 text-sm text-[#655c4d] transition hover:text-[#a78037]"
            >
              Explore Memories <ArrowDown size={16} />
            </a>
          </div>

          <div className="mt-12 flex items-center gap-3 text-xs text-[#9a907f]">
            <span className="h-px w-12 bg-[#cbb47d]" />
            A FRIENDSHIP APPRECIATION PROJECT
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rounded-[48%] border border-[#ddc99c] sm:-inset-7" />

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [1, -1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="photo-shadow relative overflow-hidden rounded-t-[48%] rounded-b-3xl border-[7px] border-white bg-[#e9dfcc]"
          >
            <PhotoImage
              photo={photos[0]}
              alt="Ramisa birthday portrait"
              loading="eager"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-7 pt-24 text-white">
              <p className="font-serif text-2xl italic">
                Simply unforgettable.
              </p>
              <p className="mt-2 text-xs tracking-widest text-white/80">
                ONE OF A KIND · ALWAYS
              </p>
            </div>
          </motion.div>

          <motion.div
            animate={{ rotate: [8, 12, 8], y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -right-2 top-12 rounded-2xl border border-[#e1d0a8] bg-white px-4 py-3 shadow-xl sm:-right-8"
          >
            <span className="block text-xl">🎂</span>
            <span className="text-[10px] tracking-wider text-[#8d692c]">
              BIRTHDAY QUEEN
            </span>
          </motion.div>

          <div className="absolute -bottom-5 -left-2 rounded-full border border-[#d9c69b] bg-[#fbf8f1] p-4 shadow-lg sm:-left-8">
            <Heart size={24} className="text-[#a78037]" />
          </div>
        </Reveal>
      </section>

      {/* Divider */}
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-6">
        <div className="h-px flex-1 bg-[#e4d8bf]" />
        <Sparkles size={16} className="text-[#b2914b]" />
        <div className="h-px flex-1 bg-[#e4d8bf]" />
      </div>

      {/* Gallery */}
      <section
        id="gallery"
        className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28"
      >
        <Reveal className="mb-14 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#a78037]">
            The Main Character Archive
          </p>
          <h2 className="font-serif text-4xl sm:text-6xl">
            A Few <span className="gold-text italic">Iconic Moments</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#817869]">
            A small collection of memories, pretty pictures, and evidence
            that you have always been a little extra. 📸
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <Reveal key={photo.src} delay={index * 0.08}>
              <motion.button
                type="button"
                onClick={() => setSelected(index)}
                whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 230, damping: 18 }}
                style={{ rotate: photo.rotation }}
                className="photo-shadow group w-full rounded-sm border border-[#e7ddc9] bg-white p-3 text-left"
              >
                <div className="relative overflow-hidden bg-[#eee6d7]">
                  <PhotoImage
                    photo={photo}
                    alt={photo.caption}
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/25">
                    <Camera
                      className="text-white opacity-0 transition duration-300 group-hover:opacity-100"
                      size={30}
                    />
                  </div>
                </div>

                <div className="px-2 pb-2 pt-4">
                  <p className="font-serif text-xl">{photo.caption}</p>
                  <p className="mt-2 text-xs leading-5 text-[#8c8170]">
                    {photo.note}
                  </p>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[#a49a88]">
          ✦ Tap any photo to see it in full size ✦
        </p>
      </section>

      {/* Memory timeline */}
      <section
        id="memories"
        className="border-y border-[#e8dfcd] bg-white/40"
      >
        <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-28">
          <Reveal className="mb-16 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#a78037]">
              The Friendship Files
            </p>
            <h2 className="font-serif text-4xl sm:text-6xl">
              A Timeline of <span className="gold-text italic">Chaos</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#817869]">
              The memories are priceless. The drama? Absolutely free.
            </p>
          </Reveal>

          <div className="relative">
            <div className="timeline-line absolute bottom-0 left-4 top-0 w-px sm:left-1/2 sm:-translate-x-1/2" />

            <div className="space-y-14 sm:space-y-20">
              {memories.map((memory, index) => (
                <Reveal key={memory.number} delay={0.08}>
                  <div
                    className={`relative grid gap-6 pl-12 sm:grid-cols-2 sm:gap-12 sm:pl-0 ${
                      index % 2 === 0
                        ? ""
                        : "sm:[&>div:first-child]:order-2"
                    }`}
                  >
                    <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-[#d9c69b] bg-[#fbf8f1] text-xs text-[#a78037] sm:left-1/2 sm:-translate-x-1/2">
                      {memory.number}
                    </div>

                    <div className="photo-shadow overflow-hidden rounded-2xl border border-[#e7ddc9] bg-white p-2">
                      <MemoryImage
                        src={memory.image}
                        alt={memory.title}
                      />
                    </div>

                    <div className="flex flex-col justify-center py-2">
                      <p className="mb-3 text-xs tracking-[0.25em] text-[#a78037]">
                        MEMORY NO. {memory.number}
                      </p>
                      <h3 className="font-serif text-2xl leading-snug sm:text-3xl">
                        {memory.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-[#817869]">
                        {memory.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Birthday wishes */}
      <section
        id="wish"
        className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32"
      >
        <Reveal>
          <div className="photo-shadow relative overflow-hidden rounded-[2rem] border border-[#d9c69b] bg-white px-6 py-14 text-center sm:px-14 sm:py-20">
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full border border-[#eee2c6]" />
            <div className="pointer-events-none absolute -bottom-16 -left-12 h-52 w-52 rounded-full border border-[#eee2c6]" />

            <motion.div
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-[#f6eedc]"
            >
              <Cake
                size={38}
                strokeWidth={1.3}
                className="text-[#a78037]"
              />
            </motion.div>

            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#a78037]">
              A Very Important Birthday Announcement
            </p>

            <h2 className="font-serif text-4xl sm:text-6xl">
              Happy Birthday,
              <br />
              <span className="gold-text italic">Ramisa!</span>
            </h2>

            <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-[#817869] sm:text-base">
              Wishing you endless happiness, unforgettable adventures,
              amazing opportunities, and enough money to buy all the things
              you add to your cart at 2 AM. 😂
            </p>

            <div className="mx-auto my-9 max-w-lg rounded-2xl border border-[#eadfc7] bg-[#fbf8f1] px-5 py-7">
              <Sparkles
                className="mx-auto mb-4 text-[#b2914b]"
                size={21}
              />

              <AnimatePresence mode="wait">
                <motion.p
                  key={wishIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-14 text-base leading-7 text-[#625746] sm:text-lg"
                >
                  {wishes[wishIndex]}
                </motion.p>
              </AnimatePresence>

              <button
                type="button"
                onClick={() =>
                  setWishIndex((current) => (current + 1) % wishes.length)
                }
                className="mt-5 text-xs font-semibold uppercase tracking-widest text-[#a78037] transition hover:text-[#72521f]"
              >
                Click for Wish ↗
              </button>
            </div>

            <GoldButton onClick={launchConfetti}>
              Click here to Make Some Birthday Magic <Sparkles size={16} />
            </GoldButton>

            <AnimatePresence>
              {surprised && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mt-8"
                >
                  <p className="gold-text font-serif text-3xl sm:text-4xl">
                    You deserve the world! ✨
                  </p>
                  <p className="mt-3 text-sm text-[#817869]">
                    Stay happy, stay weird, and never stop being you. 💛
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8dfcd] px-5 py-9 text-center">
        <Heart size={17} className="mx-auto mb-4 text-[#a78037]" />
        <p className="font-serif text-xl">
          Made with love & a little bit of chaos.
        </p>
        <p className="mt-3 text-xs tracking-wider text-[#9a907f]">
          HAPPY BIRTHDAY, RAMISA · ALWAYS STAY AWESOME
        </p>
        <a
          href="#home"
          className="mt-5 inline-flex items-center gap-2 text-xs text-[#a78037] hover:underline"
        >
          Back to the top <ArrowUpRight size={14} />
        </a>
      </footer>

      {/* Fullscreen photo viewer */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#17140f]/95 p-5 backdrop-blur-md"
          >
            <button
              type="button"
              aria-label="Close photo viewer"
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 rounded-full border border-white/30 p-3 text-white transition hover:bg-white/10"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              aria-label="Previous photo"
              onClick={(event) => {
                event.stopPropagation();
                movePhoto(-1);
              }}
              className="absolute left-3 z-10 rounded-full border border-white/30 p-3 text-white transition hover:bg-white/10 sm:left-8"
            >
              <ChevronLeft size={22} />
            </button>

            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[85vh] max-w-3xl text-center"
            >
              <PhotoImage
                photo={photos[selected]}
                alt={photos[selected].caption}
                className="mx-auto max-h-[70vh] max-w-full rounded-lg border-4 border-white/10 object-contain shadow-2xl"
              />
              <p className="mt-5 font-serif text-2xl text-white">
                {photos[selected].caption}
              </p>
              <p className="mt-2 text-sm text-white/60">
                {selected + 1} / {photos.length}
              </p>
            </motion.div>

            <button
              type="button"
              aria-label="Next photo"
              onClick={(event) => {
                event.stopPropagation();
                movePhoto(1);
              }}
              className="absolute right-3 z-10 rounded-full border border-white/30 p-3 text-white transition hover:bg-white/10 sm:right-8"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
