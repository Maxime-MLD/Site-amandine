import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * 1. NAVBAR, HERO & TRUST BAR — Master Opening Timeline
 * Smooth, photographic arrival on initial page load
 */
function initHeroOpeningAnimation() {
	const header = document.querySelector<HTMLElement>('[data-site-header]');
	const hero = document.querySelector<HTMLElement>('.hero');
	const trustBar = document.querySelector<HTMLElement>('.trust-bar');

	if (!hero) {
		document.documentElement.classList.remove('js-reveal');
		return;
	}

	const brand = header?.querySelector<HTMLElement>('.brand');
	const nav = header?.querySelector<HTMLElement>('.desktop-navigation');
	const cta = header?.querySelector<HTMLElement>('.navbar-cta');
	const menuToggle = header?.querySelector<HTMLElement>('.menu-toggle');

	const eyebrow = hero.querySelector<HTMLElement>('.hero__eyebrow');
	const titleMain = hero.querySelector<HTMLElement>('.hero__title-main');
	const place = hero.querySelector<HTMLElement>('.hero__place');
	const imageFrame = hero.querySelector<HTMLElement>('.hero__image-frame');
	const lead = hero.querySelector<HTMLElement>('.hero__lead');
	const buttons = gsap.utils.toArray<HTMLElement>('.hero-button', hero);

	const navItems = [brand, nav, cta, menuToggle].filter(Boolean) as HTMLElement[];

	// Handover from CSS FOUC prevention class to GSAP timeline
	document.documentElement.classList.remove('js-reveal');

	const isMobile = window.matchMedia('(max-width: 47.999rem)').matches;

	const tl = gsap.timeline({
		defaults: {
			ease: 'power3.out',
		},
	});

	// 1. Navbar — soft arrival: opacity: 0 -> 1, y: -8px -> 0, duration: 0.65s, subtle stagger
	if (navItems.length > 0) {
		tl.fromTo(
			navItems,
			{ opacity: 0, y: -8 },
			{
				opacity: 1,
				y: 0,
				duration: 0.65,
				stagger: 0.08,
				clearProps: 'transform,opacity',
			},
			0
		);
	}

	// 2. Hero Eyebrow — opacity: 0 -> 1, y: 10px -> 0, duration: 0.6s
	if (eyebrow) {
		tl.fromTo(
			eyebrow,
			{ opacity: 0, y: 10 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				clearProps: 'transform,opacity',
			},
			0.1
		);
	}

	// 3. Hero H1 main text — opacity: 0 -> 1, y: 24px (mobile 16px) -> 0, duration: 0.8s
	if (titleMain) {
		tl.fromTo(
			titleMain,
			{ opacity: 0, y: isMobile ? 16 : 24 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				clearProps: 'transform,opacity',
			},
			0.18
		);
	}

	// 4. Hero "Montagny" — opacity: 0 -> 1, y: 18px (mobile 12px) -> 0 (120ms after H1 main)
	if (place) {
		tl.fromTo(
			place,
			{ opacity: 0, y: isMobile ? 12 : 18 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				clearProps: 'transform,opacity',
			},
			0.3
		);
	}

	// 5. Hero Nurse Image — opacity: 0 -> 1, scale: 0.98 -> 1, y: 16px (mobile 10px) -> 0, duration: 1s, ease: power4.out
	if (imageFrame) {
		tl.fromTo(
			imageFrame,
			{ opacity: 0, scale: 0.98, y: isMobile ? 10 : 16 },
			{
				opacity: 1,
				scale: 1,
				y: 0,
				duration: 1.0,
				ease: 'power4.out',
				clearProps: 'transform,opacity',
			},
			0.35
		);
	}

	// 6. Hero Paragraph — opacity: 0 -> 1, y: 16px (mobile 12px) -> 0, duration: 0.75s
	if (lead) {
		tl.fromTo(
			lead,
			{ opacity: 0, y: isMobile ? 12 : 16 },
			{
				opacity: 1,
				y: 0,
				duration: 0.75,
				clearProps: 'transform,opacity',
			},
			0.45
		);
	}

	// 7. Hero CTA Buttons — opacity: 0 -> 1, y: 12px -> 0, duration: 0.65s, stagger: 0.08s
	if (buttons.length > 0) {
		tl.fromTo(
			buttons,
			{ opacity: 0, y: 12 },
			{
				opacity: 1,
				y: 0,
				duration: 0.65,
				stagger: 0.08,
				clearProps: 'transform,opacity',
			},
			0.58
		);
	}

	// 8. Trust Bar — opacity: 0 -> 1, y: 14px -> 0, duration: 0.75s
	if (trustBar) {
		tl.fromTo(
			trustBar,
			{ opacity: 0, y: 14 },
			{
				opacity: 1,
				y: 0,
				duration: 0.75,
				clearProps: 'transform,opacity',
			},
			0.75
		);
	}

	return tl;
}

/**
 * 2. SERVICES SECTION — ScrollTrigger Editorial Reveal
 */
function initServicesAnimation() {
	const section = document.querySelector<HTMLElement>('#soins');
	if (!section) return;

	const header = section.querySelector<HTMLElement>('.services__header');
	const eyebrow = section.querySelector<HTMLElement>('.services__eyebrow');
	const h2 = section.querySelector<HTMLElement>('.services__heading h2');
	const intro = section.querySelector<HTMLElement>('.services__intro');
	const viewport = section.querySelector<HTMLElement>('[data-carousel-viewport]');
	const cards = gsap.utils.toArray<HTMLElement>('[data-carousel-card]', section);
	const cardsToAnimate = cards.slice(0, 4);
	const controls = section.querySelector<HTMLElement>('.services__controls');

	ScrollTrigger.getById('services-header-reveal')?.kill();
	ScrollTrigger.getById('services-cards-reveal')?.kill();
	ScrollTrigger.getById('services-reveal')?.kill();

	const isMobile = window.matchMedia('(max-width: 47.999rem)').matches;

	// 1. Header (Label, H2, Paragraphe) — start: top 82%, once: true
	const headerTl = gsap.timeline({
		scrollTrigger: {
			id: 'services-header-reveal',
			trigger: header || section,
			start: 'top 82%',
			once: true,
		},
		defaults: {
			ease: 'power3.out',
		},
	});

	if (eyebrow) {
		headerTl.fromTo(
			eyebrow,
			{ opacity: 0, y: 10 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				clearProps: 'transform,opacity',
			},
			0
		);
	}

	if (h2) {
		headerTl.fromTo(
			h2,
			{ opacity: 0, y: isMobile ? 16 : 24 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				clearProps: 'transform,opacity',
			},
			0.08
		);
	}

	if (intro) {
		headerTl.fromTo(
			intro,
			{ opacity: 0, y: isMobile ? 12 : 16 },
			{
				opacity: 1,
				y: 0,
				duration: 0.75,
				clearProps: 'transform,opacity',
			},
			0.18
		);
	}

	// 2. Carousel & Cards — start: top 85%, once: true
	// Cards entry: subtle lateral slide x on desktop, purely vertical y on mobile
	const carouselTrigger = viewport || section;
	const carouselTl = gsap.timeline({
		scrollTrigger: {
			id: 'services-cards-reveal',
			trigger: carouselTrigger,
			start: 'top 85%',
			once: true,
		},
		defaults: {
			ease: 'power3.out',
		},
	});

	if (cardsToAnimate.length > 0) {
		carouselTl.fromTo(
			cardsToAnimate,
			{ opacity: 0, y: isMobile ? 16 : 20, x: isMobile ? 0 : 16 },
			{
				opacity: 1,
				y: 0,
				x: 0,
				duration: 0.8,
				stagger: 0.08,
				clearProps: 'transform,opacity',
			},
			0
		);
	}

	if (controls) {
		carouselTl.fromTo(
			controls,
			{ opacity: 0, y: 10 },
			{
				opacity: 1,
				y: 0,
				duration: 0.65,
				clearProps: 'transform,opacity',
			},
			0.15
		);
	}

	return { headerTl, carouselTl };
}

/**
 * 3. ABOUT SECTION — Editorial Portrait Reveal & Content
 */
function initAboutAnimation() {
	const section = document.querySelector<HTMLElement>('#a-propos');
	if (!section) return;

	const block = section.querySelector<HTMLElement>('.about__block');
	const photoReveal = section.querySelector<HTMLElement>('.about__photo-reveal');
	const photo = section.querySelector<HTMLElement>('.about__photo');
	const eyebrow = section.querySelector<HTMLElement>('.about__eyebrow');
	const title = section.querySelector<HTMLElement>('.about__title');
	const text = section.querySelector<HTMLElement>('.about__text');

	ScrollTrigger.getById('about-reveal')?.kill();

	const isMobile = window.matchMedia('(max-width: 47.999rem)').matches;

	const tl = gsap.timeline({
		scrollTrigger: {
			id: 'about-reveal',
			trigger: section,
			start: 'top 78%',
			once: true,
		},
		defaults: {
			ease: 'power3.out',
		},
	});

	// 1. Rectangle pétrole — opacity: 0 -> 1, y: 20px (mobile 14px) -> 0, duration: 0.75s
	if (block) {
		tl.fromTo(
			block,
			{ opacity: 0, y: isMobile ? 14 : 20 },
			{
				opacity: 1,
				y: 0,
				duration: 0.75,
				clearProps: 'transform,opacity',
			},
			0
		);
	}

	// 2. Photo reveal — clip-path: inset(0 0 100% 0) -> inset(0 0 0% 0), duration: 1.05s, ease: power4.out
	if (photoReveal) {
		tl.fromTo(
			photoReveal,
			{ clipPath: 'inset(0 0 100% 0)' },
			{
				clipPath: 'inset(0 0 0% 0)',
				duration: 1.05,
				ease: 'power4.out',
				clearProps: 'clipPath',
			},
			0.08
		);
	}

	// Inner image scale: 1.025 -> 1
	if (photo) {
		tl.fromTo(
			photo,
			{ scale: 1.025 },
			{
				scale: 1,
				duration: 1.05,
				ease: 'power4.out',
				clearProps: 'transform',
			},
			0.08
		);
	}

	// 3. Label — opacity: 0 -> 1, y: 10px -> 0, duration: 0.6s
	if (eyebrow) {
		tl.fromTo(
			eyebrow,
			{ opacity: 0, y: 10 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				clearProps: 'transform,opacity',
			},
			0.18
		);
	}

	// 4. H2 Title — opacity: 0 -> 1, y: 24px (mobile 16px) -> 0, duration: 0.8s
	if (title) {
		tl.fromTo(
			title,
			{ opacity: 0, y: isMobile ? 16 : 24 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				clearProps: 'transform,opacity',
			},
			0.28
		);
	}

	// 5. Paragraph — opacity: 0 -> 1, y: 16px (mobile 12px) -> 0, duration: 0.75s
	if (text) {
		tl.fromTo(
			text,
			{ opacity: 0, y: isMobile ? 12 : 16 },
			{
				opacity: 1,
				y: 0,
				duration: 0.75,
				clearProps: 'transform,opacity',
			},
			0.38
		);
	}

	return tl;
}

/**
 * 4. POUR QUI SECTION — Editorial Intro & Alternating Situations
 */
function initPourQuiAnimation() {
	const section = document.querySelector<HTMLElement>('#pour-qui');
	if (!section) return;

	const header = section.querySelector<HTMLElement>('.situations__header');
	const eyebrow = section.querySelector<HTMLElement>('.situations__eyebrow');
	const title = section.querySelector<HTMLElement>('.situations__title');
	const intro = section.querySelector<HTMLElement>('.situations__intro');

	ScrollTrigger.getById('pour-qui-intro')?.kill();

	const isMobile = window.matchMedia('(max-width: 47.999rem)').matches;

	// 1. Introduction Header — start: top 82%, once: true
	const introTl = gsap.timeline({
		scrollTrigger: {
			id: 'pour-qui-intro',
			trigger: header || section,
			start: 'top 82%',
			once: true,
		},
		defaults: {
			ease: 'power3.out',
		},
	});

	if (eyebrow) {
		introTl.fromTo(
			eyebrow,
			{ opacity: 0, y: 10 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				clearProps: 'transform,opacity',
			},
			0
		);
	}

	if (title) {
		introTl.fromTo(
			title,
			{ opacity: 0, y: isMobile ? 16 : 24 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				clearProps: 'transform,opacity',
			},
			0.08
		);
	}

	if (intro) {
		introTl.fromTo(
			intro,
			{ opacity: 0, y: isMobile ? 12 : 16 },
			{
				opacity: 1,
				y: 0,
				duration: 0.75,
				clearProps: 'transform,opacity',
			},
			0.18
		);
	}

	// 2. Individual Situations — Each row has its own ScrollTrigger
	const items = gsap.utils.toArray<HTMLElement>('.situation-item', section);

	items.forEach((item, index) => {
		const triggerId = `pour-qui-item-${index}`;
		ScrollTrigger.getById(triggerId)?.kill();

		const block = item.querySelector<HTMLElement>('.situation-item__block');
		const photoReveal = item.querySelector<HTMLElement>('.situation-item__photo-reveal');
		const img = item.querySelector<HTMLElement>('.situation-item__img');
		const meta = item.querySelector<HTMLElement>('.situation-item__meta');
		const itemTitle = item.querySelector<HTMLElement>('.situation-item__title');
		const desc = item.querySelector<HTMLElement>('.situation-item__desc');

		const itemTl = gsap.timeline({
			scrollTrigger: {
				id: triggerId,
				trigger: item,
				start: 'top 85%',
				once: true,
			},
			defaults: {
				ease: 'power3.out',
			},
		});

		// Decorative block behind photo
		if (block) {
			itemTl.fromTo(
				block,
				{ opacity: 0, y: isMobile ? 10 : 14 },
				{
					opacity: 1,
					y: 0,
					duration: 0.75,
					clearProps: 'transform,opacity',
				},
				0
			);
		}

		// Vertical clip-path reveal: inset(0 0 100% 0) -> inset(0 0 0% 0), duration: 1.05s, ease: power4.out
		if (photoReveal) {
			itemTl.fromTo(
				photoReveal,
				{ clipPath: 'inset(0 0 100% 0)' },
				{
					clipPath: 'inset(0 0 0% 0)',
					duration: 1.05,
					ease: 'power4.out',
					clearProps: 'clipPath',
				},
				0.06
			);
		}

		// Inner photo subtle un-zoom: scale 1.025 -> 1
		if (img) {
			itemTl.fromTo(
				img,
				{ scale: 1.025 },
				{
					scale: 1,
					duration: 1.05,
					ease: 'power4.out',
					clearProps: 'transform',
				},
				0.06
			);
		}

		// Number & Category — opacity: 0 -> 1, y: 8px -> 0
		if (meta) {
			itemTl.fromTo(
				meta,
				{ opacity: 0, y: 8 },
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					clearProps: 'transform,opacity',
				},
				0.16
			);
		}

		// Text — clean vertical rise: opacity: 0 -> 1, y: 18px (mobile 12px) -> 0
		if (itemTitle) {
			itemTl.fromTo(
				itemTitle,
				{ opacity: 0, y: isMobile ? 12 : 18 },
				{
					opacity: 1,
					y: 0,
					duration: 0.75,
					clearProps: 'transform,opacity',
				},
				0.24
			);
		}

		if (desc) {
			itemTl.fromTo(
				desc,
				{ opacity: 0, y: isMobile ? 12 : 16 },
				{
					opacity: 1,
					y: 0,
					duration: 0.75,
					clearProps: 'transform,opacity',
				},
				0.34
			);
		}
	});
}

// Method section — pinned "filing-card" stack (desktop, tablet AND mobile).
// Signature animation with editorial header reveal, natural Card 1 entry,
// smooth scrubbed card stacking, internal content micro-animations upon activation,
// and generous reading dwell times.
function initMethodeAnimation() {
	const section = document.querySelector<HTMLElement>('[data-methode]');
	if (!section) return;

	const pin = section.querySelector<HTMLElement>('[data-methode-pin]');
	const cards = gsap.utils.toArray<HTMLElement>('[data-methode-card]', section);
	const header = section.querySelector<HTMLElement>('[data-methode-header]');
	const eyebrow = section.querySelector<HTMLElement>('.methode__eyebrow');
	const title = section.querySelector<HTMLElement>('.methode__title');
	const intro = section.querySelector<HTMLElement>('.methode__intro');

	if (!pin || cards.length !== 3) return;

	ScrollTrigger.getById('methode-eyebrow-reveal')?.kill();
	ScrollTrigger.getById('methode-title-reveal')?.kill();
	ScrollTrigger.getById('methode-intro-reveal')?.kill();
	ScrollTrigger.getById('methode-card1-entry')?.kill();
	ScrollTrigger.getById('methode-pin')?.kill();

	// Only switch the cards into the absolute-stacked pinned layout once JS is
	// ready. Without this flag they stay in normal flow and remain fully visible
	// if GSAP fails to load (progressive enhancement).
	section.setAttribute('data-methode-ready', '');

	const media = gsap.matchMedia();

	media.add('(prefers-reduced-motion: no-preference)', () => {
		const [first, second, third] = cards;
		const isMobileOrTablet = window.matchMedia('(max-width: 63.999rem)').matches;

		const SHADOW_ON = '0 18px 45px rgba(18, 59, 74, 0.08), 0 4px 14px rgba(18, 59, 74, 0.04)';
		const SHADOW_OFF = '0 18px 45px rgba(18, 59, 74, 0), 0 4px 14px rgba(18, 59, 74, 0)';

		const hideY = () => window.innerHeight + 120;

		const tab1 = first.querySelector<HTMLElement>('.methode-card__tab');
		const tab2 = second.querySelector<HTMLElement>('.methode-card__tab');
		const tab3 = third.querySelector<HTMLElement>('.methode-card__tab');
		const allTabs = [tab1, tab2, tab3].filter(Boolean) as HTMLElement[];

		// ==========================================
		// 1. INTRO DE SECTION
		// ==========================================
		// 1.1 Label : opacity: 0 -> 1, y: 10px -> 0, duration: 0.6s
		if (eyebrow) {
			gsap.fromTo(
				eyebrow,
				{ opacity: 0, y: 10 },
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: 'power3.out',
					clearProps: 'transform,opacity',
					scrollTrigger: {
						id: 'methode-eyebrow-reveal',
						trigger: header || section,
						start: 'top 82%',
						once: true,
					},
				}
			);
		}

		// 1.2 H2 : Reveal progressif lié au scroll (scrubbed). opacity: 0.2 -> 1, y: 24px (mobile 16px) -> 0
		if (title) {
			gsap.fromTo(
				title,
				{ opacity: 0.2, y: isMobileOrTablet ? 16 : 24 },
				{
					opacity: 1,
					y: 0,
					ease: 'none',
					scrollTrigger: {
						id: 'methode-title-reveal',
						trigger: header || section,
						start: 'top 88%',
						end: 'top 38%',
						scrub: 0.8,
						invalidateOnRefresh: true,
					},
				}
			);
		}

		// 1.3 Paragraphe : opacity: 0 -> 1, y: 16px (mobile 12px) -> 0, arrive avec l'en-tête
		if (intro) {
			gsap.fromTo(
				intro,
				{ opacity: 0, y: isMobileOrTablet ? 12 : 16 },
				{
					opacity: 1,
					y: 0,
					duration: 0.75,
					ease: 'power3.out',
					clearProps: 'transform,opacity',
					scrollTrigger: {
						id: 'methode-intro-reveal',
						trigger: header || section,
						start: 'top 82%',
						once: true,
					},
				}
			);
		}

		// ==========================================
		// 2. MICRO-ANIMATIONS DES CARDS (INTERNAL)
		// ==========================================
		function prepCard(card: HTMLElement) {
			const badge = card.querySelector<HTMLElement>('.methode-card__step-badge');
			const cardTitle = card.querySelector<HTMLElement>('.methode-card__title');
			const desc = card.querySelector<HTMLElement>('.methode-card__desc');
			const img = card.querySelector<HTMLElement>('.methode-card__media img');

			if (badge) gsap.set(badge, { opacity: 0.4, y: 5 });
			if (cardTitle) gsap.set(cardTitle, { opacity: 0, y: 8 });
			if (desc) gsap.set(desc, { opacity: 0, y: 8 });
			if (img) gsap.set(img, { opacity: 0.9, scale: 1.015 });
		}

		function awakenCard(card: HTMLElement) {
			const badge = card.querySelector<HTMLElement>('.methode-card__step-badge');
			const cardTitle = card.querySelector<HTMLElement>('.methode-card__title');
			const desc = card.querySelector<HTMLElement>('.methode-card__desc');
			const img = card.querySelector<HTMLElement>('.methode-card__media img');

			const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

			if (badge) {
				tl.to(
					badge,
					{ opacity: 1, y: 0, duration: 0.4, clearProps: 'transform,opacity' },
					0
				);
			}
			if (cardTitle) {
				tl.to(
					cardTitle,
					{ opacity: 1, y: 0, duration: 0.5, clearProps: 'transform,opacity' },
					0.04
				);
			}
			if (desc) {
				tl.to(
					desc,
					{ opacity: 1, y: 0, duration: 0.5, clearProps: 'transform,opacity' },
					0.1
				);
			}
			if (img) {
				tl.to(
					img,
					{ opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', clearProps: 'transform,opacity' },
					0.05
				);
			}
			return tl;
		}

		// Initial card setup: Card 1 visible, Card 2 & 3 parked below and prepped
		gsap.set(first, { y: 0, boxShadow: SHADOW_ON });
		gsap.set([second, third], { y: hideY, boxShadow: SHADOW_OFF });
		prepCard(second);
		prepCard(third);

		if (tab1 && tab2 && tab3) {
			gsap.set(tab1, { opacity: 1 });
			gsap.set([tab2, tab3], { opacity: 0.68 });
		}

		// ==========================================
		// 3. TRANSITION NATURELLE VERS CARD 1
		// ==========================================
		// Card 1 : opacity: 0.6 -> 1, y: 32px (ou 22px sur mobile) -> 0, durée 0.8s, power3.out
		// Arrive sans saut avant que le pin commence
		gsap.fromTo(
			first,
			{ opacity: 0.6, y: isMobileOrTablet ? 22 : 32 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: 'power3.out',
				clearProps: 'transform',
				scrollTrigger: {
					id: 'methode-card1-entry',
					trigger: pin,
					start: 'top 82%',
					once: true,
				},
			}
		);

		// ==========================================
		// 4. PINNED TIMELINE (CARDS 2 & 3 STACKING)
		// ==========================================
		// Progression calibrée (total 1.0) :
		// 0.00 -> 0.14 : Lecture Card 1 seule
		// 0.14 -> 0.42 : Montée progressive de Card 2 (arrive à 0.42)
		// 0.42 -> 0.58 : Lecture Card 2 active
		// 0.58 -> 0.86 : Montée progressive de Card 3 (arrive à 0.86)
		// 0.86 -> 1.00 : Respiration finale Card 3 avant libération du pin
		const CARD2_START = 0.14;
		const CARD2_END = 0.42;
		const CARD2_ACTIVE = 0.40;
		const CARD2_RESET = 0.20;

		const CARD3_START = 0.58;
		const CARD3_END = 0.86;
		const CARD3_ACTIVE = 0.84;
		const CARD3_RESET = 0.62;

		let card2Awakened = false;
		let card3Awakened = false;

		const timeline = gsap.timeline({
			defaults: { ease: 'power2.out' },
			scrollTrigger: {
				id: 'methode-pin',
				trigger: pin,
				start: 'top top',
				end: () => `+=${Math.round(window.innerHeight * 2.8)}`,
				pin: true,
				pinSpacing: true,
				scrub: 1,
				anticipatePin: 1,
				invalidateOnRefresh: true,
				onUpdate: (self) => {
					// Éveil de Card 2 quand elle arrive en position active
					if (self.progress >= CARD2_ACTIVE && !card2Awakened) {
						card2Awakened = true;
						awakenCard(second);
					} else if (self.progress < CARD2_RESET && card2Awakened && self.direction === -1) {
						// Réinitialisation discrète uniquement quand Card 2 est complètement hors-champ en bas
						card2Awakened = false;
						prepCard(second);
					}

					// Éveil de Card 3 quand elle arrive en position active
					if (self.progress >= CARD3_ACTIVE && !card3Awakened) {
						card3Awakened = true;
						awakenCard(third);
					} else if (self.progress < CARD3_RESET && card3Awakened && self.direction === -1) {
						// Réinitialisation discrète uniquement quand Card 3 est complètement hors-champ en bas
						card3Awakened = false;
						prepCard(third);
					}
				},
				onRefresh: (self) => {
					if (self.progress < CARD2_START) {
						gsap.set(second, { y: hideY() });
						card2Awakened = false;
						prepCard(second);
					}
					if (self.progress < CARD3_START) {
						gsap.set(third, { y: hideY() });
						card3Awakened = false;
						prepCard(third);
					}
				},
			},
		});

		timeline
			// 0.14 -> 0.42 : Card 2 monte et recouvre Card 1
			.to(second, { y: 0, duration: 0.28 }, CARD2_START)
			.to(first, { boxShadow: SHADOW_OFF, duration: 0.28 }, CARD2_START)
			.to(second, { boxShadow: SHADOW_ON, duration: 0.28 }, CARD2_START);

		if (tab1 && tab2 && tab3) {
			timeline
				.to(tab1, { opacity: 0.68, duration: 0.22 }, CARD2_START)
				.to(tab2, { opacity: 1, duration: 0.22 }, CARD2_START)
				.to(tab2, { opacity: 0.68, duration: 0.22 }, CARD3_START)
				.to(tab3, { opacity: 1, duration: 0.22 }, CARD3_START);
		}

		timeline
			// 0.58 -> 0.86 : Card 3 monte et recouvre Card 2
			.to(third, { y: 0, duration: 0.28 }, CARD3_START)
			.to(second, { boxShadow: SHADOW_OFF, duration: 0.28 }, CARD3_START)
			.to(third, { boxShadow: SHADOW_ON, duration: 0.28 }, CARD3_START)
			// 0.86 -> 1.00 : Respiration finale avant de relâcher le pin
			.to({}, { duration: 0.14 }, CARD3_END);

		return () => {
			ScrollTrigger.getById('methode-eyebrow-reveal')?.kill();
			ScrollTrigger.getById('methode-title-reveal')?.kill();
			ScrollTrigger.getById('methode-intro-reveal')?.kill();
			ScrollTrigger.getById('methode-card1-entry')?.kill();
			timeline.scrollTrigger?.kill();
			timeline.kill();
			gsap.set(cards, { clearProps: 'all' });
			if (allTabs.length > 0) gsap.set(allTabs, { clearProps: 'all' });
			const allBadges = section.querySelectorAll<HTMLElement>('.methode-card__step-badge');
			const allTitles = section.querySelectorAll<HTMLElement>('.methode-card__title');
			const allDescs = section.querySelectorAll<HTMLElement>('.methode-card__desc');
			const allImgs = section.querySelectorAll<HTMLElement>('.methode-card__media img');
			gsap.set([allBadges, allTitles, allDescs, allImgs], { clearProps: 'all' });
			if (eyebrow) gsap.set(eyebrow, { clearProps: 'all' });
			if (title) gsap.set(title, { clearProps: 'all' });
			if (intro) gsap.set(intro, { clearProps: 'all' });
		};
	});

	media.add('(prefers-reduced-motion: reduce)', () => {
		gsap.set(cards, { clearProps: 'all' });
		const allBadges = section.querySelectorAll<HTMLElement>('.methode-card__step-badge');
		const allTitles = section.querySelectorAll<HTMLElement>('.methode-card__title');
		const allDescs = section.querySelectorAll<HTMLElement>('.methode-card__desc');
		const allImgs = section.querySelectorAll<HTMLElement>('.methode-card__media img');
		gsap.set([allBadges, allTitles, allDescs, allImgs], { clearProps: 'all' });
		if (eyebrow) gsap.set(eyebrow, { clearProps: 'all' });
		if (title) gsap.set(title, { clearProps: 'all' });
		if (intro) gsap.set(intro, { clearProps: 'all' });
	});

	if (import.meta.hot) {
		import.meta.hot.dispose(() => media.revert());
	}
}

initMethodeAnimation();

/**
 * 6. REVIEWS SECTION — Calm, Human & Reassuring Entrance
 */
function initAvisAnimation() {
	const section = document.querySelector<HTMLElement>('#avis-patients');
	if (!section) return;

	const header = section.querySelector<HTMLElement>('.reviews__header');
	const eyebrow = section.querySelector<HTMLElement>('.reviews__eyebrow');
	const title = section.querySelector<HTMLElement>('.reviews__title');
	const navigation = section.querySelector<HTMLElement>('.reviews__navigation');

	// Initial visible cards: slot 0 (center), slot 1 (right), slot -1 (left)
	const centerCard = section.querySelector<HTMLElement>('.review-card[data-slot="0"]');
	const sideCards = gsap.utils.toArray<HTMLElement>('.review-card[data-slot="1"], .review-card[data-slot="-1"]', section);
	const visibleCards = [centerCard, ...sideCards].filter(Boolean) as HTMLElement[];
	const visibleStars = gsap.utils.toArray<HTMLElement>(
		'.review-card[data-slot="0"] .review-card__star, .review-card[data-slot="1"] .review-card__star, .review-card[data-slot="-1"] .review-card__star',
		section
	);

	ScrollTrigger.getById('avis-reveal')?.kill();

	const isMobile = window.matchMedia('(max-width: 47.999rem)').matches;

	const tl = gsap.timeline({
		scrollTrigger: {
			id: 'avis-reveal',
			trigger: section,
			start: 'top 82%',
			once: true,
		},
		defaults: {
			ease: 'power3.out',
		},
		onStart: () => {
			// Disable CSS transitions during entry animation to avoid fighting GSAP
			gsap.set(visibleCards, { transition: 'none' });
		},
		onComplete: () => {
			// Restore native CSS transitions and clear inline custom properties
			gsap.set(visibleCards, { clearProps: 'transition,--card-enter-y,--card-enter-opacity' });
		},
	});

	// 1. Label : opacity: 0 -> 1, y: 10px -> 0, duration: 0.6s
	if (eyebrow) {
		tl.fromTo(
			eyebrow,
			{ opacity: 0, y: 10 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				clearProps: 'transform,opacity',
			},
			0
		);
	}

	// 2. H2 : opacity: 0 -> 1, y: 22px (mobile 16px) -> 0, duration: 0.8s
	if (title) {
		tl.fromTo(
			title,
			{ opacity: 0, y: isMobile ? 16 : 22 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				clearProps: 'transform,opacity',
			},
			0.08
		);
	}

	// 3. Side cards (slot -1, slot 1) : opacity: 0 -> 1, y: 20px (mobile 14px) -> 0, duration: 0.75s
	const cardEnterY = isMobile ? '14px' : '20px';

	if (sideCards.length > 0) {
		tl.fromTo(
			sideCards,
			{ '--card-enter-y': cardEnterY, '--card-enter-opacity': 0 },
			{
				'--card-enter-y': '0px',
				'--card-enter-opacity': 1,
				duration: 0.75,
				stagger: 0.08,
				clearProps: '--card-enter-y,--card-enter-opacity',
			},
			0.18
		);
	}

	// 4. Center card (slot 0) : arrives 60ms after side cards
	if (centerCard) {
		tl.fromTo(
			centerCard,
			{ '--card-enter-y': cardEnterY, '--card-enter-opacity': 0 },
			{
				'--card-enter-y': '0px',
				'--card-enter-opacity': 1,
				duration: 0.75,
				clearProps: '--card-enter-y,--card-enter-opacity',
			},
			0.24
		);
	}

	// 5. Stars : subtle reveal opacity 0 -> 1 with light stagger (0.03s)
	if (visibleStars.length > 0) {
		tl.fromTo(
			visibleStars,
			{ opacity: 0 },
			{
				opacity: 1,
				duration: 0.35,
				stagger: 0.03,
				ease: 'power2.out',
				clearProps: 'opacity',
			},
			0.38
		);
	}

	// 6. Navigation controls
	if (navigation) {
		tl.fromTo(
			navigation,
			{ opacity: 0, y: 10 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				clearProps: 'transform,opacity',
			},
			0.32
		);
	}

	return tl;
}

/**
 * 7. PRACTICAL INFO / BENTO SECTION — Structured & Premium Entrance
 */
function initBentoAnimation() {
	const section = document.querySelector<HTMLElement>('#informations-pratiques');
	if (!section) return;

	const header = section.querySelector<HTMLElement>('.practical__header');
	const eyebrow = section.querySelector<HTMLElement>('.practical__eyebrow');
	const title = section.querySelector<HTMLElement>('.practical__title');

	const cardAvailability = section.querySelector<HTMLElement>('.bento-card--availability');
	const cardDocuments = section.querySelector<HTMLElement>('.bento-card--documents');
	const cardCabinet = section.querySelector<HTMLElement>('.bento-card--cabinet');
	const cardCta = section.querySelector<HTMLElement>('.bento-card--cta');
	const scheduleStat = section.querySelector<HTMLElement>('.bento-availability__schedule');

	ScrollTrigger.getById('bento-reveal')?.kill();

	const isMobile = window.matchMedia('(max-width: 47.999rem)').matches;
	const isDesktop = window.matchMedia('(min-width: 64rem)').matches;

	const tl = gsap.timeline({
		scrollTrigger: {
			id: 'bento-reveal',
			trigger: section,
			start: 'top 82%',
			once: true,
		},
		defaults: {
			ease: 'power3.out',
		},
	});

	// 1. Label : opacity: 0 -> 1, y: 10px -> 0, duration: 0.6s
	if (eyebrow) {
		tl.fromTo(
			eyebrow,
			{ opacity: 0, y: 10 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				clearProps: 'transform,opacity',
			},
			0
		);
	}

	// 2. H2 : opacity: 0 -> 1, y: 22px (mobile 16px) -> 0, duration: 0.8s
	if (title) {
		tl.fromTo(
			title,
			{ opacity: 0, y: isMobile ? 16 : 22 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				clearProps: 'transform,opacity',
			},
			0.08
		);
	}

	if (isDesktop) {
		// Desktop: Cohesive structured entrance, avoiding scattered popping
		// 1. Grande card Disponibilités : y: 22px -> 0
		if (cardAvailability) {
			tl.fromTo(
				cardAvailability,
				{ opacity: 0, y: 22 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					clearProps: 'transform,opacity',
				},
				0.18
			);
		}

		// Stat 24h/24 · 7j/7
		if (scheduleStat) {
			tl.fromTo(
				scheduleStat,
				{ opacity: 0, y: 6 },
				{
					opacity: 1,
					y: 0,
					duration: 0.55,
					clearProps: 'transform,opacity',
				},
				0.28
			);
		}

		// 2. À prévoir (documents) : y: 18px -> 0
		if (cardDocuments) {
			tl.fromTo(
				cardDocuments,
				{ opacity: 0, y: 18 },
				{
					opacity: 1,
					y: 0,
					duration: 0.75,
					clearProps: 'transform,opacity',
				},
				0.24
			);
		}

		// 3. Au cabinet : y: 18px -> 0
		if (cardCabinet) {
			tl.fromTo(
				cardCabinet,
				{ opacity: 0, y: 18 },
				{
					opacity: 1,
					y: 0,
					duration: 0.75,
					clearProps: 'transform,opacity',
				},
				0.30
			);
		}

		// 4. CTA ambre : y: 16px -> 0
		if (cardCta) {
			tl.fromTo(
				cardCta,
				{ opacity: 0, y: 16 },
				{
					opacity: 1,
					y: 0,
					duration: 0.75,
					clearProps: 'transform,opacity',
				},
				0.36
			);
		}
	} else {
		// Mobile & Tablet : DOM order with uniform subtle y: 16px -> 0 and tight stagger 0.06s
		const mobileCards = [cardAvailability, cardDocuments, cardCabinet, cardCta].filter(Boolean) as HTMLElement[];

		if (mobileCards.length > 0) {
			tl.fromTo(
				mobileCards,
				{ opacity: 0, y: 16 },
				{
					opacity: 1,
					y: 0,
					duration: 0.7,
					stagger: 0.06,
					clearProps: 'transform,opacity',
				},
				0.18
			);
		}

		if (scheduleStat) {
			tl.fromTo(
				scheduleStat,
				{ opacity: 0, y: 5 },
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					clearProps: 'transform,opacity',
				},
				0.26
			);
		}
	}

	return tl;
}

/**
 * 8. FAQ SECTION — Calm, Legible & Reassuring
 */
function initFaqAnimation() {
	const section = document.querySelector<HTMLElement>('#faq');
	if (!section) return;

	const eyebrow = section.querySelector<HTMLElement>('.faq__eyebrow');
	const title = section.querySelector<HTMLElement>('.faq__title');
	const desc = section.querySelector<HTMLElement>('.faq__desc');
	const emergency = section.querySelector<HTMLElement>('.faq__emergency');
	const faqItems = gsap.utils.toArray<HTMLElement>('.faq-item', section);

	ScrollTrigger.getById('faq-reveal')?.kill();

	const isMobile = window.matchMedia('(max-width: 47.999rem)').matches;

	const tl = gsap.timeline({
		scrollTrigger: {
			id: 'faq-reveal',
			trigger: section,
			start: 'top 82%',
			once: true,
		},
		defaults: {
			ease: 'power3.out',
		},
	});

	// Left Column : Quiet, legible arrival
	if (eyebrow) {
		tl.fromTo(
			eyebrow,
			{ opacity: 0, y: 10 },
			{ opacity: 1, y: 0, duration: 0.6, clearProps: 'transform,opacity' },
			0
		);
	}

	if (title) {
		tl.fromTo(
			title,
			{ opacity: 0, y: isMobile ? 16 : 22 },
			{ opacity: 1, y: 0, duration: 0.8, clearProps: 'transform,opacity' },
			0.08
		);
	}

	if (desc) {
		tl.fromTo(
			desc,
			{ opacity: 0, y: isMobile ? 10 : 14 },
			{ opacity: 1, y: 0, duration: 0.7, clearProps: 'transform,opacity' },
			0.18
		);
	}

	if (emergency) {
		tl.fromTo(
			emergency,
			{ opacity: 0, y: 8 },
			{ opacity: 1, y: 0, duration: 0.55, clearProps: 'transform,opacity' },
			0.26
		);
	}

	// Right Column : Accordion items (very calm, subtle y: 12px, fast stagger 0.06s)
	if (faqItems.length > 0) {
		tl.fromTo(
			faqItems,
			{ opacity: 0, y: 12 },
			{
				opacity: 1,
				y: 0,
				duration: 0.65,
				stagger: 0.06,
				clearProps: 'transform,opacity',
			},
			0.18
		);
	}

	return tl;
}

/**
 * 9. FINAL CTA SECTION — Premium Entry & Signature ECG Line
 */
function initFinalCtaAnimation() {
	const section = document.querySelector<HTMLElement>('.final-cta');
	if (!section) return;

	const card = section.querySelector<HTMLElement>('.final-cta__card');
	const eyebrow = section.querySelector<HTMLElement>('.final-cta__eyebrow');
	const title = section.querySelector<HTMLElement>('.final-cta__title');
	const desc = section.querySelector<HTMLElement>('.final-cta__desc');
	const buttons = gsap.utils.toArray<HTMLElement>('.final-cta__btn', section);
	const photo = section.querySelector<HTMLElement>('.final-cta__portrait-img');
	const ecgPath = section.querySelector<SVGPathElement>('.final-cta__ecg path');

	ScrollTrigger.getById('final-cta-reveal')?.kill();

	const isMobile = window.matchMedia('(max-width: 47.999rem)').matches;

	const tl = gsap.timeline({
		scrollTrigger: {
			id: 'final-cta-reveal',
			trigger: section,
			start: 'top 82%',
			once: true,
		},
		defaults: {
			ease: 'power3.out',
		},
	});

	// 1. Foundation Card : opacity: 0 -> 1, y: 24px (mobile 16px) -> 0, duration: 0.85s
	if (card) {
		tl.fromTo(
			card,
			{ opacity: 0, y: isMobile ? 16 : 24 },
			{ opacity: 1, y: 0, duration: 0.85, clearProps: 'transform,opacity' },
			0
		);
	}

	// 2. Left texts (staggered cascade)
	if (eyebrow) {
		tl.fromTo(
			eyebrow,
			{ opacity: 0, y: 10 },
			{ opacity: 1, y: 0, duration: 0.6, clearProps: 'transform,opacity' },
			0.12
		);
	}

	if (title) {
		tl.fromTo(
			title,
			{ opacity: 0, y: isMobile ? 16 : 22 },
			{ opacity: 1, y: 0, duration: 0.8, clearProps: 'transform,opacity' },
			0.20
		);
	}

	if (desc) {
		tl.fromTo(
			desc,
			{ opacity: 0, y: isMobile ? 10 : 14 },
			{ opacity: 1, y: 0, duration: 0.7, clearProps: 'transform,opacity' },
			0.28
		);
	}

	if (buttons.length > 0) {
		tl.fromTo(
			buttons,
			{ opacity: 0, y: 12 },
			{ opacity: 1, y: 0, duration: 0.65, stagger: 0.08, clearProps: 'transform,opacity' },
			0.36
		);
	}

	// 3. Amandine's photo on the right : emerges as the card lands
	if (photo) {
		tl.fromTo(
			photo,
			{ opacity: 0, y: isMobile ? 12 : 20, scale: 1.02 },
			{ opacity: 1, y: 0, scale: 1, duration: 0.85, clearProps: 'transform,opacity' },
			0.20
		);
	}

	// 4. Signature ECG line : draws left-to-right once title is in place
	if (ecgPath) {
		const totalLength = ecgPath.getTotalLength();
		gsap.set(ecgPath, { strokeDasharray: totalLength, strokeDashoffset: totalLength });
		tl.to(
			ecgPath,
			{
				strokeDashoffset: 0,
				duration: 1.6,
				ease: 'power2.inOut',
			},
			0.32
		);
	}

	return tl;
}

/**
 * 10. CONTACT SECTION — Editorial & Sober Entrance
 */
function initContactAnimation() {
	const section = document.querySelector<HTMLElement>('#contact');
	if (!section) return;

	const eyebrow = section.querySelector<HTMLElement>('.contact__eyebrow');
	const title = section.querySelector<HTMLElement>('.contact__title');
	const lead = section.querySelector<HTMLElement>('.contact__lead');
	const visualReveal = section.querySelector<HTMLElement>('.contact__visual-reveal');
	const visualImg = section.querySelector<HTMLElement>('.contact__visual-img');
	const details = gsap.utils.toArray<HTMLElement>('.contact__detail-item', section);
	const formCard = section.querySelector<HTMLElement>('[data-contact-form-card]');

	ScrollTrigger.getById('contact-reveal')?.kill();

	const isMobile = window.matchMedia('(max-width: 47.999rem)').matches;

	const tl = gsap.timeline({
		scrollTrigger: {
			id: 'contact-reveal',
			trigger: section,
			start: 'top 82%',
			once: true,
		},
		defaults: {
			ease: 'power3.out',
		},
	});

	// Left Column: Header text
	if (eyebrow) {
		tl.fromTo(
			eyebrow,
			{ opacity: 0, y: 10 },
			{ opacity: 1, y: 0, duration: 0.6, clearProps: 'transform,opacity' },
			0
		);
	}

	if (title) {
		tl.fromTo(
			title,
			{ opacity: 0, y: isMobile ? 16 : 22 },
			{ opacity: 1, y: 0, duration: 0.8, clearProps: 'transform,opacity' },
			0.08
		);
	}

	if (lead) {
		tl.fromTo(
			lead,
			{ opacity: 0, y: isMobile ? 10 : 14 },
			{ opacity: 1, y: 0, duration: 0.7, clearProps: 'transform,opacity' },
			0.16
		);
	}

	// Image 16/9 : clip-path reveal de haut en bas in 0.95s, power4.out
	if (visualReveal) {
		tl.fromTo(
			visualReveal,
			{ clipPath: 'inset(0 0 100% 0)' },
			{
				clipPath: 'inset(0 0 0 0)',
				duration: 0.95,
				ease: 'power4.out',
				clearProps: 'clipPath',
			},
			0.20
		);
	}

	if (visualImg) {
		tl.fromTo(
			visualImg,
			{ scale: 1.025 },
			{
				scale: 1,
				duration: 0.95,
				ease: 'power4.out',
				clearProps: 'transform',
			},
			0.20
		);
	}

	// Contact detail rows
	if (details.length > 0) {
		tl.fromTo(
			details,
			{ opacity: 0, y: 8 },
			{
				opacity: 1,
				y: 0,
				duration: 0.55,
				stagger: 0.06,
				clearProps: 'transform,opacity',
			},
			0.28
		);
	}

	// Right Column : Single unified form card block
	if (formCard) {
		tl.fromTo(
			formCard,
			{ opacity: 0, y: isMobile ? 14 : 20 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				clearProps: 'transform,opacity',
			},
			0.24
		);
	}

	return tl;
}

/**
 * 11. FOOTER SECTION — Monumental Background ECG & Content Entrance
 */
function initFooterAnimation() {
	const section = document.querySelector<HTMLElement>('.site-footer');
	if (!section) return;

	const footerEcgPath = section.querySelector<SVGPathElement>('.footer-monumental-ecg__path');
	const footerCols = gsap.utils.toArray<HTMLElement>(
		'.site-footer__identity, .site-footer__navigation, .site-footer__contact',
		section
	);

	ScrollTrigger.getById('footer-reveal')?.kill();

	const isMobile = window.matchMedia('(max-width: 47.999rem)').matches;

	const tl = gsap.timeline({
		scrollTrigger: {
			id: 'footer-reveal',
			trigger: section,
			start: 'top 85%',
			once: true,
		},
		defaults: {
			ease: 'power3.out',
		},
	});

	// 1. Gros cardiogramme monumental en arrière-plan (se dessine de gauche à droite)
	if (footerEcgPath) {
		const totalLength = footerEcgPath.getTotalLength();
		gsap.set(footerEcgPath, { strokeDasharray: totalLength, strokeDashoffset: totalLength });
		tl.to(
			footerEcgPath,
			{
				strokeDashoffset: 0,
				duration: 2.1,
				ease: 'power2.inOut',
			},
			0
		);
	}

	// 2. Colonnes de contenu : démarre 150ms après l'amorce du tracé
	if (footerCols.length > 0) {
		tl.fromTo(
			footerCols,
			{ opacity: 0, y: isMobile ? 10 : 14 },
			{
				opacity: 1,
				y: 0,
				duration: 0.75,
				stagger: 0.08,
				clearProps: 'transform,opacity',
			},
			0.15
		);
	}

	return tl;
}

// Global Media Queries Management for all sections
const masterMedia = gsap.matchMedia();

masterMedia.add('(prefers-reduced-motion: no-preference)', () => {
	initHeroOpeningAnimation();
	initServicesAnimation();
	initAboutAnimation();
	initPourQuiAnimation();
	initAvisAnimation();
	initBentoAnimation();
	initFaqAnimation();
	initFinalCtaAnimation();
	initContactAnimation();
	initFooterAnimation();

	return () => {
		ScrollTrigger.getById('services-header-reveal')?.kill();
		ScrollTrigger.getById('services-cards-reveal')?.kill();
		ScrollTrigger.getById('services-reveal')?.kill();
		ScrollTrigger.getById('about-reveal')?.kill();
		ScrollTrigger.getById('pour-qui-intro')?.kill();
		for (let i = 0; i < 4; i++) {
			ScrollTrigger.getById(`pour-qui-item-${i}`)?.kill();
		}
		ScrollTrigger.getById('avis-reveal')?.kill();
		ScrollTrigger.getById('bento-reveal')?.kill();
		ScrollTrigger.getById('faq-reveal')?.kill();
		ScrollTrigger.getById('final-cta-reveal')?.kill();
		ScrollTrigger.getById('contact-reveal')?.kill();
		ScrollTrigger.getById('footer-reveal')?.kill();
	};
});

masterMedia.add('(prefers-reduced-motion: reduce)', () => {
	document.documentElement.classList.remove('js-reveal');

	const ecg = document.querySelector<SVGPathElement>('.final-cta__ecg path');
	if (ecg) gsap.set(ecg, { strokeDashoffset: 0, clearProps: 'strokeDasharray,strokeDashoffset' });
	const footerEcg = document.querySelector<SVGPathElement>('.footer-monumental-ecg__path');
	if (footerEcg) gsap.set(footerEcg, { strokeDashoffset: 0, clearProps: 'strokeDasharray,strokeDashoffset' });

	gsap.set([
		'[data-site-header] .brand',
		'[data-site-header] .desktop-navigation',
		'[data-site-header] .navbar-cta',
		'[data-site-header] .menu-toggle',
		'.hero__eyebrow',
		'.hero__title-main',
		'.hero__place',
		'.hero__lead',
		'.hero-button',
		'.hero__image-frame',
		'.trust-bar',
		'.services__eyebrow',
		'.services__heading h2',
		'.services__intro',
		'[data-carousel-card]',
		'.services__controls',
		'.about__block',
		'.about__photo-reveal',
		'.about__photo',
		'.about__eyebrow',
		'.about__title',
		'.about__text',
		'.situations__eyebrow',
		'.situations__title',
		'.situations__intro',
		'.situation-item__block',
		'.situation-item__photo-reveal',
		'.situation-item__img',
		'.situation-item__meta',
		'.situation-item__title',
		'.situation-item__desc',
		'.methode__eyebrow',
		'.methode__title',
		'.methode__intro',
		'[data-methode-card]',
		'.methode-card__tab',
		'.methode-card__step-badge',
		'.methode-card__title',
		'.methode-card__desc',
		'.methode-card__media img',
		'.reviews__eyebrow',
		'.reviews__title',
		'.review-card',
		'.review-card__star',
		'.reviews__navigation',
		'.practical__eyebrow',
		'.practical__title',
		'.bento-card',
		'.bento-availability__schedule',
		'.faq__eyebrow',
		'.faq__title',
		'.faq__desc',
		'.faq__emergency',
		'.faq-item',
		'.final-cta__card',
		'.final-cta__eyebrow',
		'.final-cta__title',
		'.final-cta__desc',
		'.final-cta__btn',
		'.final-cta__portrait-img',
		'.contact__eyebrow',
		'.contact__title',
		'.contact__lead',
		'.contact__visual-reveal',
		'.contact__visual-img',
		'.contact__detail-item',
		'[data-contact-form-card]',
		'.site-footer__identity',
		'.site-footer__navigation',
		'.site-footer__contact',
	], { clearProps: 'all' });
});

if (import.meta.hot) {
	import.meta.hot.dispose(() => masterMedia.revert());
}

// Web fonts (Manrope headings) can load after first paint and shift layout,
// which moves pinned/triggered start positions. Refresh once fonts are ready so
// every section re-measures against the final layout.
if (typeof document !== 'undefined' && document.fonts?.ready) {
	document.fonts.ready.then(() => ScrollTrigger.refresh());
}
