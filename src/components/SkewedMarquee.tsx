import React from 'react';

export const SkewedMarquee: React.FC = () => {
  const row1Words = [
    'FREE AI DIRECTORY',
    '•',
    'ZERO PAYWALLS',
    '•',
    'KINETIC BRUTALISM',
    '•',
    'OPEN SOURCE MODELS',
    '•',
    'UNLEASH THE MACHINES',
    '•',
    'OFFICIAL VERIFIED LINKS',
    '•'
  ];

  const row2Words = [
    'PERPLEXITY',
    '•',
    'LM ARENA',
    '•',
    'DEEPSEEK R1',
    '•',
    'CLINE AGENT',
    '•',
    'ELEVENLABS',
    '•',
    'SUNO MUSIC',
    '•',
    'KLING VIDEO',
    '•',
    'OPENROUTER',
    '•',
    'KREA CANVAS',
    '•'
  ];

  return (
    <section className="relative my-24 overflow-hidden bg-[#000000] border-y-4 border-[#000000] py-12 sm:py-16 skew-section select-none z-10">
      <div className="space-y-4 unskew-content">
        
        {/* Row 1: Orange text (#FF4D00) in Archivo Black, 10vw size, linear marquee */}
        <div className="overflow-hidden whitespace-nowrap">
          <div className="animate-marquee-left flex items-center gap-6">
            {[...row1Words, ...row1Words, ...row1Words].map((word, idx) => (
              <span
                key={`r1-${idx}`}
                className="font-display text-[#FF4D00] text-[8vw] sm:text-[9vw] lg:text-[10vw] font-black tracking-tighter"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: White text with 80% opacity, scrolling in reverse */}
        <div className="overflow-hidden whitespace-nowrap border-t border-white/20 pt-4">
          <div className="animate-marquee-right flex items-center gap-6">
            {[...row2Words, ...row2Words, ...row2Words].map((word, idx) => (
              <span
                key={`r2-${idx}`}
                className="font-display text-white/80 text-[7vw] sm:text-[8vw] lg:text-[9vw] font-black tracking-tighter"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
