import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Method section scroll animation
function initMethodeAnimation() {
	const section = document.querySelector<HTMLElement>('[data-methode]');
	if (!section) return;

	const pin = section.querySelector<HTMLElement>('[data-methode-pin]');
	const steps = gsap.utils.toArray<HTMLElement>('[data-methode-step]', section);
	if (!pin || steps.length !== 3) return;

	ScrollTrigger.getById('methode-desktop')?.kill();
	steps.forEach((_, index) => ScrollTrigger.getById(`methode-mobile-${index}`)?.kill());

	const media = gsap.matchMedia();
	media.add('(prefers-reduced-motion: no-preference) and (min-width: 48rem)', () => {
		const [firstStep, secondStep, thirdStep] = steps;

		gsap.set(steps, {
			autoAlpha: 0,
			x: 0,
			xPercent: 160,
			y: 0,
			scale: 0.98,
			transformOrigin: 'center center',
		});

		const timeline = gsap.timeline({
			scrollTrigger: {
				id: 'methode-desktop',
				trigger: pin,
				start: 'top top',
				end: () => `+=${Math.max(window.innerHeight * 2.4, 1500)}`,
				pin: true,
				pinSpacing: true,
				scrub: true,
				anticipatePin: 1,
				invalidateOnRefresh: true,
			},
		});

		timeline
			.addLabel('card-1', 0)
			.to(
				firstStep,
				{ autoAlpha: 1, xPercent: 0, scale: 1, duration: 1, ease: 'power1.out' },
				'card-1',
			)
			.addLabel('card-2', 1.12)
			.to(
				firstStep,
				{ autoAlpha: 0.92, x: -20, y: -17, scale: 0.97, duration: 0.88, ease: 'power1.inOut' },
				'card-2',
			)
			.to(
				secondStep,
				{ autoAlpha: 1, xPercent: 0, scale: 1, duration: 1, ease: 'power1.out' },
				'card-2',
			)
			.addLabel('card-3', 2.24)
			.to(
				firstStep,
				{ autoAlpha: 0.84, x: -35, y: -30, scale: 0.94, duration: 0.88, ease: 'power1.inOut' },
				'card-3',
			)
			.to(
				secondStep,
				{ autoAlpha: 0.94, x: -15, y: -15, scale: 0.97, duration: 0.88, ease: 'power1.inOut' },
				'card-3',
			)
			.to(
				thirdStep,
				{ autoAlpha: 1, xPercent: 0, scale: 1, duration: 1, ease: 'power1.out' },
				'card-3',
			);

		return () => {
			timeline.scrollTrigger?.kill();
			timeline.kill();
			gsap.set(steps, { clearProps: 'all' });
		};
	});

	media.add('(prefers-reduced-motion: no-preference) and (max-width: 47.999rem)', () => {
		gsap.set(steps, { autoAlpha: 0, y: 30, scale: 1 });

		const tweens = steps.map((step, index) =>
			gsap.to(step, {
				autoAlpha: 1,
				y: 0,
				duration: 0.55,
				ease: 'power2.out',
				scrollTrigger: {
					id: `methode-mobile-${index}`,
					trigger: step,
					start: 'top 85%',
					toggleActions: 'play none none reverse',
					invalidateOnRefresh: true,
				},
			}),
		);

		return () => {
			tweens.forEach((tween) => {
				tween.scrollTrigger?.kill();
				tween.kill();
			});
			gsap.set(steps, { clearProps: 'all' });
		};
	});

	media.add('(prefers-reduced-motion: reduce)', () => {
		gsap.set(steps, { clearProps: 'all' });
	});

	if (import.meta.hot) {
		import.meta.hot.dispose(() => media.revert());
	}
}

initMethodeAnimation();

function initPracticalAnimation() {
	const section = document.querySelector<HTMLElement>('[data-practical]');
	if (!section) return;

	const grid = section.querySelector<HTMLElement>('[data-practical-grid]');
	const cards = gsap.utils.toArray<HTMLElement>('[data-practical-card]', section);
	if (!grid || cards.length !== 4) return;

	ScrollTrigger.getById('practical-cards')?.kill();

	const media = gsap.matchMedia();
	media.add('(prefers-reduced-motion: no-preference)', () => {
		gsap.set(cards, { autoAlpha: 0, y: 25 });

		const tween = gsap.to(cards, {
			autoAlpha: 1,
			y: 0,
			duration: 0.65,
			ease: 'power2.out',
			stagger: 0.1,
			scrollTrigger: {
				id: 'practical-cards',
				trigger: grid,
				start: 'top 82%',
				toggleActions: 'play none none reverse',
				invalidateOnRefresh: true,
			},
		});

		return () => {
			tween.scrollTrigger?.kill();
			tween.kill();
			gsap.set(cards, { clearProps: 'all' });
		};
	});

	media.add('(prefers-reduced-motion: reduce)', () => {
		gsap.set(cards, { clearProps: 'all' });
	});

	if (import.meta.hot) {
		import.meta.hot.dispose(() => media.revert());
	}
}

initPracticalAnimation();

function initFaq() {
	const section = document.querySelector<HTMLElement>('[data-faq]');
	if (!section) return;

	const list = section.querySelector<HTMLElement>('[data-faq-list]');
	const items = gsap.utils.toArray<HTMLElement>('[data-faq-item]', section);
	const revealBlocks = gsap.utils.toArray<HTMLElement>('[data-faq-reveal]', section);
	if (!list || items.length !== 6 || revealBlocks.length !== 2) return;

	ScrollTrigger.getById('faq-reveal')?.kill();
	section.setAttribute('data-faq-ready', '');

	let activeItem: HTMLElement | null = null;
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	const controller = new AbortController();

	const setItemState = (item: HTMLElement, open: boolean) => {
		const trigger = item.querySelector<HTMLButtonElement>('[data-faq-trigger]');
		const answer = item.querySelector<HTMLElement>('[data-faq-answer]');
		const icon = item.querySelector<HTMLElement>('[data-faq-icon]');
		if (!trigger || !answer || !icon) return;

		trigger.setAttribute('aria-expanded', String(open));
		answer.setAttribute('aria-hidden', String(!open));
		gsap.killTweensOf([answer, icon]);

		if (reduceMotion.matches) {
			gsap.set(answer, {
				height: open ? 'auto' : 0,
				autoAlpha: open ? 1 : 0,
			});
			gsap.set(icon, { rotate: open ? 45 : 0 });
			return;
		}

		gsap.to(answer, {
			height: open ? 'auto' : 0,
			autoAlpha: open ? 1 : 0,
			duration: open ? 0.45 : 0.35,
			ease: 'power2.inOut',
			overwrite: true,
		});
		gsap.to(icon, {
			rotate: open ? 45 : 0,
			duration: 0.25,
			ease: 'power2.out',
			overwrite: true,
		});
	};

	items.forEach((item) => {
		const trigger = item.querySelector<HTMLButtonElement>('[data-faq-trigger]');
		const answer = item.querySelector<HTMLElement>('[data-faq-answer]');
		const icon = item.querySelector<HTMLElement>('[data-faq-icon]');
		if (!trigger || !answer || !icon) return;

		gsap.set(answer, { height: 0, autoAlpha: 0 });
		gsap.set(icon, { rotate: 0 });

		trigger.addEventListener('click', () => {
			const shouldOpen = activeItem !== item;
			if (activeItem) setItemState(activeItem, false);

			if (shouldOpen) {
				setItemState(item, true);
				activeItem = item;
			} else {
				activeItem = null;
			}
		}, { signal: controller.signal });
	});

	const media = gsap.matchMedia();
	media.add('(prefers-reduced-motion: no-preference)', () => {
		gsap.set(revealBlocks, { autoAlpha: 0, y: 25 });

		const tween = gsap.to(revealBlocks, {
			autoAlpha: 1,
			y: 0,
			duration: 0.65,
			ease: 'power2.out',
			stagger: 0.12,
			scrollTrigger: {
				id: 'faq-reveal',
				trigger: section,
				start: 'top 82%',
				toggleActions: 'play none none reverse',
				invalidateOnRefresh: true,
			},
		});

		return () => {
			tween.scrollTrigger?.kill();
			tween.kill();
			gsap.set(revealBlocks, { clearProps: 'all' });
		};
	});

	media.add('(prefers-reduced-motion: reduce)', () => {
		gsap.set(revealBlocks, { clearProps: 'all' });
	});

	if (import.meta.hot) {
		import.meta.hot.dispose(() => {
			controller.abort();
			media.revert();
		});
	}
}

initFaq();
