const assetPathPrefix = "/assets";

// Reusable brand assets pulled from the Irreecha poster design
const icCalendar = `${assetPathPrefix}/e0b19.svg`;
const icClock = `${assetPathPrefix}/3b5a3.svg`;
const icPin = `${assetPathPrefix}/d757d.svg`;
const logoOrganizer = `${assetPathPrefix}/47030.svg`;
const logoMedia = `${assetPathPrefix}/a7fb6.svg`;
const logoTech = `${assetPathPrefix}/11af9.png`;
const floralA = `${assetPathPrefix}/61830.svg`;
const floralB = `${assetPathPrefix}/9fc6e.svg`;
const floralC = `${assetPathPrefix}/783ce.svg`;
const floralD = `${assetPathPrefix}/c0be3.svg`;

type Artist = { img: string; first: string; last: string; pos?: string };

// Sky Light Hotel lineup — names taken from the reference poster
const skylight: Artist[] = [
  { img: "e2465.png", first: "Adem", last: "Mohammed", pos: "50% 6%" },
  { img: "ad01e.png", first: "Gelana", last: "Garomsa", pos: "50% 4%" },
  { img: "701af.png", first: "Amalmal", last: "Abate", pos: "50% 12%" },
  { img: "0df02.png", first: "Jambo", last: "Jote", pos: "50% 4%" },
  { img: "bf80a.png", first: "Shukri", last: "Jemal", pos: "50% 6%" },
];

// Arada Park lineup — placeholder names, swap for the real artists
const arada: Artist[] = [
  { img: "192d4.png", first: "Roba", last: "Dabalaa", pos: "50% 18%" },
  { img: "e599b.png", first: "Dagii", last: "Faayisaa", pos: "50% 6%" },
  { img: "feffb.png", first: "Kennaa", last: "Margaa", pos: "50% 6%" },
  { img: "5b1ea.png", first: "Abbaa", last: "Urjii", pos: "50% 6%" },
  { img: "9dc51.png", first: "Getuu", last: "Fufaa", pos: "50% 8%" },
  { img: "739f2.png", first: "Saboontuu", last: "Warqaa", pos: "50% 4%" },
];

function Portrait({ a }: { a: Artist }) {
  return (
    <div className="flex flex-col items-center gap-[0.6cqw]">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.4cqw] rounded-t-[999px] border-[0.18cqw] border-[rgba(246,199,68,0.55)] bg-[radial-gradient(120%_90%_at_50%_18%,#1f7a3a_0%,#0e5228_55%,#062f18_100%)] shadow-[0_1cqw_3cqw_rgba(0,0,0,0.5)]">
        <img
          src={`${assetPathPrefix}/${a.img}`}
          alt={`${a.first} ${a.last}`}
          className="absolute inset-0 size-full scale-[1.14] object-cover"
          style={{ objectPosition: a.pos ?? "50% 8%" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#062f18] via-[rgba(6,47,24,0.35)] to-transparent" />
      </div>
      <div className="text-center leading-none">
        <p
          className="text-[1.55cqw] tracking-[0.12cqw] text-white"
          style={{ fontFamily: "'Bebas Neue:Regular'", textShadow: "0 0.3cqw 1cqw rgba(0,0,0,0.7)" }}
        >
          {a.first}
        </p>
        <p
          className="text-[1.25cqw] tracking-[0.12cqw] text-[#f6c744]"
          style={{ fontFamily: "'Bebas Neue:Regular'", textShadow: "0 0.3cqw 1cqw rgba(0,0,0,0.7)" }}
        >
          {a.last}
        </p>
      </div>
    </div>
  );
}

function VenueBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-[0.9cqw] rounded-full border-[0.18cqw] border-[rgba(246,199,68,0.55)] bg-[rgba(6,50,26,0.72)] px-[1.8cqw] py-[0.7cqw] shadow-[0_0.8cqw_2.6cqw_rgba(0,0,0,0.45)] backdrop-blur-sm">
      <img src={icPin} alt="" className="size-[1.6cqw]" />
      <span
        className="text-[1.5cqw] uppercase tracking-[0.12cqw] text-white"
        style={{ fontFamily: "'Montserrat:Bold'", fontWeight: 700 }}
      >
        {label}
      </span>
    </div>
  );
}

function InfoPill({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-[0.7cqw] rounded-full border-[0.16cqw] border-[rgba(246,199,68,0.55)] bg-[rgba(6,50,26,0.72)] px-[1.4cqw] py-[0.55cqw] shadow-[0_0.8cqw_2.4cqw_rgba(0,0,0,0.4)] backdrop-blur-sm">
      <img src={icon} alt="" className="size-[1.3cqw]" />
      <span
        className="whitespace-nowrap text-[1.05cqw] uppercase tracking-[0.06cqw] text-white"
        style={{ fontFamily: "'Montserrat:Bold'", fontWeight: 700 }}
      >
        {children}
      </span>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#05170c] p-4 sm:p-8">
      <div className="@container relative aspect-[16/9] w-full max-w-[1360px] overflow-hidden rounded-[1.4cqw] shadow-[0_40px_120px_rgba(0,0,0,0.6)] ring-1 ring-[rgba(246,199,68,0.25)]">
        {/* Ground: green radial field */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(125% 95% at 50% 25%, #cfe97a 0%, #a3cd6a 9%, #77b25a 19%, #4b964a 28%, #358842 33%, #1f7a3a 40%, #155c2d 69%, #0b3d1f 100%)",
          }}
        />
        {/* Sunburst rays */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "repeating-conic-gradient(from 90deg at 50% 22%, rgba(255,255,255,0.9) 0deg 0.55deg, transparent 0.55deg 2deg)",
            maskImage: "radial-gradient(70% 70% at 50% 22%, #000 0%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(70% 70% at 50% 22%, #000 0%, transparent 72%)",
          }}
        />
        {/* Gold bottom glow */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(60% 32% at 50% 100%, rgba(246,199,68,0.8) 0%, rgba(246,199,68,0) 70%)",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(150% 90% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Floral corner ornaments */}
        <img src={floralA} alt="" className="absolute left-[1.5cqw] top-[26cqw] w-[3.9cqw] opacity-90 drop-shadow-[0_0.3cqw_0.3cqw_rgba(0,0,0,0.4)]" />
        <img src={floralA} alt="" className="absolute right-[1.5cqw] top-[26cqw] w-[3.9cqw] -scale-x-100 opacity-90 drop-shadow-[0_0.3cqw_0.3cqw_rgba(0,0,0,0.4)]" />
        <img src={floralC} alt="" className="absolute left-[4.3cqw] top-[21cqw] w-[2.3cqw] opacity-90" />
        <img src={floralC} alt="" className="absolute right-[4.3cqw] top-[21cqw] w-[2.3cqw] opacity-90" />
        <img src={floralB} alt="" className="absolute -left-[0.6cqw] top-[47cqw] w-[4.4cqw] opacity-90" />
        <img src={floralB} alt="" className="absolute -right-[0.6cqw] top-[47cqw] w-[4.4cqw] -scale-x-100 opacity-90" />
        <img src={floralD} alt="" className="absolute left-[2.7cqw] top-[17cqw] w-[1.8cqw] opacity-90" />
        <img src={floralD} alt="" className="absolute right-[2.7cqw] top-[17cqw] w-[1.8cqw] opacity-90" />

        {/* ---------- Content ---------- */}
        <div className="relative flex size-full flex-col px-[3cqw] pt-[3cqw] pb-[6cqw]">
          {/* Header */}
          <header className="flex flex-col items-center text-center">
            <p
              className="text-[1.15cqw] uppercase tracking-[0.34cqw] text-[#fff3b0]"
              style={{ fontFamily: "'Poppins:SemiBold'", fontWeight: 600, textShadow: "0 0.1cqw 0.6cqw rgba(0,0,0,0.5)" }}
            >
              Meseret Daba Event &amp; Promotion
            </p>
            <h1
              className="mt-[0.6cqw] bg-clip-text text-[9cqw] leading-[0.82] tracking-[0.18cqw] text-transparent"
              style={{
                fontFamily: "'Anton:Regular'",
                backgroundImage:
                  "linear-gradient(180deg, #fff3b0 0%, #f6c744 45%, #b7791f 72%, #fff3b0 100%)",
                filter: "drop-shadow(0 1.1cqw 0.7cqw rgba(0,0,0,0.55))",
              }}
            >
              IRREECHA
            </h1>
            <h2
              className="mt-[0.4cqw] text-[4.7cqw] leading-none tracking-[0.4cqw] text-white"
              style={{ fontFamily: "'Bebas Neue:Regular'", textShadow: "0 0.9cqw 1.6cqw rgba(0,0,0,0.5)" }}
            >
              UNITY <span className="text-[#f6c744]">CONCERT</span> 2026
            </h2>
            <p
              className="mt-[0.5cqw] text-[1.05cqw] uppercase tracking-[0.22cqw] text-white/90"
              style={{ fontFamily: "'Poppins:SemiBold'", fontWeight: 600 }}
            >
              Konsartii Tokkummaa Irreechaa
            </p>
            <div className="mt-[1.4cqw] flex flex-wrap items-center justify-center gap-[1cqw]">
              <InfoPill icon={icCalendar}>Friday Night · October 2, 2026 · Fulbaana 22</InfoPill>
              <InfoPill icon={icClock}>6:00 PM / 12:00 LT</InfoPill>
            </div>
          </header>

          {/* Two venue panels */}
          <div className="relative mt-[2.2cqw] grid flex-1 grid-cols-2 gap-[3cqw]">
            {/* Center divider */}
            <div className="pointer-events-none absolute inset-y-[1cqw] left-1/2 flex -translate-x-1/2 flex-col items-center">
              <div className="h-full w-[0.16cqw] bg-gradient-to-b from-transparent via-[rgba(246,199,68,0.6)] to-transparent" />
            </div>

            {/* Arada Park */}
            <section className="flex flex-col items-center">
              <VenueBadge label="Arada Park" />
              <div className="mt-[1.8cqw] flex w-full flex-wrap justify-center gap-x-[1.6cqw] gap-y-[1.6cqw]">
                {arada.map((a) => (
                  <div key={a.img} className="w-[29%]">
                    <Portrait a={a} />
                  </div>
                ))}
              </div>
            </section>

            {/* Sky Light Hotel */}
            <section className="flex flex-col items-center">
              <VenueBadge label="Sky Light Hotel" />
              <div className="mt-[1.8cqw] flex w-full flex-wrap justify-center gap-x-[1.6cqw] gap-y-[1.6cqw]">
                {skylight.map((a) => (
                  <div key={a.img} className="w-[29%]">
                    <Portrait a={a} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-[2.4cqw] border-t-[0.16cqw] border-[rgba(246,199,68,0.55)] bg-[rgba(4,36,18,0.85)] px-[3cqw] py-[1.1cqw] backdrop-blur-sm">
          <div className="flex items-center gap-[1cqw]">
            <span
              className="text-[0.85cqw] uppercase tracking-[0.24cqw] text-[#fff3b0]/85"
              style={{ fontFamily: "'Poppins:SemiBold'", fontWeight: 600 }}
            >
              Organized by
            </span>
            <img src={logoOrganizer} alt="Meseret Daba Event and Promotion" className="h-[2.1cqw]" />
          </div>
          <div className="h-[2cqw] w-[0.1cqw] bg-[rgba(246,199,68,0.5)]" />
          <div className="flex items-center gap-[1cqw]">
            <span
              className="text-[0.85cqw] uppercase tracking-[0.24cqw] text-[#fff3b0]/85"
              style={{ fontFamily: "'Poppins:SemiBold'", fontWeight: 600 }}
            >
              Media Partner
            </span>
            <img src={logoMedia} alt="Media partner" className="h-[2.4cqw]" />
          </div>
          <div className="h-[2cqw] w-[0.1cqw] bg-[rgba(246,199,68,0.5)]" />
          <div className="flex items-center gap-[1cqw]">
            <span
              className="text-[0.85cqw] uppercase tracking-[0.24cqw] text-[#fff3b0]/85"
              style={{ fontFamily: "'Poppins:SemiBold'", fontWeight: 600 }}
            >
              Tech Partner
            </span>
            <img src={logoTech} alt="Tech partner Jirtuu" className="h-[2.1cqw]" />
          </div>
        </footer>
      </div>
    </div>
  );
}
