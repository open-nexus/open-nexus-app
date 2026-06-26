# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased] - 2026-06-26

### Added

- **OpenYASKEアイコン**: `OpenYASKE.png` をベースにした新しいアプリ・ファビコンアセットの追加（Android/iOS/Web/SVG）

### Changed

- **プロジェクト名の変更**: プロジェクト名を「open-nexus」から「OpenYASKE」（小文字: `open-yaske`）へ変更し、コードベース、テスト、マニフェスト、およびGit設定（`.git/config`）のすべての出現箇所を更新
- **署名鍵とCIワークフローの更新**: Androidのリリース署名鍵 `open-nexus.jks` を `open-yaske.jks` にリネームし、`.github/workflows/deploy.yml` 内の署名・ビルドアセット参照を更新
- **バージョン表記とソースリンクの更新**: アプリについて（About）に表示されるバージョン情報を日付ベース（`2026.06.26`）に変更し、ソースコードのリンク先を `https://github.com/open-yaske/open-yaske-app` に更新（`more` ページおよび `settings` ページ）

### Removed

- **古いアイコン**: 旧ロゴアイコン `opennexus.png` の削除

## [Unreleased] - 2026-06-25

### Added

- **カスタム機能エディター** (`CustomFeatureEditor.svelte`): その他画面に Markdown / KaTeX / Mermaid 対応 WYSIWYG 入力プレースホルダーを追加
- **ブラウザユーティリティ** (`src/lib/browser.ts`): Capacitor ネイティブ環境とWebブラウザ環境を統一的に扱うブラウザ起動ユーティリティを追加

### Changed

- **その他画面「カスタム機能」**: ダッシュボードの文言を「カスタム機能」に変更し、カスタム機能エディターを統合
- **角丸（Border Radius）統一**: ボタン・カード・ダイアログ・入力フォームなどすべての UI 要素の角丸を一貫したデザインに統一
  - `Button.svelte`, `Modal.svelte`, `Sheet.svelte`, `TextField.svelte`, `ListItem.svelte`, `SectionHeader.svelte`, `StatCard.svelte`, `WeatherCard.svelte`, `SideNav.svelte` 等を更新
- **アプリ内ブラウザをネイティブ実装へ移行**: JS 実装のアプリ内ブラウザ（In-App Browser）を削除し、Capacitor ネイティブ環境ではネイティブブラウザ、Webブラウザ環境ではデフォルト挙動（別タブ）でリンクを開くよう変更
- **設定画面の検索機能修正** (`SettingsSearch.svelte`): 設定項目がキーワードで正しく検索・フィルタリングされない不具合を修正
- **ホーム画面リンクボタンの高さ統一** (`+page.svelte`): 特定の画面幅でリンクボタンの高さが揃わない不具合を修正
- **検索アライメント修正**: 検索入力欄と検索ボタンの垂直方向のズレを解消
- **i18n メッセージ更新** (`messages/ja.json`, `messages/en.json`, `messages/zh.json`, `messages/ko.json`): 上記変更に伴うキーの追加・修正
- **テーマ更新** (`dango.json`): Dango テーマのカラー調整
- **出席・カレンダー・TODO コンポーネント更新**: UI の改善と角丸統一対応
- **時間割コンポーネント更新** (`WeekGrid.svelte`, `SyllabusSheet.svelte`): UI の改善
- **Android / iOS 設定更新**: `AndroidManifest.xml`, `capacitor.build.gradle`, `Info.plist` 等のネイティブ設定を更新

### Removed

- **JS 製アプリ内ブラウザ** (`InAppBrowser.svelte`, `src/routes/inapp-browser/+page.svelte`): Capacitor ネイティブ実装へ移行に伴い削除
- **設定画面のアプリ内ブラウザ関連設定項目**: 削除されたコンポーネントに対応する設定項目を除去

---

## [0.1.0] - 2026-06-24

### Added

- 初期実装・アセットセットアップ・Android 署名ワークフロー追加
- OGP メタタグ設定
