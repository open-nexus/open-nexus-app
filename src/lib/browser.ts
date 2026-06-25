import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

/**
 * リンクを指定した動作で開く共通ヘルパー関数
 * @param url 開く対象のURL
 * @param openLinksInApp アプリ内ブラウザを使用するかどうか（Capacitor環境のみ有効）
 */
export async function openLink(url: string, openLinksInApp: boolean): Promise<void> {
	if (Capacitor.isNativePlatform()) {
		if (openLinksInApp) {
			await Browser.open({ url });
		} else {
			window.open(url, '_blank', 'noopener,noreferrer');
		}
	} else {
		window.open(url, '_blank', 'noopener,noreferrer');
	}
}
