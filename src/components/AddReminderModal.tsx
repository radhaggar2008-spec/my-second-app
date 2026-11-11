import { useState, useEffect, useRef, FormEvent } from 'react';

interface AddReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReminder: (title: string, subtitle: string, icon?: string) => void;
}

// Web Speech API interfaces for TypeScript compatibility
interface SpeechRecognitionResultAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultItem {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionResultAlternative;
}

interface SpeechRecognitionResultListItems {
  length: number;
  [index: number]: SpeechRecognitionResultItem;
}

interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultListItems;
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEventLike) => void) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEventLike) => void) | null;
}

type TargetField = 'title' | 'subtitle' | 'auto';

export function AddReminderModal({
  isOpen,
  onClose,
  onAddReminder,
}: AddReminderModalProps) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [icon, setIcon] = useState('task_alt');

  // Speech Recognition state
  const [isListening, setIsListening] = useState(false);
  const [activeField, setActiveField] = useState<TargetField>('auto');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const activeFieldRef = useRef<TargetField>('auto');
  const titleRef = useRef(title);
  const subtitleRef = useRef(subtitle);

  // Keep refs in sync for speech callbacks
  useEffect(() => {
    activeFieldRef.current = activeField;
  }, [activeField]);

  useEffect(() => {
    titleRef.current = title;
  }, [title]);

  useEffect(() => {
    subtitleRef.current = subtitle;
  }, [subtitle]);

  // Check Web Speech API support
  useEffect(() => {
    const SpeechRecognitionConstructor =
      typeof window !== 'undefined'
        ? (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition ||
          (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition
        : undefined;

    if (!SpeechRecognitionConstructor) {
      setIsSupported(false);
    }
  }, []);

  // Auto-detect icon from spoken words or text
  const detectIconFromText = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.match(/\b(wifi|wi-fi|internet|router|modem|network|broadband|ethernet)\b/)) {
      return 'wifi';
    }
    if (lower.match(/\b(key|lock|security|door|code|deadbolt|alarm|passcode)\b/)) {
      return 'key';
    }
    if (lower.match(/\b(water|leak|plumb|pipe|faucet|tap|sink|filter|drain|toilet|shower)\b/)) {
      return 'water_drop';
    }
    if (lower.match(/\b(bill|utility|electric|gas|power|receipt|invoice|payment|pay)\b/)) {
      return 'receipt_long';
    }
    if (lower.match(/\b(delivery|deliver|package|mail|amazon|courier|ship|order|box|truck)\b/)) {
      return 'local_shipping';
    }
    return null;
  };

  // Stop recognition helper
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop on inactive instance
      }
    }
    setIsListening(false);
    setInterimTranscript('');
  };

  // Cleanup on unmount or close
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  // Start or toggle Speech Recognition
  const startListening = (target: TargetField = 'auto') => {
    setSpeechError(null);

    const SpeechRecognitionConstructor =
      typeof window !== 'undefined'
        ? (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition ||
          (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition
        : undefined;

    if (!SpeechRecognitionConstructor) {
      setSpeechError('Speech recognition is not supported in this browser. Please use Chrome, Safari, or Edge.');
      return;
    }

    // If already listening on the same target, stop
    if (isListening && activeField === target) {
      stopListening();
      return;
    }

    // If currently listening on another target, stop previous first
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // Ignore abort error
      }
    }

    setActiveField(target);
    activeFieldRef.current = target;

    try {
      const recognition = new SpeechRecognitionConstructor();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechFeedback('Listening... Speak your task now');
        setSpeechError(null);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission was denied. Please allow microphone access in browser settings.');
        } else if (event.error === 'no-speech') {
          setSpeechFeedback('No speech detected. Say something like "Schedule HVAC filter change"...');
        } else {
          setSpeechError(`Voice error: ${event.error}`);
        }
        setIsListening(false);
        setInterimTranscript('');
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let finalChunk = '';
        let interimChunk = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i];
          const transcript = item[0].transcript;
          if (item.isFinal) {
            finalChunk += transcript;
          } else {
            interimChunk += transcript;
          }
        }

        setInterimTranscript(interimChunk);

        if (finalChunk) {
          const cleanedText = finalChunk.trim();
          const lower = cleanedText.toLowerCase();

          // Check voice commands
          if (lower === 'clear' || lower === 'clear all') {
            setTitle('');
            setSubtitle('');
            setSpeechFeedback('Cleared all text');
            return;
          }

          if (lower === 'clear title') {
            setTitle('');
            setSpeechFeedback('Cleared title');
            return;
          }

          if (lower === 'clear details' || lower === 'clear subtitle') {
            setSubtitle('');
            setSpeechFeedback('Cleared details');
            return;
          }

          if (lower === 'save reminder' || lower === 'submit' || lower === 'save task' || lower === 'done') {
            if (titleRef.current.trim()) {
              setSpeechFeedback('Saving reminder hands-free...');
              setTimeout(() => {
                onAddReminder(
                  titleRef.current.trim(),
                  subtitleRef.current.trim() || 'Pending task',
                  icon
                );
                stopListening();
                onClose();
              }, 400);
              return;
            } else {
              setSpeechFeedback('Please dictate a task title first before saving.');
              return;
            }
          }

          // Check for auto icon selection
          const detectedIcon = detectIconFromText(cleanedText);
          if (detectedIcon) {
            setIcon(detectedIcon);
          }

          // Smart text assignment based on active target
          const currentTarget = activeFieldRef.current;

          if (currentTarget === 'title') {
            setTitle((prev) => {
              const combined = prev ? `${prev} ${cleanedText}` : cleanedText;
              return combined.charAt(0).toUpperCase() + combined.slice(1);
            });
            setSpeechFeedback('Captured in Title');
          } else if (currentTarget === 'subtitle') {
            setSubtitle((prev) => {
              const combined = prev ? `${prev} ${cleanedText}` : cleanedText;
              return combined.charAt(0).toUpperCase() + combined.slice(1);
            });
            setSpeechFeedback('Captured in Details');
          } else {
            // 'auto' hands-free mode: parse smartly if user says "details: ..." or "notes: ..."
            const detailsSplit = cleanedText.split(/\b(?:details|notes|subtitle|description|due)\b/i);

            if (detailsSplit.length > 1 && detailsSplit[0].trim()) {
              const mainTitle = detailsSplit[0].trim();
              const mainSubtitle = detailsSplit.slice(1).join(' ').trim();

              setTitle((prev) => {
                const combined = prev ? `${prev} ${mainTitle}` : mainTitle;
                return combined.charAt(0).toUpperCase() + combined.slice(1);
              });
              if (mainSubtitle) {
                setSubtitle((prev) => {
                  const combined = prev ? `${prev} ${mainSubtitle}` : mainSubtitle;
                  return combined.charAt(0).toUpperCase() + combined.slice(1);
                });
              }
              setSpeechFeedback('Parsed into Title & Details');
            } else {
              // If title is empty, fill title; if title already has content, append or fill subtitle
              if (!titleRef.current.trim()) {
                const capitalized = cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1);
                setTitle(capitalized);
                setSpeechFeedback('Task title captured. Dictate details or say "Save reminder"');
              } else {
                setSubtitle((prev) => {
                  const combined = prev ? `${prev} ${cleanedText}` : cleanedText;
                  return combined.charAt(0).toUpperCase() + combined.slice(1);
                });
                setSpeechFeedback('Details captured. Say "Save reminder" to submit!');
              }
            }
          }
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: unknown) {
      setSpeechError(`Failed to initialize speech recognition: ${err instanceof Error ? err.message : String(err)}`);
      setIsListening(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    stopListening();
    onAddReminder(title.trim(), subtitle.trim() || 'Pending task', icon);
    setTitle('');
    setSubtitle('');
    onClose();
  };

  const handleModalClose = () => {
    stopListening();
    onClose();
  };

  const iconOptions = [
    { value: 'task_alt', label: 'Checkmark' },
    { value: 'wifi', label: 'Wi-Fi / Internet' },
    { value: 'key', label: 'Lock / Security' },
    { value: 'water_drop', label: 'Plumbing' },
    { value: 'receipt_long', label: 'Utilities' },
    { value: 'local_shipping', label: 'Delivery' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
              <span className="material-symbols-outlined text-lg">mic</span>
            </div>
            <div>
              <h3 className="font-headline-md text-lg text-white font-bold leading-tight">
                Add New Task / Reminder
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Type or speak hands-free using VoiceToText
              </p>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* VoiceToText Hands-Free Master Banner */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => startListening('auto')}
                className={`relative flex items-center justify-center w-11 h-11 rounded-xl transition-all cursor-pointer shadow-xs ${
                  isListening && activeField === 'auto'
                    ? 'bg-rose-600 text-white shadow-rose-200 ring-4 ring-rose-200 animate-pulse'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 hover:scale-102'
                }`}
                title={isListening ? 'Stop listening' : 'Start hands-free dictation'}
              >
                <span className="material-symbols-outlined text-xl">
                  {isListening && activeField === 'auto' ? 'mic' : 'mic'}
                </span>
                {isListening && activeField === 'auto' && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping" />
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    VoiceToText Hands-Free
                  </span>
                  {isListening ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                      Recording ({activeField.toUpperCase()})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Web Speech API
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  {isListening
                    ? 'Say your task, or say "Save reminder" to finish'
                    : 'Tap microphone to speak title and details hands-free'}
                </p>
              </div>
            </div>

            {/* Quick Voice Control Actions */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              {isListening && (
                <div className="flex items-center gap-1 h-5 px-2 py-1 bg-white rounded-lg border border-slate-200">
                  <span className="w-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s] h-3"></span>
                  <span className="w-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s] h-4"></span>
                  <span className="w-1 bg-indigo-600 rounded-full animate-bounce h-2"></span>
                  <span className="w-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.2s] h-4"></span>
                  <span className="w-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.35s] h-2"></span>
                </div>
              )}
              {isListening ? (
                <button
                  type="button"
                  onClick={stopListening}
                  className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                >
                  Stop
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => startListening('auto')}
                  className="px-3 py-1 text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 rounded-lg cursor-pointer transition-colors"
                >
                  Dictate Task
                </button>
              )}
            </div>
          </div>

          {/* Live Voice Feedback / Realtime Spoken Preview */}
          {(interimTranscript || speechFeedback) && (
            <div className="mt-3 p-2.5 rounded-xl bg-white border border-indigo-100 shadow-2xs text-xs space-y-1 animate-in fade-in duration-150">
              {interimTranscript && (
                <div className="flex items-center gap-2 text-indigo-900 font-medium">
                  <span className="material-symbols-outlined text-sm text-indigo-600 animate-spin">
                    progress_activity
                  </span>
                  <span className="italic">"{interimTranscript}"</span>
                </div>
              )}
              {speechFeedback && !interimTranscript && (
                <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                  <span className="material-symbols-outlined text-xs text-indigo-600">
                    info
                  </span>
                  <span>{speechFeedback}</span>
                </div>
              )}
            </div>
          )}

          {/* Speech Error Banner */}
          {speechError && (
            <div className="mt-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-rose-600">
                error
              </span>
              <span>{speechError}</span>
            </div>
          )}

          {/* Unsupported notice if needed */}
          {!isSupported && (
            <div className="mt-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-amber-600">
                warning
              </span>
              <span>
                Web Speech API is not supported in this browser. Please use Google Chrome, Safari, or Microsoft Edge for dictation.
              </span>
            </div>
          )}
        </div>

        {/* Task Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Task Title Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-label-sm text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Task Title *
              </label>
              <button
                type="button"
                onClick={() => startListening('title')}
                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                  isListening && activeField === 'title'
                    ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                    : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
                }`}
                title="Dictate only Task Title"
              >
                <span className="material-symbols-outlined text-xs">mic</span>
                {isListening && activeField === 'title' ? 'Listening Title...' : 'Dictate Title'}
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Schedule HVAC Filter Change"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-3 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  isListening && activeField === 'title'
                    ? 'border-indigo-500 ring-2 ring-indigo-300 bg-indigo-50/20'
                    : 'border-slate-200 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
              <button
                type="button"
                onClick={() => startListening('title')}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg cursor-pointer transition-colors ${
                  isListening && activeField === 'title'
                    ? 'text-rose-600 bg-rose-50'
                    : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-200/60'
                }`}
                title="Dictate title"
              >
                <span className="material-symbols-outlined text-base">mic</span>
              </button>
            </div>
          </div>

          {/* Subtitle / Details Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-label-sm text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Subtitle / Details
              </label>
              <button
                type="button"
                onClick={() => startListening('subtitle')}
                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                  isListening && activeField === 'subtitle'
                    ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                    : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
                }`}
                title="Dictate only Subtitle / Details"
              >
                <span className="material-symbols-outlined text-xs">mic</span>
                {isListening && activeField === 'subtitle' ? 'Listening Details...' : 'Dictate Details'}
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Technician arriving between 10am-12pm"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-3 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  isListening && activeField === 'subtitle'
                    ? 'border-indigo-500 ring-2 ring-indigo-300 bg-indigo-50/20'
                    : 'border-slate-200 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
              <button
                type="button"
                onClick={() => startListening('subtitle')}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg cursor-pointer transition-colors ${
                  isListening && activeField === 'subtitle'
                    ? 'text-rose-600 bg-rose-50'
                    : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-200/60'
                }`}
                title="Dictate details"
              >
                <span className="material-symbols-outlined text-base">mic</span>
              </button>
            </div>
          </div>

          {/* Icon Symbol Selection with Voice Auto-Detection */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-label-sm text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Icon Symbol
              </label>
              <span className="text-[10px] text-slate-500">
                Auto-selects when you say "wifi", "plumbing", etc.
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {iconOptions.map((opt) => {
                const isSelected = icon === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setIcon(opt.value)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold shadow-2xs'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-base ${
                        isSelected ? 'text-indigo-600' : 'text-slate-500'
                      }`}
                    >
                      {opt.value}
                    </span>
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Voice Helper Tips */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <span className="material-symbols-outlined text-xs text-indigo-600">
                tips_and_updates
              </span>
              <span>Hands-Free Voice Commands</span>
            </div>
            <p>
              • Say <strong>"Schedule locksmith to rekey door"</strong> to fill title & auto-pick icon.
            </p>
            <p>
              • Say <strong>"Save reminder"</strong> to submit without clicking. Say <strong>"Clear"</strong> to reset.
            </p>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 flex gap-3 justify-end border-t border-slate-200">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white cursor-pointer shadow-2xs transition-colors flex items-center gap-2"
            >
              <span>Save Reminder</span>
              {isListening && (
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-indigo-200 font-normal">
                  or say "Save"
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
