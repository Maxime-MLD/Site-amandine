import { getContactFieldError, type ContactFieldName } from './contact-validation';
import { submitContactFormData } from './contact-submission';

const form = document.querySelector<HTMLFormElement>('[data-contact-form]');

if (form) {
	const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[data-contact-field]'));
	const submitButton = form.querySelector<HTMLButtonElement>('[data-contact-submit]');
	const submitLabel = form.querySelector<HTMLElement>('[data-contact-submit-label]');
	const spinner = form.querySelector<HTMLElement>('[data-contact-spinner]');
	const status = form.querySelector<HTMLElement>('[data-contact-status]');
	const accessKey = form.querySelector<HTMLInputElement>('input[name="access_key"]');
	const touchedFields = new Set<ContactFieldName>();
	let isSubmitting = false;

	const fieldName = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) =>
		field.name as ContactFieldName;

	const errorElement = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) =>
		form.querySelector<HTMLElement>(`#${field.id}-error`);

	const clearFieldError = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
		const error = errorElement(field);
		field.setAttribute('aria-invalid', 'false');
		field.removeAttribute('aria-describedby');
		if (!error) return;
		error.textContent = '';
		error.hidden = true;
	};

	const showFieldError = (
		field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
		message: string,
	) => {
		const error = errorElement(field);
		if (!error) return;
		field.setAttribute('aria-invalid', 'true');
		field.setAttribute('aria-describedby', error.id);
		error.textContent = message;
		error.hidden = false;
	};

	const validateField = (
		field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
		showError = true,
	) => {
		const message = getContactFieldError(fieldName(field), field.value);
		if (message && showError) showFieldError(field, message);
		if (!message) clearFieldError(field);
		return !message;
	};

	const clearGlobalStatus = () => {
		if (!status) return;
		status.hidden = true;
		status.textContent = '';
		status.removeAttribute('data-status');
		status.removeAttribute('role');
	};

	const showGlobalStatus = (type: 'success' | 'error', message: string) => {
		if (!status) return;
		status.hidden = false;
		status.dataset.status = type;
		status.setAttribute('role', type === 'error' ? 'alert' : 'status');
		status.textContent = message;
	};

	const setSubmitting = (submitting: boolean) => {
		isSubmitting = submitting;
		form.setAttribute('aria-busy', String(submitting));
		if (submitButton) submitButton.disabled = submitting;
		if (submitLabel) submitLabel.textContent = submitting ? 'Envoi en cours…' : 'Envoyer ma demande';
		spinner?.classList.toggle('is-visible', submitting);
	};

	fields.forEach((field) => {
		field.setAttribute('aria-invalid', 'false');

		field.addEventListener('blur', () => {
			touchedFields.add(fieldName(field));
			validateField(field);
		});

		const eventName = field instanceof HTMLSelectElement ? 'change' : 'input';
		field.addEventListener(eventName, () => {
			if (field.getAttribute('aria-invalid') === 'true' || touchedFields.has(fieldName(field))) {
				validateField(field);
			}
		});
	});

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		if (isSubmitting) return;

		clearGlobalStatus();
		fields.forEach(clearFieldError);

		const invalidFields = fields.filter((field) => !validateField(field));
		if (invalidFields.length > 0) {
			const firstInvalid = invalidFields[0];
			firstInvalid.focus({ preventScroll: true });
			firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
			return;
		}

		if (!accessKey?.value) {
			showGlobalStatus(
				'error',
				'Une erreur est survenue. Vous pouvez réessayer ou me contacter directement par téléphone.',
			);
			status?.focus();
			return;
		}

		setSubmitting(true);

		try {
			const submitted = await submitContactFormData(form.action, new FormData(form));
			if (!submitted) throw new Error('Web3Forms submission failed');

			form.reset();
			touchedFields.clear();
			fields.forEach(clearFieldError);
			showGlobalStatus(
				'success',
				'Merci, votre demande a bien été envoyée. Je vous recontacte dès que possible.',
			);
			status?.focus();
		} catch {
			showGlobalStatus(
				'error',
				'Une erreur est survenue. Vous pouvez réessayer ou me contacter directement par téléphone.',
			);
			status?.focus();
		} finally {
			setSubmitting(false);
		}
	});
}
