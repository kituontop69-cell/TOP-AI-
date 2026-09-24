import { ModeId, ModeInfo, AITool } from '../types/index';

export const MODES: ModeInfo[] = [
  {
    id: 'study',
    label: 'STUDY',
    emoji: '📚',
    iconName: 'BookOpen',
    tagline: 'Study, homework, notes & academic research',
    description: 'Tools for studying, homework assistance, explanations, note taking, PDF reading, mathematics, science, exam prep, and tutoring.',
    intents: [
      'studying',
      'homework',
      'explanations',
      'notes',
      'PDFs',
      'academic research',
      'mathematics',
      'science',
      'exam preparation',
      'tutoring',
      'flashcards'
    ],
    matchingCategories: ['ai-education', 'pdf-documents', 'research'],
    keywords: [
      'study', 'studying', 'homework', 'explanation', 'explanations',
      'notes', 'pdf', 'pdfs', 'academic', 'research', 'mathematics',
      'math', 'science', 'exam', 'preparation', 'tutoring', 'tutor',
      'flashcards', 'flashcard', 'learn', 'quiz', 'solver'
    ]
  },
  {
    id: 'coding',
    label: 'CODING',
    emoji: '💻',
    iconName: 'Code',
    tagline: 'Code generation, debugging & developer tools',
    description: 'Tools for code generation, debugging, coding assistants, code explanation, app development, web development, API development, developer tools, and AI IDEs.',
    intents: [
      'code generation',
      'debugging',
      'coding assistants',
      'code explanation',
      'app development',
      'web development',
      'API development',
      'developer tools',
      'AI IDEs'
    ],
    matchingCategories: ['ai-coding', 'developer-tools', 'app-builders'],
    keywords: [
      'code', 'coding', 'debugging', 'debugger', 'assistant', 'explanation',
      'app development', 'web development', 'api', 'developer', 'ide',
      'git', 'programming', 'software', 'syntax', 'full-stack', 'terminal',
      'react', 'python', 'javascript', 'typescript', 'cli'
    ]
  },
  {
    id: 'design',
    label: 'DESIGN',
    emoji: '🎨',
    iconName: 'Palette',
    tagline: 'UI/UX, graphic design, logos & branding',
    description: 'Tools for UI/UX layouts, graphic design, logos, branding, presentations, visual design, and creative assets.',
    intents: [
      'UI/UX',
      'graphic design',
      'logos',
      'branding',
      'presentations',
      'visual design',
      'creative assets'
    ],
    matchingCategories: ['design', 'presentations', 'ai-image'],
    keywords: [
      'ui', 'ux', 'graphic design', 'graphic', 'logo', 'logos',
      'branding', 'brand', 'presentations', 'slides', 'visual design',
      'visual', 'creative assets', 'creative', 'vector', 'layout',
      'canvas', 'figma', 'mockup', 'poster', 'typography'
    ]
  },
  {
    id: 'image',
    label: 'IMAGE',
    emoji: '🖼️',
    iconName: 'Image',
    tagline: 'Image generation, editing & enhancement',
    description: 'Tools for photorealistic image generation, image editing, image enhancement, upscaling, and background removal.',
    intents: [
      'image generation',
      'image editing',
      'image enhancement',
      'upscaling',
      'background removal'
    ],
    matchingCategories: ['ai-image', 'design'],
    keywords: [
      'image generation', 'image editing', 'image enhancement',
      'upscaling', 'upscale', 'background removal', 'background',
      'photo', 'art', 'draw', 'flux', 'midjourney', 'diffusion',
      'inpainting', 'enhancement', 'generator', 'picture', 'canvas'
    ]
  },
  {
    id: 'video',
    label: 'VIDEO',
    emoji: '🎬',
    iconName: 'Film',
    tagline: 'Video generation, editing & animation',
    description: 'Tools for AI video generation, video editing, cinematic animation, text-to-video, image-to-video, and video enhancement.',
    intents: [
      'video generation',
      'video editing',
      'animation',
      'text-to-video',
      'image-to-video',
      'video enhancement'
    ],
    matchingCategories: ['ai-video', '3d-animation'],
    keywords: [
      'video generation', 'video editing', 'animation', 'text-to-video',
      'image-to-video', 'video enhancement', 'video', 'motion',
      'film', 'clip', 'render', 'sora', 'kling', 'runway', 'luma',
      'animate', 'cinematic', 'generation'
    ]
  },
  {
    id: 'voice',
    label: 'VOICE',
    emoji: '🎙️',
    iconName: 'Mic',
    tagline: 'Text-to-speech, voice generation & cloning',
    description: 'Tools for natural text-to-speech, voice generation, voice cloning, transcription, and speech enhancement.',
    intents: [
      'text-to-speech',
      'voice generation',
      'voice cloning',
      'transcription',
      'speech enhancement'
    ],
    matchingCategories: ['ai-voice'],
    keywords: [
      'text-to-speech', 'voice generation', 'voice cloning',
      'transcription', 'speech enhancement', 'voice', 'speech',
      'tts', 'clone', 'dubbing', 'elevenlabs', 'whisper',
      'audiobook', 'narration', 'audio'
    ]
  },
  {
    id: 'music',
    label: 'MUSIC',
    emoji: '🎵',
    iconName: 'Music',
    tagline: 'Music generation, song creation & sound FX',
    description: 'Tools for AI music generation, song generation, sound effects, audio synthesis, and track production.',
    intents: [
      'music generation',
      'song generation',
      'sound effects',
      'audio generation'
    ],
    matchingCategories: ['ai-music'],
    keywords: [
      'music generation', 'song generation', 'sound effects',
      'audio generation', 'music', 'song', 'songs', 'audio',
      'sound', 'beats', 'melody', 'suno', 'udio', 'instrumental',
      'track', 'stems'
    ]
  },
  {
    id: 'writing',
    label: 'WRITING',
    emoji: '✍️',
    iconName: 'PenTool',
    tagline: 'Writing, rewriting, grammar & summarization',
    description: 'Tools for writing, rewriting, grammar checking, summarization, copywriting, proofreading, and content creation.',
    intents: [
      'writing',
      'rewriting',
      'grammar',
      'summarization',
      'copywriting',
      'content creation'
    ],
    matchingCategories: ['ai-writing', 'pdf-documents', 'ai-chat'],
    keywords: [
      'writing', 'rewriting', 'grammar', 'summarization',
      'copywriting', 'content creation', 'write', 'rewrite',
      'copy', 'essay', 'blog', 'proofread', 'summarize',
      'paraphrase', 'content', 'article', 'docs'
    ]
  },
  {
    id: 'research',
    label: 'RESEARCH',
    emoji: '🔎',
    iconName: 'Search',
    tagline: 'AI search, web research & citations',
    description: 'Tools for conversational AI search, live web research, citations, academic research, and information analysis.',
    intents: [
      'AI search',
      'web research',
      'citations',
      'academic research',
      'information analysis'
    ],
    matchingCategories: ['ai-search', 'research', 'ai-arenas'],
    keywords: [
      'ai search', 'web research', 'citations', 'academic research',
      'information analysis', 'search', 'research', 'citation',
      'citations', 'paper', 'papers', 'academic', 'perplexity',
      'fact-checking', 'benchmark', 'analysis', 'insights'
    ]
  },
  {
    id: 'productivity',
    label: 'PRODUCTIVITY',
    emoji: '🧑‍💼',
    iconName: 'Briefcase',
    tagline: 'Productivity, automation & workflows',
    description: 'Tools for workplace productivity, automation, meeting notes, documents, workflows, and business tools.',
    intents: [
      'productivity',
      'automation',
      'meetings',
      'documents',
      'workflows',
      'business tools'
    ],
    matchingCategories: ['productivity', 'pdf-documents', 'presentations', 'ai-chat'],
    keywords: [
      'productivity', 'automation', 'meetings', 'documents',
      'workflows', 'business tools', 'workflow', 'automate',
      'meeting', 'notes', 'calendar', 'task', 'notion',
      'business', 'efficiency', 'workspace'
    ]
  },
  {
    id: '3d',
    label: '3D',
    emoji: '🧊',
    iconName: 'Box',
    tagline: '3D generation, models & assets',
    description: 'Tools for 3D generation, 3D models, 3D assets, text-to-3D, and image-to-3D synthesis.',
    intents: [
      '3D generation',
      '3D models',
      '3D assets',
      'text-to-3D',
      'image-to-3D'
    ],
    matchingCategories: ['3d-animation'],
    keywords: [
      '3d generation', '3d models', '3d assets', 'text-to-3d',
      'image-to-3d', '3d', 'mesh', 'splat', 'model', 'blender',
      'three.js', 'spatial', 'obj', 'texture', 'voxel', 'rigging'
    ]
  },
  {
    id: 'language',
    label: 'LANGUAGE',
    emoji: '🌐',
    iconName: 'Globe',
    tagline: 'Translation, language learning & multilingual AI',
    description: 'Tools for cross-lingual translation, interactive language learning, grammar coaching, transcription, and multilingual AI.',
    intents: [
      'translation',
      'language learning',
      'grammar',
      'transcription',
      'multilingual AI'
    ],
    matchingCategories: ['translation', 'ai-education', 'ai-chat'],
    keywords: [
      'translation', 'language learning', 'grammar', 'transcription',
      'multilingual ai', 'translate', 'language', 'multilingual',
      'bilingual', 'foreign', 'polyglot', 'deepl', 'vocab', 'linguistics'
    ]
  }
];

export const getModeById = (id: ModeId | string): ModeInfo | undefined => {
  return MODES.find(m => m.id === id);
};

/**
 * Checks if an AI tool belongs to a given mode.
 * Multi-mode support: A tool can belong to multiple modes!
 * Matches on:
 * 1. Explicit tool.modes array
 * 2. Categories
 * 3. Tags
 * 4. Name, description, and key features keywords
 */
export const isToolInMode = (tool: AITool, modeId: ModeId): boolean => {
  const mode = getModeById(modeId);
  if (!mode) return false;

  // 1. Explicit modes array
  if (tool.modes && Array.isArray(tool.modes)) {
    const normalized = tool.modes.map(m => m.toLowerCase().trim());
    if (normalized.includes(modeId)) return true;
    if (modeId === 'coding' && normalized.includes('developer')) return true;
    if (modeId === 'study' && normalized.includes('education')) return true;
    if (modeId === 'image' && normalized.includes('photo')) return true;
  }

  // 2. Matching Category Slugs
  const matchesCat = tool.category.some(cat => 
    mode.matchingCategories.includes(cat.toLowerCase())
  );
  if (matchesCat) return true;

  // 3. Matching Tags
  const toolTags = tool.tags.map(t => t.toLowerCase());
  const hasMatchingTag = mode.keywords.some(keyword => 
    toolTags.some(t => t === keyword || t.includes(keyword))
  );
  if (hasMatchingTag) return true;

  // 4. Keyword scan across Name & Description
  const textBlob = `${tool.name} ${tool.description} ${tool.longDescription || ''} ${(tool.keyFeatures || []).join(' ')}`.toLowerCase();
  
  // Specific intent exact word matches
  return mode.keywords.some(kw => {
    // Only match whole-word or distinctive substring
    if (kw.length <= 3) {
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      return regex.test(textBlob);
    }
    return textBlob.includes(kw);
  });
};

/**
 * Filter all tools matching a specific mode
 */
export const getToolsForMode = (modeId: ModeId, tools: AITool[]): AITool[] => {
  return tools.filter(tool => isToolInMode(tool, modeId));
};

/**
 * Returns all modes a tool belongs to (dynamic multi-mode classification)
 */
export const getModesForTool = (tool: AITool): ModeInfo[] => {
  return MODES.filter(mode => isToolInMode(tool, mode.id));
};
