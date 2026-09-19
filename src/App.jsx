import React, { useRef, useState } from "react";

const projects = [
  {
    type: "Dashboard",
    title: "Eventora",
    description:
      "A responsive platform for event organizers to post their events and for the people to buy tickets online.",
    tags: ["React", "Node.js", "MongoDB", "Express.js"],
    visual: "analytics",
    image: "/images/eventora.png",
    href: "https://event-frontend-sand.vercel.app/"
  },
  {
    type: "Experience",
    title: "Multiplayer Chess Game",
    description:
      "A real-time multiplayer chess game allowing players to compete against each other online.",
    tags: ["React", "Node.js", "Socket.io", "Express.js", "Chess.js"],
    visual: "mobile",
    image: "/images/chess.webp",
    href: "https://chess-frontend-woad.vercel.app/"
  },
  {
    type: "Platform",
    title: "Dentist's Clinic",
    description:
      "A web application for patients to view services online for the clinic.",
    tags: ["HTML", "CSS", "Javascript", "React.js"],
    visual: "commerce",
    image: "/images/dentist.webp"
  }
];

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "REST APIs",
  "Auth",
  "Testing",
  "CI/CD",
  "UI Motion"
];

const emailAddress = "rahuldhandore9@gmail.com";
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;

const songs = [
  {
    title: "Mahabharat",
    artist: "",
    mood: "",
    src: "/audio/Mahabharat – Title Song  Mahabharat (महाभारत) Stories  B. R. Chopra - Pen  Bhakti.mp3",
    cover: "/covers/mahabharat.jpg"
  },
  {
    title: "Gale lag ja",
    artist: "",
    mood: "",
    src: "/audio/Gale-Lag-Ja-4K-Video-De-Dana-Dan-Akshay-Kumar-Katrina-Kaif-Ishtar-Music.mp3",
    cover: "/covers/Gale_lag_ja.jpg"
  },
  {
    title: "Starboy",
    artist: "The Weeknd",
    mood: "",
    src: "/audio/starboy.mp3",
    cover: "/covers/starboy.webp"
  },
  {
    title: "Besabriyan",
    artist: "",
    mood: "",
    src: "/audio/besabriyan.mp3",
    cover: "/covers/besabriyan.jpg"
  },
  {
    title: "Pasoori",
    artist: "",
    mood: "",
    src: "/audio/Pasoori Shae Gill 128 Kbps.mp3",
    cover: "/covers/Pasoori.jpg"
  },
  {
    title: "You & Me",
    artist: "",
    mood: "",
    src: "/audio/You And Me Ringtone Ringtone (DjPunjab.is).mp3",
    cover: "/covers/shubh.webp"
  },
  {
    title: "Still Rollin",
    artist: "",
    mood: "",
    src: "/audio/Still Rollin Ringtone Ringtone (DjPunjab.is).mp3",
    cover: "/covers/still-rollin.webp"
  },
  {
    title: "Wavy",
    artist: "",
    mood: "",
    src: "/audio/Wavy - Karan Aujla.mp3",
    cover: "/covers/wavy.jpg"
  },
  {
    title: "Gehra hua",
    artist: "",
    mood: "",
    src: "/audio/Gehra Hua Dhurandhar 128 Kbps.mp3",
    cover: "/covers/gehra hua.jpg"
  },
];

function formatTime(value) {
  if (!Number.isFinite(value)) return "0:00";

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function getScatterStyle(index) {
  const positions = [
    { left: "1%", top: 18, rotate: "-8deg" },
    { left: "18%", top: 92, rotate: "6deg" },
    { left: "34%", top: 14, rotate: "3deg" },
    { left: "50%", top: 128, rotate: "-5deg" },
    { left: "68%", top: 42, rotate: "8deg" },
    { left: "84%", top: 164, rotate: "-4deg" },
    { left: "9%", top: 318, rotate: "5deg" },
    { left: "39%", top: 272, rotate: "-7deg" },
    { left: "64%", top: 338, rotate: "4deg" }
  ];
  const position = positions[index % positions.length];
  const rowOffset = Math.floor(index / positions.length) * 560;

  return {
    "--scatter-left": position.left,
    "--scatter-top": `${position.top + rowOffset}px`,
    "--scatter-rotate": position.rotate
  };
}

function getScatterStageStyle(songCount) {
  const rows = Math.max(1, Math.ceil(songCount / 9));

  return {
    "--scatter-height": `${rows * 560 + 20}px`
  };
}

function Header({
  activeSong,
  audioRef,
  duration,
  isPlaying,
  playerStatus,
  progress,
  togglePlayback,
  handleProgressChange
}) {
  const song = activeSong || songs[0];
  const artist = song.artist || "Rahul's Mix";

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Home">
        <span className="brand-mark">R</span>
        <span>Rahul's Portfolio</span>
      </a>
      <div className={`nav-player ${isPlaying ? "is-playing" : ""}`} aria-label="Music player">
        <div className="nav-player-cover" aria-hidden="true">
          <img
            src={song.cover}
            alt=""
            onError={(event) => {
              event.currentTarget.parentElement.classList.add("is-missing");
              event.currentTarget.remove();
            }}
          />
          <span className="nav-equalizer">
            <span />
            <span />
            <span />
          </span>
        </div>
        <div className="nav-player-copy">
          <span>{playerStatus}</span>
          <strong>{song.title}</strong>
          <p>{artist}</p>
        </div>
        <button className="player-icon-button" type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? (
            <span className="pause-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          ) : (
            <span className="play-icon" aria-hidden="true" />
          )}
        </button>
        <span className="player-time">
          {formatTime(audioRef.current?.currentTime || 0)} / {formatTime(duration || 223)}
        </span>
        <input
          className="player-progress"
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          aria-label="Song progress"
          style={{ "--progress": `${progress}%` }}
        />
      </div>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#skills">Skills</a>
        <a href="#songs">Songs</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function ProfilePhoto() {
  return (
    <div className="profile-photo-card animated-in delay-2">
      <img
        src="/images/profile.jpg"
        alt="Rahul profile portrait"
        onError={(event) => {
          event.currentTarget.parentElement.classList.add("is-missing");
          event.currentTarget.remove();
        }}
      />
      <div className="profile-photo-fallback">
        <span>R</span>
        <p>Add your photo at /images/profile.jpg</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section-shell">
      <div className="hero-copy animated-in">
        <p className="eyebrow">Full-stack developer</p>
        <h1>Towards Greatness.</h1>
        <p className="hero-text">
          Greatness is the thing that satisfies your soul.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#work">
            View work
          </a>
          <a className="button secondary" href={gmailComposeUrl} target="_blank" rel="noreferrer">
            Email me
          </a>
        </div>
      </div>
      <ProfilePhoto />
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card animated-in delay-${index + 1}`}>
      <div className={`project-media ${project.visual} ${project.image ? "has-image" : ""}`}>
        {project.image && (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            onError={(event) => {
              event.currentTarget.parentElement.classList.remove("has-image");
              event.currentTarget.remove();
            }}
          />
        )}
      </div>
      <div className="project-content">
        <span>{project.type}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {project.href && (
          <a className="project-link" href={project.href} target="_blank" rel="noreferrer">
            Open project
          </a>
        )}
      </div>
    </article>
  );
}

function Work() {
  return (
    <section id="work" className="section-shell">
      <div className="section-heading animated-in">
        <p className="eyebrow">Selected work</p>
        <h2>Projects with clean execution.</h2>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-shell split-section">
      <div className="section-heading animated-in">
        <p className="eyebrow">Toolkit</p>
        <h2>Strong defaults, flexible execution.</h2>
      </div>
      <div className="skills-grid animated-in delay-2">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </section>
  );
}

function Songs({ activeSong, playSong }) {
  return (
    <section id="songs" className="section-shell songs-section">
      <div className="section-heading animated-in">
        <p className="eyebrow">Playlist</p>
        <h2>Songs I keep in rotation.</h2>
      </div>

      <div className="song-scatter" aria-label="Song list" style={getScatterStageStyle(songs.length)}>
        {songs.map((song, index) => (
          <button
            key={`${song.title}-${index}`}
            className={`song-tile ${song.className || ""} animated-in delay-${(index % 3) + 1} ${
              activeSong === song ? "is-active" : ""
            }`}
            style={getScatterStyle(index)}
            type="button"
            onClick={() => playSong(song)}
          >
            <span className="song-cover">
              <img
                src={song.cover}
                alt={`${song.title} cover`}
                onError={(event) => {
                  event.currentTarget.parentElement.classList.add("is-missing");
                  event.currentTarget.remove();
                }}
              />
              <span className="song-cover-fallback">0{index + 1}</span>
            </span>
            <span className="song-tile-copy">
              <span className="song-title">{song.title}</span>
              
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SocialIcon({ name }) {
  const icons = {
    GitHub: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.86 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.93.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.28 9.28 0 0 1 12 6.92c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.83c0 .27.18.59.69.49A10.16 10.16 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
      </svg>
    ),
    LeetCode: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.85 3.28a1.2 1.2 0 0 1 1.7 1.7L8.52 13l3.32 3.32a2.5 2.5 0 0 0 3.54 0l1.18-1.18a1.2 1.2 0 1 1 1.7 1.7l-1.18 1.18a4.9 4.9 0 0 1-6.94 0l-3.77-3.77a1.76 1.76 0 0 1 0-2.5l8.48-8.47Z" />
        <path d="M9.25 6.62a1.2 1.2 0 0 1 0 1.7L6.3 11.27a3.05 3.05 0 0 0 0 4.31l2.98 2.98a1.2 1.2 0 0 1-1.7 1.7L4.6 17.28a5.45 5.45 0 0 1 0-7.7l2.95-2.96a1.2 1.2 0 0 1 1.7 0Z" />
        <path d="M11.4 11.1h7.25a1.2 1.2 0 1 1 0 2.4H11.4a1.2 1.2 0 1 1 0-2.4Z" />
      </svg>
    ),
    LinkedIn: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.35 8.98h3.18V19H5.35V8.98Zm1.59-4.97a1.84 1.84 0 1 1 0 3.68 1.84 1.84 0 0 1 0-3.68ZM10.47 8.98h3.05v1.37h.04c.42-.8 1.46-1.64 3-1.64 3.22 0 3.82 2.12 3.82 4.88V19H17.2v-4.8c0-1.14-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54V19h-3.18V8.98Z" />
      </svg>
    ),
    Gmail: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 6.25h15A1.5 1.5 0 0 1 21 7.75v8.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.25v-8.5a1.5 1.5 0 0 1 1.5-1.5Zm.98 2.38v6.74h13.04V8.63L12 13.2 5.48 8.63Zm1.27-.38L12 11.93l5.25-3.68H6.75Z" />
      </svg>
    )
  };

  return <span className="social-icon">{icons[name]}</span>;
}

function Contact() {
  const socials = [
    { label: "GitHub", href: "https://github.com/freakinn", className: "github" },
    { label: "LeetCode", href: "https://leetcode.com/u/rahul_freakinn_12/", className: "leetcode" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rahuldhandore/", className: "linkedin" },
    { label: "Gmail", href: gmailComposeUrl, className: "gmail" }
  ];

  return (
    <section id="contact" className="section-shell contact animated-in">
      <div className="social-links">
        {socials.map((social) => (
          <a
            key={social.label}
            className={`social-link ${social.className}`}
            href={social.href}
            target="_blank"
            rel="noreferrer"
          >
            <SocialIcon name={social.label} />
            <span>{social.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const audioRef = useRef(null);
  const [activeSong, setActiveSong] = useState(songs[0]);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerStatus, setPlayerStatus] = useState("Now playing");
  const [progress, setProgress] = useState(0);

  const loadAndPlay = async (song) => {
    setActiveSong(song);
    setPlayerStatus("Loading...");

    if (!audioRef.current) return;

    audioRef.current.src = song.src;
    audioRef.current.load();

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setPlayerStatus("Now playing");
    } catch {
      setIsPlaying(false);
      setPlayerStatus("Tap play");
    }
  };

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    if (!audioRef.current.src) {
      audioRef.current.src = activeSong.src;
      audioRef.current.load();
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setPlayerStatus("Paused");
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setPlayerStatus("Now playing");
    } catch {
      setPlayerStatus("Add audio file");
    }
  };

  const handleTimeUpdate = () => {
    const currentAudio = audioRef.current;
    if (!currentAudio || !currentAudio.duration) return;

    setProgress((currentAudio.currentTime / currentAudio.duration) * 100);
  };

  const handleProgressChange = (event) => {
    const nextProgress = Number(event.target.value);
    const currentAudio = audioRef.current;

    setProgress(nextProgress);

    if (currentAudio?.duration) {
      currentAudio.currentTime = (nextProgress / 100) * currentAudio.duration;
    }
  };

  return (
    <div className="app-shell">
      <Header
        activeSong={activeSong}
        audioRef={audioRef}
        duration={duration}
        isPlaying={isPlaying}
        playerStatus={playerStatus}
        progress={progress}
        togglePlayback={togglePlayback}
        handleProgressChange={handleProgressChange}
      />
      <audio
        ref={audioRef}
        src={activeSong.src}
        preload="metadata"
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => {
          setIsPlaying(true);
          setPlayerStatus("Now playing");
        }}
        onPause={() => {
          setIsPlaying(false);
          setPlayerStatus("Paused");
        }}
        onEnded={() => {
          setIsPlaying(false);
          setPlayerStatus("Finished");
          setProgress(0);
        }}
      />
      <main id="top">
        <Hero />
        <section className="section-shell intro animated-in delay-3">
          <p>
            Hi! Welcome to my portfolio. <br />
            
            My name is Rahul Dhandore and I build websites for businesses and individuals. I can build websites which can attract more customers and help you grow your business.
          </p>
        </section>
        <Work />
        <Skills />
        <Songs activeSong={activeSong} playSong={loadAndPlay} />
        <Contact />
      </main>
    </div>
  );
}
