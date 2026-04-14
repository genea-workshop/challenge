import React, { useEffect, useState } from 'react';
import { BASE_PATH } from '../../constants';

const dates = [
  { date: 'April 16, 2026', event: 'Challenge launch' },
  { date: 'June 21, 2026', event: 'Test sequences released' },
  { date: 'June 28, 2026', event: 'Test movements submitted' },
  { date: 'July 10, 2026', event: 'Evaluation results released' },
  { date: 'July 15, 2026', event: 'Paper submission deadline' },
  { date: 'August 3, 2026', event: 'Author notifications' },
  { date: 'August 8, 2026', event: 'Camera-ready version deadline' },
  { date: 'September 8-9, 2026', event: 'ECCV Workshop in Malmö, Sweden' },
];

const organizers = [
  {
    name: 'Rajmund Nagy',
    imageUrl: `${BASE_PATH}assets/rajmund.png`,
    affiliation: 'KTH Royal Institute of Technology, Sweden',
    link: 'https://nagyrajmund.github.io/',
  },
  {
    name: 'Silvia Arellano García',
    imageUrl: `${BASE_PATH}assets/SilviaArellanoGarcia.png`,
    affiliation: 'KTH Royal Institute of Technology, Sweden',
    link: 'https://silviaarellanogarcia.github.io/',
  },
  {
    name: 'Hendric Voss',
    imageUrl: `${BASE_PATH}assets/hvoss.png`,
    affiliation: 'Bielefeld University, Germany',
    link: 'https://techfak.uni-bielefeld.de/~hvoss/'
  },
  {
    name: 'Mihail Tsakov',
    imageUrl: `${BASE_PATH}assets/mihail.png`,
    affiliation: 'Research Engineer, Netherlands',
    link: 'https://www.liahim.net/',
  },
  {
    name: 'Teodor Nikolov',
    imageUrl: `${BASE_PATH}assets/teodor.jpeg`,
    affiliation: 'motorica.ai, Sweden',
    link: 'https://teonikolov.com',
  },
  {
    name: 'Taras Kucherenko',
    imageUrl: `${BASE_PATH}assets/taras.jpg`,
    affiliation: 'Electronic Arts (EA), Sweden',
    link: 'https://svito-zar.github.io/',
  },
  {
    name: 'Youngwoo Yoon',
    imageUrl: `${BASE_PATH}assets/youngwoo.jpg`,
    affiliation: 'ETRI, South Korea',
    link: 'https://sites.google.com/view/youngwoo-yoon/',
  },
  {
    name: 'Gustav Eje Henter',
    imageUrl: `${BASE_PATH}assets/gustav.jpeg`,
    affiliation: 'KTH Royal Institute of Technology, Sweden',
    link: 'https://people.kth.se/~ghe/',
  },
];

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold text-brand-text mb-6 flex items-center gap-3">
    <span className="w-1 h-7 bg-brand-primary rounded-full" />
    {children}
  </h2>
);

const OrganizerCard: React.FC<typeof organizers[0]> = ({ name, imageUrl, affiliation, link }) => (
  <div className="group text-center bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
    <div className="p-4">
      <img className="w-48 h-48 mx-auto rounded-lg object-cover" src={imageUrl} alt={`Photo of ${name}`} />
    </div>
    <div className="px-5 pb-5">
      <a href={link} target="_blank" rel="noopener noreferrer" className="block text-base font-semibold text-brand-text group-hover:text-brand-primary transition-colors">{name}</a>
      <p className="text-gray-400 mt-1 text-xs whitespace-pre-line">{affiliation}</p>
    </div>
  </div>
);

const sectionIds = ['introduction', 'dataset', 'important-dates', 'submission-tracks', 'organising-committee'];

const ChallengePage: React.FC<{ pageNavHeight?: number }> = ({ pageNavHeight = 0 }) => {
  const [isFloating, setIsFloating] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight = document.querySelector('header')?.offsetHeight || 0;
      setIsFloating(window.scrollY > bannerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (!target) return;

    const nav = document.querySelector('nav');
    const navHeight = nav?.offsetHeight || 0;

    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    if (isFloating) {
      // Both bars are fixed — offset by their combined height
      window.scrollTo({ top: Math.max(0, targetTop - pageNavHeight - navHeight), behavior: 'smooth' });
    } else {
      // Section nav is inline; scrolling past the banner makes it go fixed.
      // Subtract navHeight twice (shift + clearance) plus the always-fixed pageNavHeight.
      window.scrollTo({ top: Math.max(0, targetTop - pageNavHeight - navHeight * 2), behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 text-brand-text-muted leading-relaxed">
      {/* Section Navigation Buttons — only visible when floating */}
      {isFloating && (
        <nav
          className="fixed inset-x-0 z-40 flex w-full justify-center gap-2 bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-4 py-2"
          style={{ top: pageNavHeight }}
        >
          {[
            ['#introduction', 'Introduction'],
            ['#dataset', 'Dataset'],
            ['#important-dates', 'Dates'],
            ['#submission-tracks', 'Submission tracks'],
            ['#organising-committee', 'Organisers'],
          ].map(([href, label]) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => handleSmoothScroll(e, href)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${isActive
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'text-brand-text-muted border-gray-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary'
                  }`}
              >
                {label}
              </a>
            );
          })}
        </nav>
      )}

      {/* Introduction */}
      <section className="space-y-4 text-justify" id="introduction">
        <SectionHeading>Introduction</SectionHeading>

        <p>
          Speech-driven 3D gesture generation is a rapidly growing area of research that focuses on animating talking characters in a realistic and engaging manner. This field has significant applications in virtual reality, gaming, human-computer interaction, and social robotics. However, evaluation remains a major bottleneck in research on interactive social avatars: there are no widely accepted automated metrics that reliably align with human perception, and human evaluation is both costly and lacks standardization.
        </p>

        <p>
          The GENEA Challenge 2026 aims to advance the state of the art in this domain by providing standardised, large-scale human evaluation on the recently released Seamless Interaction dataset. By hosting a public challenge, we hope to foster collaboration and innovation in the research community.
        </p>

        <p>
          The challenge is organized as part of the Interactive Social Agents Workshop at ECCV 2026. Authors of accepted submissions will have hte opportunity to present their work at the workshop, and all collected data -- including submissions, evaluation results, and human ratings -- will be made publicly available after the challenge to support future research in this area.
        </p>
      </section>

      <section className="flex flex-col lg:flex-row gap-10 text-justify" id="dataset-and-timeline">
        {/* Dataset */}
        <div id="dataset" className="flex-[2]">
          <SectionHeading>Dataset</SectionHeading>
          <p className="mb-5">
            This year's challenge uses the recently released Seamless Interaction dataset, which includes a wide range of features to support research in gesture generation:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {[
              ['🎞️', <>Over <span className="font-semibold">4000 hours</span> of dyadic interactions between <span className="font-semibold">4000+ actors</span>.</>],
              ['🦴', <>3D upper body motion in the <span className="font-semibold">SMPL-H format</span>.</>],
              ['🎙️', <><span className="font-semibold">Source-separated audio</span> and time-aligned speech transcripts.</>],
              ['📋', <>Rich metadata about the actors and 1300+ interaction prompts.</>],
            ].map(([emoji, text], i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                <span className="text-lg mt-0.5">{emoji}</span>
                <p className="text-sm text-gray-700">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-sm">

            TODO: add details about the different subsets, and reference them in the challenge task description.

            To download the dataset and learn more, visit the official <a href="https://github.com/facebookresearch/seamless_interaction" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">Seamless Interaction repository</a>.
          </p>
        </div>
        {/* Important Dates */}
        <div id="important-dates" className="flex-[1]">
          <SectionHeading>Important Dates</SectionHeading>
          <div className="relative mt-2">
            <div className="absolute top-0 left-[11px] h-full w-px bg-gradient-to-b from-brand-primary/40 via-brand-primary/20 to-transparent" />
            {dates.map(({ date, event }, index) => (
              <div key={date} className="relative flex items-start gap-4 mb-6 last:mb-0">
                <div className="flex-shrink-0 w-6 h-6 bg-brand-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                  {index + 1}
                </div>
                <div className="-mt-0.5">
                  <p className="text-sm font-semibold text-brand-text">{date}</p>
                  <p className="text-gray-500 text-xs">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tasks */}
      <section id="tasks" className="text-justify">
        <SectionHeading>Challenge task</SectionHeading>
        <p className="mb-4">
          Your goal is to develop a 3D gesture-generation model that can produce realistic 3D upper body gestures from speech input. Your model may use the following inputs:
          1. Speech audio for both characters
          2. Speech transcripts for both characters
          3. Speech audio for the human character
          4. Speech transcripts for the human character
        </p>
        <img
          src={`${BASE_PATH}assets/task.png`}
          alt="Task illustration"
          className="w-full rounded-2xl border border-gray-100 shadow-sm"
        />
      </section>

      <section id="submission-tracks" className="text-justify">
        <SectionHeading>Submission tracks</SectionHeading>
        <p className="mb-6">
          We will have three submission tracks:
        </p>
        <div className="flex flex-col gap-4 mb-6">
          {[
            { track: 'Track 1', color: 'bg-brand-primary', border: 'hover:border-brand-primary/30', title: 'ECCV Workshop Submission', format: '8-page submission, double-blind review, published in ECCV Workshop Proceedings.', desc: 'Intended for new systems or significant extensions of previously published systems.' },
            { track: 'Track 2', color: 'bg-brand-secondary', border: 'hover:border-brand-secondary/30', title: 'Extended Abstracts', format: '4-page submission, double-blind review, non-archival', desc: 'Intended for systems not yet ready for a full paper, enabling rapid dissemination of preliminary results and broader participation.' },
            { track: 'Track 3', color: 'bg-gray-500', border: 'hover:border-gray-300', title: 'Published Papers', format: 'System description form', desc: 'Intended for systems already published in a peer-reviewed venue, submitted for evaluation and comparison with other methods.' },
          ].map(({ track, color, border, title, format, desc }) => (
            <div key={track} className={`relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md ${border} transition-all duration-200`}>
              <span className={`inline-block px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white ${color} rounded-full mb-3`}>{track}</span>
              <h3 className="text-base font-bold text-brand-text mb-1.5">{title}</h3>
              <p className="text-xs text-brand-text-muted mb-2">{format}</p>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
        <p>
          Participants can submit to one or more tracks, and will receive separate evaluations for each track. The different tracks allow us to evaluate the impact of different input modalities on gesture generation performance.
        </p>
      </section>

      {/* Organising Committee */}
      <section id="organising-committee">
        <SectionHeading>Organising committee</SectionHeading>
        <p className="mb-8">
          Questions about the challenge can be sent to{' '}
          <a href="mailto:genea-leaderboard@googlegroups.com" className="font-semibold text-brand-primary hover:underline">
            genea-leaderboard@googlegroups.com
          </a>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {organizers.map((organizer) => (
            <OrganizerCard key={organizer.name} {...organizer} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default ChallengePage;
