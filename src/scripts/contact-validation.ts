export type ContactFieldName = 'name' | 'phone' | 'email' | 'care_location' | 'message';

const emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;
const frenchPhonePattern = /^(?:0[1-9]\d{8}|\+33[1-9]\d{8})$/;

export function getContactFieldError(name: ContactFieldName, rawValue: string): string {
	const value = rawValue.trim();

	switch (name) {
		case 'name':
			if (!value) return 'Indiquez votre nom et prénom.';
			if (value.length < 2) return 'Indiquez un nom valide.';
			return '';

		case 'phone': {
			if (!value) return 'Indiquez votre numéro de téléphone.';
			const normalizedPhone = value.replace(/[\s().-]/g, '');
			return frenchPhonePattern.test(normalizedPhone)
				? ''
				: 'Vérifiez votre numéro de téléphone (10 chiffres).';
		}

		case 'email':
			// Email is optional, but if provided it must be valid
			if (!value) return '';
			return emailPattern.test(value) ? '' : 'Vérifiez votre adresse e-mail.';

		case 'care_location':
			return value ? '' : 'Précisez le lieu du soin (à domicile, au cabinet, etc.).';

		case 'message':
			if (!value) return 'Indiquez votre besoin ou demande de contact.';
			if (value.length < 5) return 'Ajoutez quelques précisions sur votre demande.';
			return '';
	}
}

