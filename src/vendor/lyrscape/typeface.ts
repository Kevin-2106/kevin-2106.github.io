/** Web-only font adapter. The production renderer/lyric parser stay unchanged. */
import type { LyricDocument } from './types';
export type Lang = 'ja' | 'zh-Hans' | 'latin';
export const AUTO_FAMILIES: Record<string, unknown> = {};
export function lineLang(text: string, fallback: Lang): Lang {
  if (/[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text)) return 'ja';
  if (/\p{Script=Han}/u.test(text)) return fallback;
  return 'latin';
}
export function documentLangs(document: LyricDocument) {
  const text = document.lines.map(line => line.text).join('');
  return { lyrics: lineLang(text, 'ja'), translation: 'zh-Hans' as Lang };
}
export const langTag = (lang: Lang) => lang === 'zh-Hans' ? 'zh-CN' : lang === 'latin' ? 'en' : lang;
export const themeFamily = (setting: string, _lang: Lang, _text?: string) => setting;
