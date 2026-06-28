/**
 * 公開データ取得 (SchoolDataService 互換用レイヤー)
 */

import { schoolDataService } from './schoolData.svelte';
import type { PublicData } from './types/public';
import { PUBLIC_DATA_SCHEMA_VERSION } from './types/public';

/**
 * 互換用：キャッシュ（SchoolDataService 内）から読み込み
 */
export async function loadPublicData(): Promise<PublicData> {
	await schoolDataService.init();
	return {
		schemaVersion: PUBLIC_DATA_SCHEMA_VERSION,
		generatedAt: new Date().toISOString(),
		index: {
			version: 1,
			generatedAt: new Date().toISOString(),
			count: schoolDataService.courseItems.length
		},
		courses: schoolDataService.courseItems,
		dashboardCards: []
	};
}

/**
 * 互換用：キャッシュを削除して再同期
 */
export async function refreshPublicData(): Promise<PublicData> {
	await schoolDataService.sync();
	return loadPublicData();
}

/**
 * 互換用ダミー：CDNベースURLの設定（LOD統合のため何もしない）
 */
export function setPublicDataCdnBase(url: string | null): void {
	// noop
}
