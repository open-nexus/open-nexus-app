/**
 * 公開データストア
 * - schoolDataService.courseItems をソースとする derived ストア
 * - 既存のシラバス関連コンポーネントとの後方互換用
 */

import { browser } from '$app/environment';
import { schoolDataService } from '$lib/schoolData.svelte';
import type { PublicData } from '$lib/types/public';
import { PUBLIC_DATA_SCHEMA_VERSION } from '$lib/types/public';

class PublicDataStore {
	// schoolDataService の科目からリアクティブに PublicData を構築
	data = $derived.by<PublicData | null>(() => {
		const courses = schoolDataService.courseItems;
		return {
			schemaVersion: PUBLIC_DATA_SCHEMA_VERSION,
			generatedAt: new Date().toISOString(),
			index: {
				version: 1,
				generatedAt: new Date().toISOString(),
				count: courses.length
			},
			courses,
			dashboardCards: [] // LODに統合されたため空にする
		};
	});

	loading = $derived(schoolDataService.loading);
	error = $state<string | null>(null);
	online = $state(true);
	initialized = $state(false);

	init() {
		if (!browser) return;
		if (this.initialized) return;
		this.initialized = true;

		this.online = navigator.onLine;

		window.addEventListener('online', () => {
			this.online = true;
		});
		window.addEventListener('offline', () => {
			this.online = false;
		});

		void schoolDataService.init();
	}

	async load() {
		await schoolDataService.init();
	}

	async refresh() {
		this.error = null;
		try {
			await schoolDataService.sync();
		} catch (err) {
			this.error = err instanceof Error ? err.message : String(err);
			throw err;
		}
	}
}

export const publicDataStore = new PublicDataStore();
