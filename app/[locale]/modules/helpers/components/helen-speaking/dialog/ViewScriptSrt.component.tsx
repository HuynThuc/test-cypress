'use client';

interface ViewScriptSrtDialogProps {
  script: string;
}

export function ViewScriptSrtDialog({ script }: ViewScriptSrtDialogProps) {
  return <SubtitleDisplay subtitleText={script} />;
}

const SubtitleDisplay = ({ subtitleText }: { subtitleText: string }) => {
  const subtitleEntries = subtitleText.trim().split('\n\n');

  return (
    <div>
      {/* Map through each subtitle entry */}
      {subtitleEntries.map((entry: string, index: number) => {
        // Split each subtitle entry into lines
        const lines = entry.split('\n');
        // Extract subtitle number, timecodes, and text
        const [number, ...textLines] = lines;
        // Join text lines
        const text = textLines.join(' ');

        return (
          <div key={index}>
            {/* Display subtitle number */}
            <div>Subtitle {number}</div>
            {/* Display start and end time */}
            <div>{/* Time: {startTime} - {endTime} */}</div>
            {/* Display subtitle text */}
            <div>{text}</div>
          </div>
        );
      })}
    </div>
  );
};
