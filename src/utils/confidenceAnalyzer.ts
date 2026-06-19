export type ConfidenceBand = 'high' | 'medium' | 'low';

export interface ConfidenceInfo {
  value: number;
  band: ConfidenceBand;
  label: string;
  color: string;
  badgeClass: string;
  warningMessage?: string;
}

/**
 * Classify a confidence value (0–1) into a band.
 */
export function classifyConfidence(confidence: number): ConfidenceBand {
  if (confidence >= 0.75) return 'high';
  if (confidence >= 0.5) return 'medium';
  return 'low';
}

/**
 * Get full confidence info including styling hints.
 */
export function getConfidenceInfo(confidence: number): ConfidenceInfo {
  const band = classifyConfidence(confidence);
  const pct = Math.round(confidence * 100);

  switch (band) {
    case 'high':
      return {
        value: confidence,
        band,
        label: `${pct}%`,
        color: '#22c55e',
        badgeClass: 'confidence-badge-high',
      };
    case 'medium':
      return {
        value: confidence,
        band,
        label: `${pct}%`,
        color: '#f59e0b',
        badgeClass: 'confidence-badge-medium',
        warningMessage: 'Moderate confidence — please speak clearly.',
      };
    case 'low':
      return {
        value: confidence,
        band,
        label: `${pct}%`,
        color: '#ef4444',
        badgeClass: 'confidence-badge-low',
        warningMessage: 'Low confidence — transcript may be inaccurate.',
      };
  }
}

/**
 * Compute running average of confidence values.
 */
export function computeAverageConfidence(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/**
 * Compute EMA (exponential moving average) for smoother display.
 */
export function computeEMA(previous: number, current: number, alpha = 0.3): number {
  return alpha * current + (1 - alpha) * previous;
}
