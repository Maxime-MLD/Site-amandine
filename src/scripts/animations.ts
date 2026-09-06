import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Method section — pinned "filing-card" stack (desktop, tablet AND mobile).
// The 3 cards land in the exact same rectangle; only their offset tabs stay
// visible. Card 1 shows first, then 2 then 3 rise from below into place, with a
// short delay before card 2 and small breaths between/after. One scrubbed
// timeline drives it, so the reverse plays automatically.
function initMethodeAnimation() {
	const section = document.querySelector<HTMLElement>('[data-methode]');
	if (!section) return;

	const pin = section.querySelector<HTMLElement>('[data-methode-pin]');
	const cards = gsap.utils.toArray<HTMLElement>('[data-methode-card]', section);
	const header = section.querySelector<HTMLElement>('[data-methode-header]');
	const revealItems = gsap.utils.toArray<HTMLElement>('[data-methode-reveal]', section);

	if (!pin || cards.length !== 3) return;

	ScrollTrigger.getById('methode-pin')?.kill();
	ScrollTrigger.getById('methode-header-reveal')?.kill();

	// Only switch the cards into the absolute-stacked pinned layout once JS is
	// ready. Without this flag they stay in normal flow and remain fully visible
	// if GSAP fails to load (progressive enhancement).
	section.setAttribute('data-methode-ready', '');

	const media = gsap.matchMedia();

	// Same pinned behaviour on every width — only the internal layout (CSS) and
	// pin distance change. Cards 2 & 3 start fully below the masked viewport and
	// only the currently-active card carries a shadow (no stacked shadows).
	media.add('(prefers-reduced-motion: no-preference)', () => {
		const [first, second, third] = cards;

		const SHADOW_ON = '0 18px 45px rgba(23, 23, 23, 0.08), 0 4px 14px rgba(23, 23, 23, 0.04)';
		const SHADOW_OFF = '0 18px 45px rgba(23, 23, 23, 0), 0 4px 14px rgba(23, 23, 23, 0)';

		// Full viewport height (+ buffer) so a pending card sits completely below
		// the masked pin — body, image and shadow all off-screen.
		const hideY = () => window.innerHeight + 120;
		const CARD2_IN = 0.18;
		const CARD3_IN = 0.56;

		// Explicit initial state (NOT fromTo/immediateRender, which renders the end
		// state under scrub) so only card 1 — with its shadow — is visible at start.
		gsap.set(first, { y: 0, boxShadow: SHADOW_ON });
		gsap.set([second, third], { y: hideY, boxShadow: SHADOW_OFF });

		const tab1 = first.querySelector<HTMLElement>('.methode-card__tab');
		const tab2 = second.querySelector<HTMLElement>('.methode-card__tab');
		const tab3 = third.querySelector<HTMLElement>('.methode-card__tab');
		const allTabs = [tab1, tab2, tab3].filter(Boolean) as HTMLElement[];

		if (tab1 && tab2 && tab3) {
			gsap.set(tab1, { opacity: 1 });
			gsap.set([tab2, tab3], { opacity: 0.68 });
		}

		// Header progressive opacity reveal on scroll (0.22 -> 1)
		if (header && revealItems.length > 0) {
			gsap.set(revealItems, { opacity: 0.22 });

			const headerTimeline = gsap.timeline({
				scrollTrigger: {
					id: 'methode-header-reveal',
					trigger: header,
					start: 'top 88%',
					end: 'top 28%',
					scrub: true,
					invalidateOnRefresh: true,
				},
			});

			revealItems.forEach((el, index) => {
				headerTimeline.to(
					el,
					{
						opacity: 1,
						duration: 0.45,
						ease: 'none',
					},
					index * 0.18
				);
			});
		}

		const timeline = gsap.timeline({
			defaults: { ease: 'power2.out' },
			scrollTrigger: {
				id: 'methode-pin',
				trigger: pin,
				start: 'top top',
				end: () => `+=${Math.round(window.innerHeight * 2.4)}`,
				pin: true,
				pinSpacing: true,
				scrub: true,
				anticipatePin: 1,
				invalidateOnRefresh: true,
				// Re-hide, for the new viewport, any card still parked below at the
				// current scroll position (resize / orientation change).
				onRefresh: (self) => {
					if (self.progress < CARD2_IN) gsap.set(second, { y: window.innerHeight + 120 });
					if (self.progress < CARD3_IN) gsap.set(third, { y: window.innerHeight + 120 });
				},
			},
		});

		timeline
			// 0 → 0.18 : card 1 alone (initial delay)
			.to(second, { y: 0, duration: 0.3 }, CARD2_IN) // 0.18 → 0.48 : card 2 rises
			.to(first, { boxShadow: SHADOW_OFF, duration: 0.3 }, CARD2_IN) // shadow hands over
			.to(second, { boxShadow: SHADOW_ON, duration: 0.3 }, CARD2_IN);

		if (tab1 && tab2 && tab3) {
			timeline
				.to(tab1, { opacity: 0.68, duration: 0.25 }, CARD2_IN)
				.to(tab2, { opacity: 1, duration: 0.25 }, CARD2_IN)
				.to(tab2, { opacity: 0.68, duration: 0.25 }, CARD3_IN)
				.to(tab3, { opacity: 1, duration: 0.25 }, CARD3_IN);
		}

		timeline
			// 0.48 → 0.56 : breath
			.to(third, { y: 0, duration: 0.3 }, CARD3_IN) // 0.56 → 0.86 : card 3 rises
			.to(second, { boxShadow: SHADOW_OFF, duration: 0.3 }, CARD3_IN)
			.to(third, { boxShadow: SHADOW_ON, duration: 0.3 }, CARD3_IN)
			// 0.86 → 1.0 : final breath before the pin releases
			.to({}, { duration: 0.14 }, 0.86);

		return () => {
			ScrollTrigger.getById('methode-header-reveal')?.kill();
			timeline.scrollTrigger?.kill();
			timeline.kill();
			gsap.set(cards, { clearProps: 'all' });
			if (allTabs.length > 0) gsap.set(allTabs, { clearProps: 'all' });
			if (revealItems.length > 0) gsap.set(revealItems, { clearProps: 'all' });
		};
	});

	media.add('(prefers-reduced-motion: reduce)', () => {
		gsap.set(cards, { clearProps: 'all' });
		if (revealItems.length > 0) gsap.set(revealItems, { clearProps: 'all' });
	});

	if (import.meta.hot) {
		import.meta.hot.dispose(() => media.revert());
	}
}

initMethodeAnimation();





function initContactAnimation() {
	ScrollTrigger.getById('contact-reveal')?.kill();
}

initContactAnimation();

// Web fonts (Manrope headings) can load after first paint and shift layout,
// which moves pinned/triggered start positions. Refresh once fonts are ready so
// every section re-measures against the final layout.
if (typeof document !== 'undefined' && document.fonts?.ready) {
	document.fonts.ready.then(() => ScrollTrigger.refresh());
}
