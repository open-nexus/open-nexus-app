import { m } from '$lib/paraglide/messages';
import type { LocalizedString } from './types';

/**
 * LocalizedString (文字列または言語キーのマップ) を指定のロケールに合わせて解決します。
 * @param text 対象 of 文字列またはオブジェクト
 * @param locale 解決するロケール (ja, en, zh, ko など)
 * @returns 翻訳された文字列
 */
export function getLocalizedText(text: LocalizedString | undefined, locale: string): string {
	if (!text) return '';
	if (typeof text === 'string') {
		// Paraglide のメッセージキー (theme_pack_default など) である場合は解決
		const key = text as keyof typeof m;
		if (key in m && typeof m[key] === 'function') {
			return (m[key] as () => string)();
		}
		return text;
	}
	if (typeof text === 'object' && text !== null) {
		return text[locale] || text['ja'] || Object.values(text)[0] || '';
	}
	return '';
}
