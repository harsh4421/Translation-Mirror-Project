import { saveAs } from 'file-saver';
import type { TranscriptItem, TranslationItem, ExportFormat } from '../types';

const header = (sourceLanguage: string, targetLanguage: string) =>
  `Web Speech API Translation Mirror — Session Export
Generated: ${new Date().toLocaleString()}
Source: ${sourceLanguage} | Target: ${targetLanguage}
${'─'.repeat(60)}

`;

export const exportService = {
  export(
    transcripts: TranscriptItem[],
    translations: TranslationItem[],
    format: ExportFormat
  ): void {
    const sourceLanguage = transcripts[0]?.language ?? 'unknown';
    const targetLanguage = translations[0]?.targetLanguage ?? 'unknown';

    if (format === 'json') {
      const data = {
        exportedAt: new Date().toISOString(),
        sourceLanguage,
        targetLanguage,
        transcripts: transcripts.map((t) => ({
          ...t,
          timestamp: t.timestamp.toISOString(),
        })),
        translations: translations.map((t) => ({
          ...t,
          timestamp: t.timestamp.toISOString(),
        })),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      saveAs(blob, `translation-mirror-${Date.now()}.json`);
      return;
    }

    if (format === 'txt') {
      const lines: string[] = [header(sourceLanguage, targetLanguage)];
      transcripts.forEach((t) => {
        const tr = translations.find((x) => x.originalId === t.id);
        lines.push(`[${t.timestamp.toLocaleTimeString()}]`);
        lines.push(`Original:    ${t.text}`);
        if (tr) lines.push(`Translated:  ${tr.translatedText}`);
        lines.push('');
      });
      const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, `translation-mirror-${Date.now()}.txt`);
      return;
    }

    if (format === 'md') {
      const lines: string[] = [
        `# Translation Mirror — Session Export`,
        ``,
        `**Generated:** ${new Date().toLocaleString()}  `,
        `**Source Language:** ${sourceLanguage}  `,
        `**Target Language:** ${targetLanguage}`,
        ``,
        `---`,
        ``,
        `## Transcript & Translations`,
        ``,
      ];
      transcripts.forEach((t) => {
        const tr = translations.find((x) => x.originalId === t.id);
        lines.push(`### ${t.timestamp.toLocaleTimeString()}`);
        lines.push(`- **Original:** ${t.text}`);
        if (tr) {
          lines.push(`- **Translated (${tr.targetLanguage}):** ${tr.translatedText}`);
        }
        lines.push('');
      });
      const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
      saveAs(blob, `translation-mirror-${Date.now()}.md`);
    }
  },
};
