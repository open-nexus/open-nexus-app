/**
 * 天気ストア
 * Open-Meteo API を使い、緯度経度から現在の天気と时间別予報を取得
 * 30 分間キャッシュ (IndexedDB に永続化)
 */

import { browser } from '$app/environment';
import {
	getCurrentWeather,
	getHourlyForecast,
	type CurrentWeather,
	type HourlyForecast
} from '$lib/weather';
import { get as idbGet, set as idbSet } from 'idb-keyval';

interface CachedWeather {
	data: CurrentWeather;
	forecast?: HourlyForecast;
	timestamp: number;
	lastUpdated?: number;
}

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
// eslint-disable-next-line svelte/prefer-svelte-reactivity
const cache = new Map<string, CachedWeather>();
let idbLoaded = false;

async function ensureIdbLoaded() {
	if (idbLoaded || !browser) return;
	try {
		const allData = await idbGet<[string, CachedWeather][]>('weather_cache_all');
		if (allData && Array.isArray(allData)) {
			for (const [k, v] of allData) {
				cache.set(k, v);
			}
		}
	} catch (err) {
		console.error('Failed to load weather cache from IndexedDB:', err);
	} finally {
		idbLoaded = true;
	}
}

class WeatherStore {
	current = $state<CurrentWeather | null>(null);
	forecast = $state<HourlyForecast | null>(null);
	lastUpdated = $state<number | null>(null);
	loading = $state(false);
	error = $state<string | null>(null);

	async load(lat: number, lng: number, force = false) {
		if (!browser) return;

		await ensureIdbLoaded();

		const key = `${lat.toFixed(2)},${lng.toFixed(2)}`;
		const cached = cache.get(key);

		// キャッシュがあれば即時表示に適用 (stale-while-revalidate)
		if (cached) {
			this.current = cached.data;
			this.forecast = cached.forecast ?? null;
			this.lastUpdated = cached.lastUpdated ?? cached.timestamp;
		}

		// 有効期限内ならAPIフェッチをスキップして終了
		if (!force && cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
			return;
		}

		// キャッシュが無い時のみloading=trueにする（ローディング表示のチラつき防止）
		if (!cached) {
			this.loading = true;
		}
		this.error = null;

		try {
			const data = await getCurrentWeather(lat, lng);
			const forecast = await getHourlyForecast(lat, lng);
			const now = Date.now();

			this.current = data;
			this.forecast = forecast;
			this.lastUpdated = now;

			cache.set(key, { data, forecast, timestamp: now, lastUpdated: now });

			// IndexedDBに永続化
			await idbSet('weather_cache_all', Array.from(cache.entries()));
		} catch (e) {
			this.error = e instanceof Error ? e.message : 'failed';
		} finally {
			this.loading = false;
		}
	}

	async clear() {
		cache.clear();
		this.current = null;
		this.forecast = null;
		this.lastUpdated = null;
		try {
			await idbSet('weather_cache_all', []);
		} catch (err) {
			console.error('Failed to clear weather cache in IndexedDB:', err);
		}
	}
}

export const weatherStore = new WeatherStore();
