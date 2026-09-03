import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Home,
  Languages,
  LockKeyhole,
  Sparkles,
  Star,
  Volume2,
  X,
} from "lucide-react";

const COLORS = {
  ink: "#24324A",
  cream: "#FFF9EF",
  blue: "#8FC8F8",
  pink: "#FFB2C3",
  mint: "#83DCC6",
  purple: "#B9A7F8",
  yellow: "#FFD66B",
};

function useStore(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Aplikace funguje i v režimu, kde localStorage není dostupné.
    }
  }, [key, value]);

  return [value, setValue];
}

function speak(text) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB";
  utterance.rate = 0.72;
  window.speechSynthesis.speak(utterance);
}

const makeSet = (id, level, name, icon, color, words) => ({
  id,
  level,
  name,
  icon,
  color,
  words,
});

const COURSE_SETS = [
  makeSet("animals", "A1 Start", "Zvířata", "🐘", COLORS.mint, [
    ["dog", "pes", "🐶"], ["cat", "kočka", "🐱"], ["rabbit", "králík", "🐰"],
    ["horse", "kůň", "🐴"], ["cow", "kráva", "🐮"], ["sheep", "ovce", "🐑"],
    ["pig", "prase", "🐷"], ["duck", "kachna", "🦆"], ["chicken", "kuře", "🐔"],
    ["fish", "ryba", "🐟"], ["bird", "pták", "🐦"], ["mouse", "myš", "🐭"],
    ["elephant", "slon", "🐘"], ["lion", "lev", "🦁"], ["tiger", "tygr", "🐯"],
    ["monkey", "opice", "🐵"], ["frog", "žába", "🐸"], ["bear", "medvěd", "🐻"],
    ["fox", "liška", "🦊"], ["penguin", "tučňák", "🐧"], ["dolphin", "delfín", "🐬"],
    ["butterfly", "motýl", "🦋"], ["bee", "včela", "🐝"], ["turtle", "želva", "🐢"],
  ]),
  makeSet("colors", "A1 Start", "Barvy a tvary", "🌈", COLORS.purple, [
    ["red", "červená", "🔴"], ["blue", "modrá", "🔵"], ["green", "zelená", "🟢"],
    ["yellow", "žlutá", "🟡"], ["pink", "růžová", "🩷"], ["orange", "oranžová", "🟠"],
    ["purple", "fialová", "🟣"], ["brown", "hnědá", "🟤"], ["black", "černá", "⚫"],
    ["white", "bílá", "⚪"], ["circle", "kruh", "⭕"], ["square", "čtverec", "⬜"],
    ["triangle", "trojúhelník", "🔺"], ["star", "hvězda", "⭐"], ["heart", "srdce", "❤️"],
  ]),
  makeSet("numbers", "A1 Start", "Čísla", "🔢", COLORS.yellow, [
    ["one", "jedna", "1️⃣"], ["two", "dva", "2️⃣"], ["three", "tři", "3️⃣"],
    ["four", "čtyři", "4️⃣"], ["five", "pět", "5️⃣"], ["six", "šest", "6️⃣"],
    ["seven", "sedm", "7️⃣"], ["eight", "osm", "8️⃣"], ["nine", "devět", "9️⃣"],
    ["ten", "deset", "🔟"], ["eleven", "jedenáct", "1️⃣"], ["twelve", "dvanáct", "2️⃣"],
    ["thirteen", "třináct", "3️⃣"], ["fourteen", "čtrnáct", "4️⃣"], ["fifteen", "patnáct", "5️⃣"],
    ["sixteen", "šestnáct", "6️⃣"], ["seventeen", "sedmnáct", "7️⃣"],
    ["eighteen", "osmnáct", "8️⃣"], ["nineteen", "devatenáct", "9️⃣"], ["twenty", "dvacet", "2️⃣"],
  ]),
  makeSet("family", "A1 Start", "Rodina a lidé", "👨‍👩‍👧", COLORS.pink, [
    ["mum", "máma", "👩"], ["dad", "táta", "👨"], ["sister", "sestra", "👧"],
    ["brother", "bratr", "👦"], ["grandma", "babička", "👵"], ["grandpa", "děda", "👴"],
    ["aunt", "teta", "👩"], ["uncle", "strýc", "👨"], ["baby", "miminko", "👶"],
    ["girl", "dívka", "👧"], ["boy", "chlapec", "👦"], ["friend", "kamarád", "🫶"],
    ["teacher", "učitel", "🧑‍🏫"], ["doctor", "lékař", "🧑‍⚕️"], ["family", "rodina", "👨‍👩‍👧"],
  ]),
  makeSet("body", "A1 Start", "Tělo", "🖐️", "#FFAA72", [
    ["head", "hlava", "🙂"], ["face", "obličej", "😊"], ["hair", "vlasy", "💇"],
    ["eye", "oko", "👁️"], ["ear", "ucho", "👂"], ["nose", "nos", "👃"],
    ["mouth", "ústa", "👄"], ["tooth", "zub", "🦷"], ["arm", "paže", "💪"],
    ["hand", "ruka", "✋"], ["finger", "prst", "☝️"], ["leg", "noha", "🦵"],
    ["knee", "koleno", "🦵"], ["foot", "chodidlo", "🦶"], ["tummy", "bříško", "🙂"],
  ]),
  makeSet("feelings", "A1 Start", "Pocity", "😊", "#FFD0A8", [
    ["happy", "šťastná", "😊"], ["sad", "smutná", "😢"], ["tired", "unavená", "😴"],
    ["hungry", "hladová", "🍽️"], ["thirsty", "žíznivá", "🥤"], ["angry", "rozzlobená", "😠"],
    ["scared", "vystrašená", "😨"], ["excited", "nadšená", "🤩"],
    ["surprised", "překvapená", "😮"], ["proud", "pyšná", "🥰"], ["calm", "klidná", "😌"],
  ]),
  makeSet("food", "Každý den", "Jídlo a pití", "🍎", "#9FD88F", [
    ["apple", "jablko", "🍎"], ["banana", "banán", "🍌"], ["orange", "pomeranč", "🍊"],
    ["pear", "hruška", "🍐"], ["grapes", "hrozny", "🍇"], ["strawberry", "jahoda", "🍓"],
    ["watermelon", "meloun", "🍉"], ["lemon", "citron", "🍋"], ["carrot", "mrkev", "🥕"],
    ["tomato", "rajče", "🍅"], ["potato", "brambora", "🥔"], ["corn", "kukuřice", "🌽"],
    ["bread", "chléb", "🍞"], ["rice", "rýže", "🍚"], ["pasta", "těstoviny", "🍝"],
    ["soup", "polévka", "🥣"], ["egg", "vejce", "🥚"], ["cheese", "sýr", "🧀"],
    ["milk", "mléko", "🥛"], ["water", "voda", "💧"], ["juice", "džus", "🧃"],
    ["tea", "čaj", "🫖"], ["cake", "dort", "🍰"], ["ice cream", "zmrzlina", "🍦"],
  ]),
  makeSet("home", "Každý den", "Doma", "🏠", COLORS.blue, [
    ["house", "dům", "🏠"], ["home", "domov", "🏡"], ["room", "pokoj", "🚪"],
    ["bedroom", "ložnice", "🛏️"], ["bathroom", "koupelna", "🛁"], ["kitchen", "kuchyně", "🍳"],
    ["living room", "obývák", "🛋️"], ["garden", "zahrada", "🌷"], ["door", "dveře", "🚪"],
    ["window", "okno", "🪟"], ["bed", "postel", "🛏️"], ["table", "stůl", "🍽️"],
    ["chair", "židle", "🪑"], ["sofa", "pohovka", "🛋️"], ["lamp", "lampa", "💡"],
  ]),
  makeSet("clothes", "Každý den", "Oblečení", "👗", "#F4B8D2", [
    ["T-shirt", "tričko", "👕"], ["shirt", "košile", "👔"], ["dress", "šaty", "👗"],
    ["skirt", "sukně", "🩱"], ["trousers", "kalhoty", "👖"], ["shorts", "kraťasy", "🩳"],
    ["sweater", "svetr", "🧶"], ["coat", "kabát", "🧥"], ["hat", "klobouk", "👒"],
    ["cap", "čepice", "🧢"], ["scarf", "šála", "🧣"], ["gloves", "rukavice", "🧤"],
    ["shoes", "boty", "👟"], ["boots", "holínky", "🥾"], ["socks", "ponožky", "🧦"],
  ]),
  makeSet("school", "Každý den", "Školka a škola", "🎒", "#A8D8C8", [
    ["school", "škola", "🏫"], ["kindergarten", "školka", "🏫"], ["classroom", "třída", "🧑‍🏫"],
    ["book", "kniha", "📕"], ["pencil", "tužka", "✏️"], ["paper", "papír", "📄"],
    ["notebook", "sešit", "📓"], ["crayon", "pastelka", "🖍️"], ["scissors", "nůžky", "✂️"],
    ["glue", "lepidlo", "🧴"], ["ruler", "pravítko", "📏"], ["question", "otázka", "❓"],
  ]),
  makeSet("toys", "Každý den", "Hračky a hry", "🧸", "#E8C98F", [
    ["toy", "hračka", "🧸"], ["doll", "panenka", "🪆"], ["teddy bear", "medvídek", "🧸"],
    ["ball", "míč", "⚽"], ["bike", "kolo", "🚲"], ["kite", "drak", "🪁"],
    ["robot", "robot", "🤖"], ["train", "vláček", "🚂"], ["car", "autíčko", "🚗"],
    ["dinosaur", "dinosaurus", "🦕"], ["princess", "princezna", "👸"], ["castle", "hrad", "🏰"],
  ]),
  makeSet("actions", "Komunikace", "Činnosti", "🏃", "#F6B27B", [
    ["run", "běžet", "🏃"], ["walk", "jít", "🚶"], ["jump", "skákat", "🤸"],
    ["sit", "sedět", "🪑"], ["stand", "stát", "🧍"], ["read", "číst", "📖"],
    ["write", "psát", "✍️"], ["draw", "kreslit", "🎨"], ["eat", "jíst", "🍽️"],
    ["drink", "pít", "🥤"], ["sleep", "spát", "😴"], ["play", "hrát si", "🎲"],
    ["sing", "zpívat", "🎤"], ["dance", "tančit", "💃"], ["swim", "plavat", "🏊"],
    ["listen", "poslouchat", "👂"], ["speak", "mluvit", "💬"], ["help", "pomoci", "🤝"],
  ]),
  makeSet("phrases", "Komunikace", "Užitečné fráze", "💬", COLORS.pink, [
    ["Hello!", "Ahoj!", "👋"], ["Good morning!", "Dobré ráno!", "🌅"],
    ["Goodbye!", "Na shledanou!", "👋"], ["Good night!", "Dobrou noc!", "🌙"],
    ["Thank you.", "Děkuji.", "🙏"], ["Please.", "Prosím.", "🙂"], ["Sorry.", "Promiň.", "🥺"],
    ["My name is Emma.", "Jmenuji se Emma.", "👧"], ["I am five years old.", "Je mi pět let.", "5️⃣"],
    ["How old are you?", "Kolik ti je let?", "🎂"], ["What is your name?", "Jak se jmenuješ?", "👤"],
    ["Where are you from?", "Odkud jsi?", "🌍"], ["I am from Prague.", "Jsem z Prahy.", "🏙️"],
    ["I am happy.", "Jsem šťastná.", "😊"], ["I am hungry.", "Mám hlad.", "🍽️"],
    ["I like it.", "Líbí se mi to.", "❤️"], ["Can you help me?", "Můžeš mi pomoci?", "🤝"],
    ["Can I play?", "Můžu si hrát?", "🎲"], ["I do not understand.", "Nerozumím.", "🤷"],
    ["What is this?", "Co je to?", "❓"], ["Where is it?", "Kde to je?", "📍"],
    ["Let us play!", "Pojďme si hrát!", "🎲"], ["Well done!", "Výborně!", "⭐"],
  ]),
  makeSet("nature", "Dobrodružství", "Příroda a počasí", "🌳", "#9FD88F", [
    ["sun", "slunce", "☀️"], ["moon", "měsíc", "🌙"], ["star", "hvězda", "⭐"],
    ["sky", "obloha", "🌤️"], ["cloud", "mrak", "☁️"], ["rain", "déšť", "🌧️"],
    ["snow", "sníh", "❄️"], ["wind", "vítr", "💨"], ["storm", "bouřka", "⛈️"],
    ["rainbow", "duha", "🌈"], ["tree", "strom", "🌳"], ["flower", "květina", "🌸"],
    ["river", "řeka", "🏞️"], ["lake", "jezero", "🏞️"], ["sea", "moře", "🌊"],
    ["mountain", "hora", "⛰️"], ["forest", "les", "🌲"], ["beach", "pláž", "🏖️"],
  ]),
  makeSet("transport", "Dobrodružství", "Doprava a výlety", "🚗", COLORS.blue, [
    ["car", "auto", "🚗"], ["bus", "autobus", "🚌"], ["train", "vlak", "🚆"],
    ["tram", "tramvaj", "🚊"], ["metro", "metro", "🚇"], ["taxi", "taxi", "🚕"],
    ["plane", "letadlo", "✈️"], ["boat", "loď", "⛵"], ["bike", "kolo", "🚲"],
    ["ticket", "lístek", "🎫"], ["station", "nádraží", "🚉"], ["airport", "letiště", "🛫"],
    ["holiday", "dovolená", "🏖️"], ["trip", "výlet", "🎒"], ["map", "mapa", "🗺️"],
  ]),
  makeSet("places", "Dobrodružství", "Místa", "🏙️", "#DCCFF8", [
    ["shop", "obchod", "🏪"], ["supermarket", "supermarket", "🛒"], ["bakery", "pekárna", "🥐"],
    ["library", "knihovna", "📚"], ["museum", "muzeum", "🏛️"], ["castle", "hrad", "🏰"],
    ["zoo", "zoo", "🦁"], ["park", "park", "🛝"], ["playground", "hřiště", "🛝"],
    ["cinema", "kino", "🎬"], ["hospital", "nemocnice", "🏥"], ["restaurant", "restaurace", "🍽️"],
    ["cafe", "kavárna", "☕"], ["farm", "farma", "🚜"], ["hotel", "hotel", "🏨"],
  ]),
  makeSet("be", "Gramatika", "I am, you are, he is", "🧩", "#CDBEF8", [
    ["I am Emma.", "Já jsem Emma.", "👧"], ["You are my friend.", "Ty jsi můj kamarád.", "🫶"],
    ["He is happy.", "On je šťastný.", "😊"], ["She is tired.", "Ona je unavená.", "😴"],
    ["It is a cat.", "To je kočka.", "🐱"], ["We are ready.", "My jsme připraveni.", "✅"],
    ["They are here.", "Oni jsou tady.", "👇"], ["I am not sad.", "Nejsem smutná.", "🙂"],
    ["Are you happy?", "Jsi šťastná?", "❓"], ["Is she your friend?", "Je to tvoje kamarádka?", "❓"],
  ]),
  makeSet("have", "Gramatika", "I have, she has", "🎒", "#BFE5D7", [
    ["I have a rabbit.", "Mám králíčka.", "🐰"], ["You have a toy.", "Máš hračku.", "🧸"],
    ["He has a bike.", "On má kolo.", "🚲"], ["She has a dog.", "Ona má psa.", "🐶"],
    ["We have two books.", "Máme dvě knihy.", "📚"], ["They have a car.", "Oni mají auto.", "🚗"],
    ["Do you have a ball?", "Máš míč?", "⚽"], ["Does she have a doll?", "Má panenku?", "🪆"],
  ]),
  makeSet("can", "Gramatika", "I can, I cannot", "💪", "#FFD28C", [
    ["I can swim.", "Umím plavat.", "🏊"], ["I can run.", "Umím běhat.", "🏃"],
    ["I can ride a bike.", "Umím jezdit na kole.", "🚲"], ["She can sing.", "Umí zpívat.", "🎤"],
    ["He can jump.", "Umí skákat.", "🤸"], ["I cannot fly.", "Neumím létat.", "🪽"],
    ["Can you swim?", "Umíš plavat?", "❓"], ["Can I play?", "Můžu si hrát?", "🎲"],
  ]),
  makeSet("prepositions", "Gramatika", "In, on, under, next to", "📦", "#C4E6F7", [
    ["The cat is in the box.", "Kočka je v krabici.", "📦"],
    ["The book is on the table.", "Kniha je na stole.", "📕"],
    ["The ball is under the chair.", "Míč je pod židlí.", "⚽"],
    ["The dog is next to the girl.", "Pes je vedle dívky.", "🐶"],
    ["The toy is behind the sofa.", "Hračka je za pohovkou.", "🧸"],
    ["Where is the rabbit?", "Kde je králík?", "🐰"],
  ]),
];

const LEVELS = [
  ["A1 Start", "🌟", "První slova, čísla, barvy, rodina a pocity"],
  ["Každý den", "🏠", "Domov, školka, jídlo, hračky a oblečení"],
  ["Komunikace", "💬", "Činnosti, otázky a užitečné věty"],
  ["Dobrodružství", "🗺️", "Příroda, místa a doprava"],
  ["Gramatika", "🧩", "I am, I have, I can a jednoduché věty"],
];

const VOCABULARY = COURSE_SETS
  .filter((set) => set.level !== "Gramatika")
  .flatMap((set) => set.words.map((word, wordIndex) => ({
    word,
    setId: set.id,
    id: `${set.id}-${wordIndex}`,
  })));

function Shell({ title, stars, onBack, children }) {
  return (
    <main className="min-h-screen bg-[#FFF9EF] p-4 text-[#24324A] md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {onBack && (
              <button onClick={onBack} className="shrink-0 rounded-2xl bg-white p-3 shadow" aria-label="Zpět">
                <ArrowLeft />
              </button>
            )}
            <h1 className="truncate text-2xl font-black md:text-4xl">{title}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-white px-4 py-3 font-black shadow">
            <Star className="fill-yellow-300 text-yellow-500" /> {stars}
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}

function HomePage({ stars, parentMode, goTo }) {
  const totalItems = COURSE_SETS.reduce((sum, set) => sum + set.words.length, 0);
  const cards = [
    ["english", "Angličtina", `${totalItems} slov, vět a gramatických příkladů`, Languages, COLORS.purple],
    ["games", "Anglické hry", "5 her a denní mise", Gamepad2, COLORS.yellow],
    ["world", "Můj svět", "Emma, oblečení, pokojíček a mazlíčci", Sparkles, COLORS.pink],
  ];

  return (
    <Shell title="Emmiččin svět 7.0" stars={stars}>
      <p className="mb-6 text-lg font-bold">Co dnes podnikneme? 🦄</p>
      {parentMode && <div className="mb-5 rounded-2xl bg-green-100 p-4 font-black">🔓 Rodičovský režim</div>}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([id, title, subtitle, Icon, color]) => (
          <motion.button
            key={id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => goTo(id)}
            className="min-h-52 rounded-[2rem] border-4 border-white p-6 text-left shadow"
            style={{ background: color }}
          >
            <Icon size={40} />
            <h2 className="mt-6 text-2xl font-black">{title}</h2>
            <p className="mt-2 font-semibold opacity-70">{subtitle}</p>
          </motion.button>
        ))}
      </div>
    </Shell>
  );
}

function EnglishPage({ stars, parentMode, reward, onBack }) {
  const [activeSet, setActiveSet] = useState(null);
  const [index, setIndex] = useState(0);
  const [known, setKnown] = useStore("emma-known-70", {});
  const [unknownOnly, setUnknownOnly] = useState(false);

  if (!activeSet) {
    const total = COURSE_SETS.reduce((sum, set) => sum + set.words.length, 0);
    const done = COURSE_SETS.reduce(
      (sum, set) => sum + set.words.filter((_, wordIndex) => known[`${set.id}-${wordIndex}`]).length,
      0,
    );

    return (
      <Shell title="Emmiččina angličtina" stars={stars} onBack={onBack}>
        <div className="mb-7 rounded-3xl bg-white p-5 shadow">
          <div className="flex justify-between font-black">
            <span>Celkový pokrok</span>
            <span>{done}/{total}</span>
          </div>
          <div className="mt-3 h-4 overflow-hidden rounded-full bg-orange-100">
            <div className="h-full bg-green-400" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
          </div>
        </div>

        {LEVELS.map(([level, icon, subtitle]) => {
          const sets = COURSE_SETS.filter((set) => set.level === level);
          return (
            <section key={level} className="mb-9">
              <h2 className="text-2xl font-black">{icon} {level}</h2>
              <p className="mb-4 font-semibold opacity-60">{subtitle}</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sets.map((set) => {
                  const doneInSet = set.words.filter((_, wordIndex) => known[`${set.id}-${wordIndex}`]).length;
                  const complete = doneInSet === set.words.length;
                  return (
                    <button
                      key={set.id}
                      onClick={() => {
                        setActiveSet(set);
                        setIndex(0);
                        setUnknownOnly(false);
                      }}
                      className={`min-h-40 rounded-[2rem] border-4 p-5 text-left shadow ${complete ? "border-green-500" : "border-white"}`}
                      style={{ background: set.color }}
                    >
                      <div className="flex justify-between text-4xl">
                        <span>{set.icon}</span>
                        <strong className="text-base">{doneInSet}/{set.words.length}</strong>
                      </div>
                      <h3 className="mt-5 text-xl font-black">{set.name}</h3>
                      {complete && <p className="mt-2 font-black text-green-800">✓ Hotovo</p>}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </Shell>
    );
  }

  const available = activeSet.words
    .map((word, wordIndex) => ({ word, wordIndex }))
    .filter(({ wordIndex }) => !unknownOnly || !known[`${activeSet.id}-${wordIndex}`]);

  if (!available.length) {
    return (
      <Shell title="Všechno umíš! 🎉" stars={stars} onBack={() => setActiveSet(null)}>
        <button onClick={() => setUnknownOnly(false)} className="rounded-2xl bg-green-200 p-4 font-black">
          Zobrazit všechno
        </button>
      </Shell>
    );
  }

  const safeIndex = index % available.length;
  const current = available[safeIndex];
  const key = `${activeSet.id}-${current.wordIndex}`;

  return (
    <Shell title={activeSet.name} stars={stars} onBack={() => setActiveSet(null)}>
      <button
        onClick={() => {
          setUnknownOnly((value) => !value);
          setIndex(0);
        }}
        className={`mb-4 rounded-2xl px-4 py-3 font-black ${unknownOnly ? "bg-green-200" : "bg-white"}`}
      >
        {unknownOnly ? "✓ Jen to, co ještě neumím" : "Zobrazit jen to, co ještě neumím"}
      </button>

      <div className="rounded-[2rem] bg-white p-8 text-center shadow">
        <div className="text-8xl">{current.word[2]}</div>
        <h2 className="mt-5 text-4xl font-black">{current.word[0]}</h2>
        <p className="mt-2 text-xl font-bold opacity-60">{current.word[1]}</p>
        <button
          onClick={() => speak(current.word[0])}
          className="mx-auto mt-6 flex items-center gap-2 rounded-2xl bg-blue-200 p-4 font-black"
        >
          <Volume2 /> Poslechnout
        </button>

        {parentMode ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => setKnown((value) => ({ ...value, [key]: false }))}
              className="rounded-2xl bg-orange-100 p-4 font-black"
            >
              Ještě procvičit
            </button>
            <button
              onClick={() => {
                if (!known[key]) reward(1);
                setKnown((value) => ({ ...value, [key]: true }));
              }}
              className="rounded-2xl bg-green-200 p-4 font-black"
            >
              {known[key] ? "✓ Umí" : "Umí +1 ⭐"}
            </button>
          </div>
        ) : (
          <p className="mt-6 font-bold opacity-60">Zvládnutí potvrdí rodič v rodičovském režimu.</p>
        )}

        <div className="mt-7 flex items-center justify-between">
          <button
            onClick={() => setIndex((value) => (value - 1 + available.length) % available.length)}
            className="rounded-2xl bg-orange-50 p-4"
            aria-label="Předchozí"
          >
            <ChevronLeft />
          </button>
          <strong>{safeIndex + 1}/{available.length}</strong>
          <button
            onClick={() => setIndex((value) => (value + 1) % available.length)}
            className="rounded-2xl bg-orange-50 p-4"
            aria-label="Další"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </Shell>
  );
}

function GamesPage({ stars, reward, onBack }) {
  const [mode, setMode] = useState("menu");
  const [question, setQuestion] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [locked, setLocked] = useState(false);
  const [cards, setCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [matched, setMatched] = useState([]);
  const [speakRevealed, setSpeakRevealed] = useState(false);
  const today = new Date().toLocaleDateString("sv-SE");
  const [mission, setMission] = useStore("emma-mission-70", { date: today, correct: 0, games: [] });

  useEffect(() => {
    if (mission.date !== today) {
      setMission({ date: today, correct: 0, games: [] });
    }
  }, [mission.date, setMission, today]);

  const current = VOCABULARY[question % VOCABULARY.length];
  const choices = useMemo(() => {
    const alternatives = VOCABULARY
      .filter((item) => item.id !== current.id && item.word[2] !== current.word[2])
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [current, ...alternatives].sort(() => Math.random() - 0.5);
  }, [current, mode]);

  const registerCorrect = (game) => {
    reward(1);
    setMission((value) => ({
      date: today,
      correct: value.correct + 1,
      games: value.games.includes(game) ? value.games : [...value.games, game],
    }));
  };

  const nextQuestion = () => {
    setQuestion((value) => value + 1);
    setFeedback("");
    setLocked(false);
    setSpeakRevealed(false);
  };

  const answer = (choice) => {
    if (locked) return;
    if (choice.id === current.id) {
      setLocked(true);
      registerCorrect(mode);
      setFeedback("✅ Správně! +1 ⭐");
      window.setTimeout(nextQuestion, 650);
    } else {
      setFeedback("💛 Zkus to ještě jednou");
    }
  };

  const startGame = (game) => {
    setMode(game);
    setQuestion(0);
    setFeedback("");
    setLocked(false);
    setSpeakRevealed(false);

    if (game === "memory") {
      const selected = [...VOCABULARY].sort(() => Math.random() - 0.5).slice(0, 6);
      const newCards = selected.flatMap((item, pair) => [
        { id: `word-${pair}`, pair, content: item.word[0], sound: item.word[0] },
        { id: `image-${pair}`, pair, content: item.word[2], sound: item.word[0] },
      ]).sort(() => Math.random() - 0.5);
      setCards(newCards);
      setOpenCards([]);
      setMatched([]);
    }
  };

  const flipCard = (card) => {
    if (openCards.length === 2 || openCards.includes(card.id) || matched.includes(card.pair)) return;
    const next = [...openCards, card.id];
    setOpenCards(next);
    speak(card.sound);

    if (next.length === 2) {
      const first = cards.find((item) => item.id === next[0]);
      if (first?.pair === card.pair) {
        setMatched((value) => [...value, card.pair]);
        registerCorrect("memory");
        window.setTimeout(() => setOpenCards([]), 250);
      } else {
        window.setTimeout(() => setOpenCards([]), 700);
      }
    }
  };

  const grammarBank = [
    ["I ___ Emma.", "am", ["am", "is", "are", "have"]],
    ["You ___ my friend.", "are", ["am", "is", "are", "has"]],
    ["She ___ happy.", "is", ["am", "is", "are", "have"]],
    ["He ___ a bike.", "has", ["has", "have", "is", "are"]],
    ["I ___ a rabbit.", "have", ["have", "has", "am", "are"]],
    ["I ___ swim.", "can", ["can", "am", "have", "is"]],
    ["There ___ two cats.", "are", ["is", "are", "am", "has"]],
  ];
  const grammarQuestion = grammarBank[question % grammarBank.length];

  const gameBack = () => {
    setMode("menu");
    setFeedback("");
    setLocked(false);
    window.speechSynthesis?.cancel();
  };

  if (mode === "menu") {
    const games = [
      ["pick", "🖼️", "Najdi obrázek"],
      ["listen", "🎧", "Poslechni a vyber"],
      ["memory", "🃏", "Obrázkové pexeso"],
      ["speak", "🎤", "Řekni to nahlas"],
      ["grammar", "🧩", "Doplň větu"],
      ["mission", "🏆", "Mise dne"],
    ];
    return (
      <Shell title="Hraj si s angličtinou" stars={stars} onBack={onBack}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map(([id, icon, title]) => (
            <button
              key={id}
              onClick={() => startGame(id)}
              className="min-h-44 rounded-[2rem] border-4 border-white bg-yellow-100 p-5 text-left shadow"
            >
              <div className="text-5xl">{icon}</div>
              <h2 className="mt-5 text-xl font-black">{title}</h2>
            </button>
          ))}
        </div>
      </Shell>
    );
  }

  if (mode === "mission") {
    const tasks = [
      ["Zahraj si 3 různé hry", mission.games.length, 3, "🎮"],
      ["Odpověz 10× správně", mission.correct, 10, "⭐"],
    ];
    return (
      <Shell title="Mise dne" stars={stars} onBack={gameBack}>
        <div className="space-y-4">
          {tasks.map(([title, value, target, icon]) => (
            <div key={title} className="rounded-3xl bg-white p-5 shadow">
              <div className="flex justify-between font-black">
                <span>{icon} {title}</span>
                <span>{Math.min(value, target)}/{target}</span>
              </div>
              <div className="mt-3 h-4 overflow-hidden rounded-full bg-orange-100">
                <div className="h-full bg-green-400" style={{ width: `${Math.min(100, (value / target) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  if (mode === "memory") {
    return (
      <Shell title="Obrázkové pexeso" stars={stars} onBack={gameBack}>
        <div className="mb-4 flex justify-end">
          <button onClick={() => startGame("memory")} className="rounded-2xl bg-white p-3 font-black">Nová hra</button>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {cards.map((card) => {
            const visible = openCards.includes(card.id) || matched.includes(card.pair);
            return (
              <button key={card.id} onClick={() => flipCard(card)} className="h-28 rounded-2xl bg-purple-100 p-2 text-xl font-black shadow">
                {visible ? card.content : "⭐"}
              </button>
            );
          })}
        </div>
        {matched.length === 6 && <div className="mt-5 rounded-2xl bg-green-200 p-5 text-center text-2xl font-black">🎉 Pexeso dokončeno!</div>}
      </Shell>
    );
  }

  if (mode === "grammar") {
    return (
      <Shell title="Doplň větu" stars={stars} onBack={gameBack}>
        <div className="rounded-[2rem] bg-white p-7 text-center shadow">
          <h2 className="text-3xl font-black">{grammarQuestion[0]}</h2>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {grammarQuestion[2].map((option) => (
              <button
                key={option}
                disabled={locked}
                onClick={() => {
                  if (locked) return;
                  if (option === grammarQuestion[1]) {
                    setLocked(true);
                    registerCorrect("grammar");
                    setFeedback("✅ Správně! +1 ⭐");
                    window.setTimeout(nextQuestion, 650);
                  } else {
                    setFeedback("💛 Zkus to znovu");
                  }
                }}
                className="rounded-2xl bg-purple-100 p-5 text-2xl font-black disabled:opacity-60"
              >
                {option}
              </button>
            ))}
          </div>
          {feedback && <p className="mt-5 font-black">{feedback}</p>}
        </div>
      </Shell>
    );
  }

  if (mode === "speak") {
    return (
      <Shell title="Řekni to nahlas" stars={stars} onBack={gameBack}>
        <div className="rounded-[2rem] bg-white p-8 text-center shadow">
          <div className="text-8xl">{current.word[2]}</div>
          <h2 className="mt-4 text-2xl font-black">Jak se to řekne anglicky?</h2>
          <button
            onClick={() => {
              speak(current.word[0]);
              setSpeakRevealed(true);
            }}
            className="mt-5 rounded-2xl bg-blue-200 p-4 font-black"
          >
            <Volume2 className="inline" /> Přehrát odpověď
          </button>
          {speakRevealed && <p className="mt-4 text-3xl font-black">{current.word[0]}</p>}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              disabled={locked}
              onClick={() => {
                if (locked) return;
                setLocked(true);
                registerCorrect("speak");
                window.setTimeout(nextQuestion, 300);
              }}
              className="rounded-2xl bg-green-200 p-4 font-black disabled:opacity-60"
            >
              Řekla jsem to správně
            </button>
            <button onClick={nextQuestion} className="rounded-2xl bg-orange-100 p-4 font-black">Ještě procvičím</button>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell title={mode === "listen" ? "Poslechni a vyber" : "Najdi správný obrázek"} stars={stars} onBack={gameBack}>
      <div className="rounded-[2rem] bg-white p-7 text-center shadow">
        <h2 className="text-4xl font-black">{mode === "listen" ? "Co slyšíš?" : current.word[0]}</h2>
        <button onClick={() => speak(current.word[0])} className="mt-4 rounded-full bg-blue-200 p-5" aria-label="Přehrát slovo">
          <Volume2 />
        </button>
        <div className="mt-7 grid grid-cols-2 gap-4">
          {choices.map((choice) => (
            <button
              key={choice.id}
              disabled={locked}
              onClick={() => answer(choice)}
              className="h-36 rounded-3xl border-4 border-white bg-orange-50 text-7xl shadow disabled:opacity-60"
            >
              {choice.word[2]}
            </button>
          ))}
        </div>
        {feedback && <div className="mt-5 rounded-2xl bg-yellow-100 p-4 text-xl font-black">{feedback}</div>}
      </div>
    </Shell>
  );
}

const WORLD_CATEGORIES = ["accessories", "outfits", "shoes", "makeup", "rare", "room", "pets"];
const WORLD_LABELS = {
  accessories: "🎀 Doplňky",
  outfits: "👗 Oblečení",
  shoes: "👟 Boty",
  makeup: "💄 Make-up",
  rare: "✨ Vzácné",
  room: "🛏️ Pokojíček",
  pets: "🐾 Zvířátka",
};
const WORLD_SHOP = {
  accessories: [["Růžová mašle", "🎀", 10], ["Květinová čelenka", "🌸", 15], ["Duhová sponka", "🌈", 20], ["Kočičí ouška", "🐱", 30], ["Korunka", "👑", 40], ["Jednorožčí čelenka", "🦄", 55]],
  outfits: [["Růžové šaty", "👗", 0], ["Puntíkaté šaty", "🔴", 20], ["Denimová sukně", "🩵", 25], ["Baletní tutu", "🩰", 30], ["Zimní outfit", "🧥", 35], ["Princeznovské šaty", "👸", 45], ["Vílí šaty", "🧚", 55], ["Duhové šaty", "🌈", 65], ["Jednorožčí overal", "🦄", 80]],
  shoes: [["Bílé tenisky", "👟", 0], ["Růžové holínky", "🥾", 20], ["Kočičí bačkory", "🐱", 25], ["Duhové tenisky", "🌈", 35], ["Stříbrné boty", "🪩", 45], ["Zlaté střevíčky", "✨", 60]],
  makeup: [["Růžové tvářičky", "😊", 10], ["Hvězdičky", "⭐", 15], ["Motýlek", "🦋", 20], ["Kočičí nosík", "🐱", 20], ["Třpytky", "✨", 25], ["Duhový make-up", "🌈", 30]],
  rare: [["Obří brýle", "🤓", 75], ["Knírek", "🥸", 80], ["Žabí koruna", "🐸", 100], ["Mini drak", "🐉", 140], ["Dračí křídla", "🐲", 180], ["Duhová aura", "🌈", 220]],
  room: [["Růžový koberec", "🩷", 20], ["Postel s nebesy", "🛏️", 50], ["Duhová lampa", "🌈", 35], ["Polička na knihy", "📚", 30], ["Hvězdná tapeta", "⭐", 60], ["Domeček pro mazlíčka", "🏠", 45]],
  pets: [["Králíček", "🐰", 40], ["Kočička", "🐱", 50], ["Pejsek", "🐶", 55], ["Křeček", "🐹", 35], ["Jednorožec", "🦄", 120], ["Mini dráček", "🐲", 160]],
};

function WorldPage({ stars, setStars, onBack }) {
  const [category, setCategory] = useState("accessories");
  const [owned, setOwned] = useStore("emma-owned-world-70", ["outfits:Růžové šaty", "shoes:Bílé tenisky"]);
  const [equipped, setEquipped] = useStore("emma-equipped-world-70", {
    outfits: "Růžové šaty",
    shoes: "Bílé tenisky",
  });
  const [message, setMessage] = useState("");

  const selectedItem = (categoryName) => {
    const selected = equipped[categoryName];
    return WORLD_SHOP[categoryName]?.find((item) => item[0] === selected);
  };

  const buyOrUse = (item) => {
    const id = `${category}:${item[0]}`;
    const isOwned = owned.includes(id);

    if (isOwned) {
      setEquipped((value) => ({
        ...value,
        [category]: value[category] === item[0] ? null : item[0],
      }));
      setMessage(equipped[category] === item[0] ? "Sundáno" : "Používám! ✨");
      return;
    }

    if (stars < item[2]) {
      setMessage("Ještě potřebuješ více hvězdiček.");
      return;
    }

    setStars((value) => value - item[2]);
    setOwned((value) => [...value, id]);
    setEquipped((value) => ({ ...value, [category]: item[0] }));
    setMessage("Koupeno a použito! 🎉");
  };

  const roomItem = selectedItem("room");
  const petItem = selectedItem("pets");

  return (
    <Shell title="Můj svět" stars={stars} onBack={onBack}>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.5fr]">
        <div className="rounded-[2rem] bg-pink-100 p-6 text-center shadow">
          <div className="relative mx-auto h-72 max-w-sm overflow-hidden rounded-[2rem] bg-gradient-to-b from-purple-100 to-pink-50">
            {roomItem && <div className="absolute bottom-4 left-4 text-6xl">{roomItem[1]}</div>}
            {petItem && <div className="absolute bottom-5 right-5 text-6xl">{petItem[1]}</div>}
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative text-9xl">
                👧
                {selectedItem("accessories") && <span className="absolute -right-5 -top-7 text-5xl">{selectedItem("accessories")[1]}</span>}
                {selectedItem("makeup") && <span className="absolute -right-4 top-9 text-3xl">{selectedItem("makeup")[1]}</span>}
                {selectedItem("rare") && <span className="absolute -left-14 bottom-0 text-5xl">{selectedItem("rare")[1]}</span>}
              </div>
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-black">Emma</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {Object.values(equipped).filter(Boolean).map((item) => (
              <span key={item} className="rounded-full bg-white px-3 py-1 text-sm font-bold">{item}</span>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
            {WORLD_CATEGORIES.map((categoryName) => (
              <button
                key={categoryName}
                onClick={() => {
                  setCategory(categoryName);
                  setMessage("");
                }}
                className={`shrink-0 rounded-2xl px-4 py-3 font-black ${category === categoryName ? "bg-[#24324A] text-white" : "bg-white"}`}
              >
                {WORLD_LABELS[categoryName]}
              </button>
            ))}
          </div>

          {message && <div className="mb-4 rounded-2xl bg-yellow-100 p-3 text-center font-black">{message}</div>}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WORLD_SHOP[category].map((item) => {
              const id = `${category}:${item[0]}`;
              const isOwned = owned.includes(id);
              const isEquipped = equipped[category] === item[0];
              return (
                <button
                  key={id}
                  onClick={() => buyOrUse(item)}
                  className={`min-h-40 rounded-[2rem] border-4 bg-white p-4 text-center shadow ${isEquipped ? "border-green-500" : isOwned ? "border-yellow-300" : "border-white"}`}
                >
                  <div className="text-6xl">{item[1]}</div>
                  <h3 className="mt-3 font-black">{item[0]}</h3>
                  <div className="mt-3 rounded-xl bg-orange-50 p-2 font-black">
                    {isEquipped ? "✓ Používám" : isOwned ? "Použít" : item[2] === 0 ? "Zdarma" : `${item[2]} ⭐`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Shell>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [stars, setStars] = useStore("emma-stars-70", 120);
  const [parentMode, setParentMode] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  const back = () => {
    window.speechSynthesis?.cancel();
    setPage("home");
  };
  const reward = (amount) => setStars((value) => value + amount);

  return (
    <>
      {page === "home" && <HomePage stars={stars} parentMode={parentMode} goTo={setPage} />}
      {page === "english" && <EnglishPage stars={stars} parentMode={parentMode} reward={reward} onBack={back} />}
      {page === "games" && <GamesPage stars={stars} reward={reward} onBack={back} />}
      {page === "world" && <WorldPage stars={stars} setStars={setStars} onBack={back} />}

      <button
        onClick={() => {
          if (parentMode) {
            setParentMode(false);
          } else {
            setShowPin(true);
            setPinError("");
          }
        }}
        className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-2xl bg-[#24324A] text-white shadow-lg"
        aria-label="Rodičovský režim"
      >
        {parentMode ? <Home /> : <LockKeyhole />}
      </button>

      {showPin && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-[2rem] bg-white p-6 text-center shadow-xl">
            <button
              onClick={() => {
                setShowPin(false);
                setPin("");
                setPinError("");
              }}
              className="ml-auto block p-2"
              aria-label="Zavřít"
            >
              <X />
            </button>
            <h2 className="text-2xl font-black">Rodičovský PIN</h2>
            <p className="mt-2 opacity-60">Výchozí PIN je 2468</p>
            <input
              value={pin}
              onChange={(event) => {
                setPin(event.target.value.replace(/\D/g, "").slice(0, 4));
                setPinError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && pin === "2468") {
                  setParentMode(true);
                  setShowPin(false);
                  setPin("");
                }
              }}
              type="password"
              inputMode="numeric"
              className="mt-5 w-full rounded-2xl bg-orange-50 p-4 text-center text-3xl"
              aria-label="Rodičovský PIN"
            />
            {pinError && <p className="mt-3 font-bold text-red-600">{pinError}</p>}
            <button
              onClick={() => {
                if (pin === "2468") {
                  setParentMode(true);
                  setShowPin(false);
                  setPin("");
                  setPinError("");
                } else {
                  setPinError("PIN není správný.");
                }
              }}
              className="mt-4 w-full rounded-2xl bg-green-200 p-4 font-black"
            >
              Odemknout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
