import type { ConfigField, ConfigValue } from './types';
export function normalizeConfig(fields: ConfigField[], input: unknown): Record<string, ConfigValue> {
  const values = input && typeof input === 'object' ? input as Record<string, unknown> : {};
  return Object.fromEntries(fields.map(field => {
    const value = values[field.key];
    let normalized = field.default;
    if (field.type === 'boolean' && typeof value === 'boolean') normalized = value;
    if (field.type === 'select' && field.options?.some(option => option.value === value)) normalized = value as string;
    if (field.type === 'color' && typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)) normalized = value.toLowerCase();
    if (field.type === 'number' && typeof value === 'number' && Number.isFinite(value)) {
      const min = field.min ?? 0, max = field.max ?? Number.MAX_SAFE_INTEGER, step = field.step ?? 1;
      normalized = Math.min(max, Math.max(min, min + Math.round((value - min) / step) * step));
      normalized = Number(Number(normalized).toFixed(4));
    }
    return [field.key, normalized];
  }));
}

