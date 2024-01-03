export class StringHelper {
	getRequiredItemName(name: string | undefined): string {
		return name ?? '[Deleted]';
	}

	getAlphabetCharFromIndex(index: number): string {
		const alphabet = [
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'm',
			'n',
			'o',
			'p',
			'q',
			'r',
			's',
			't',
			'u',
			'v',
			'w',
			'x',
			'y',
			'z'
		];

		if (index > alphabet.length - 1) {
			return '_';
		}

		return alphabet[index];
	}

	joinWithLastSeparator(separator: string, lastSeparator: string, items: string[]): string {
		if (!items.length) {
			return '';
		}
		if (items.length === 1) {
			return items[0];
		}

		let finalizedText: string = '';

		for (let i = 0; i < items.length; i++) {
			const item = items[i];

			if (i === 0) {
				// do nothing
			} else if (i === items.length - 1) {
				// last item
				finalizedText += lastSeparator;
			} else {
				finalizedText += separator;
			}

			finalizedText += item;
		}

		return finalizedText;
	}

	getQueryStringParams(url: URL): any {
		const query = url.search;
		return query
			? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce((params: any, param) => {
					const [key, value] = param.split('=');
					params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
					return params;
			  }, {})
			: {};
	}

	getExtension(filenameOrUrl: string): string | undefined {
		if (!filenameOrUrl.includes('.')) {
			return undefined;
		}
		const extension = filenameOrUrl.split('.').pop();

		if (extension?.includes('?')) {
			return extension.substring(0, extension.indexOf('?'));
		}

		return extension?.toLowerCase();
	}

	shorten(text: string, chars: number, addDots?: boolean): string {
		if (!text || !chars) {
			return '';
		}

		if (text.length <= chars) {
			return text;
		}

		let shortenedText = text.substr(0, chars);

		if (addDots) {
			shortenedText += '...';
		}

		return shortenedText;
	}

	getSearchKeys(text: string | undefined): string[] {
		if (!text) {
			return [];
		}
		const searchWords: string[] = [];
		const searchSplit = text.split(' ');
		for (const searchWord of searchSplit) {
			const searchedWordTrimmed = searchWord.trim();
			if (searchedWordTrimmed && searchedWordTrimmed.length > 0) {
				searchWords.push(searchedWordTrimmed);
			}
		}

		return searchWords;
	}

	/**
	 * capitalizeTxt('this is a test'); // returns 'This is a test'
	 * @param text text to capitalize
	 */
	capitalizeText(text: string): string {
		if (!text) {
			return '';
		}
		return text[0].toUpperCase() + text.slice(1);
	}

	isValidEmail(email: string): boolean {
		if (!email) {
			return false;
		}

		const re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email.toLowerCase());
	}

	/**
	 * Returns true if text contains all of the given inputs
	 * @param text text
	 * @param contains text array
	 */
	containsAll(text: string, containsArr: string[]): boolean {
		if (!text || !containsArr || !Array.isArray(containsArr)) {
			return false;
		}

		return containsArr.every((m) => text.toLowerCase().includes(m.toLowerCase()));
	}

	/**
	 * Returns true if text contains one of the given inputs
	 * @param text text
	 * @param contains text array
	 */
	containsAny(text: string, containsArr: string[]): boolean {
		if (!text || !containsArr || !Array.isArray(containsArr)) {
			return false;
		}

		let result = false;

		containsArr.forEach((contains) => {
			if (contains && contains.length) {
				const textContainsResult = text.toLowerCase().indexOf(contains.toLowerCase()) !== -1;
				if (textContainsResult) {
					result = true;
					return;
				}
			}
		});

		return result;
	}

	/*
	 * Checks if given value is string
	 * @param value Value to check
	 */
	isString(value: any): boolean {
		if (typeof value === 'string' || value instanceof String) {
			return true;
		}
		return false;
	}

	/**
	 * Removes HTML tags from text
	 * @param text Text
	 */
	stripHtmlTags(text: string): string | undefined {
		if (text === null || text === '') {
			return undefined;
		}
		return text.replace(/<[^>]*>/g, '');
	}

	getPluralText(data: { value: number; plural0: string; plural1: string; plural2: string; plural5: string }): string {
		if (!data.value) {
			return data.plural0;
		}

		if (data.value === 0) {
			return data.plural0;
		}

		if (data.value === 1) {
			return data.plural1;
		}

		if (data.value > 1 && data.value < 5) {
			return data.plural2;
		}

		if (data.value >= 5) {
			return data.plural5;
		}

		throw Error(`Invalid plural text`);
	}

	getAlphabetCharByIndex(index: number): string {
		const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

		if (index > alphabet.length - 1) {
			throw Error(`Alphabet index '${index}' out of range`);
		}

		return alphabet[index];
	}
}

export const stringHelper = new StringHelper();
