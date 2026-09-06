type Web3FormsFetch = (
	input: string,
	init: RequestInit,
) => Promise<Pick<Response, 'ok' | 'json'>>;

export async function submitContactFormData(
	endpoint: string,
	formData: FormData,
	fetcher: Web3FormsFetch = fetch,
): Promise<boolean> {
	try {
		const response = await fetcher(endpoint, {
			method: 'POST',
			body: formData,
			headers: { Accept: 'application/json' },
		});
		const result = await response.json().catch(() => null);

		return response.ok && result?.success === true;
	} catch {
		return false;
	}
}
