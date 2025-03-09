import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Volume2, ChevronDown } from "lucide-react";

const GOOGLE_TTS_API_KEY = import.meta.env.VITE_GOOGLE_TTS_API_KEY;

// Accent and voice options
const accents = [
  {
    code: "en-US",
    label: "English (US)",
    voices: [
      { name: "en-US-Wavenet-A", gender: "Female", label: "Female 1" },
      { name: "en-US-Wavenet-D", gender: "Male", label: "Male 1" },
    ],
  },
  {
    code: "en-GB",
    label: "English (UK)",
    voices: [
      { name: "en-GB-Wavenet-A", gender: "Female", label: "Female 1" },
      { name: "en-GB-Wavenet-D", gender: "Male", label: "Male 1" },
    ],
  },
  {
    code: "en-AU",
    label: "English (Australian)",
    voices: [
      { name: "en-AU-Wavenet-A", gender: "Female", label: "Female 1" },
      { name: "en-AU-Wavenet-D", gender: "Male", label: "Male 1" },
    ],
  },
  {
    code: "en-IN",
    label: "English (Indian)",
    voices: [
      { name: "en-IN-Wavenet-A", gender: "Female", label: "Female 1" },
      { name: "en-IN-Wavenet-D", gender: "Male", label: "Male 1" },
    ],
  },
  {
    code: "en-CA",
    label: "English (Canadian)",
    voices: [
      { name: "en-CA-Wavenet-A", gender: "Female", label: "Female 1" },
      { name: "en-CA-Wavenet-D", gender: "Male", label: "Male 1" },
    ],
  },
];

interface TextToSpeechGoogleProps {
  content: string;
}

const TextToSpeechGoogle: React.FC<TextToSpeechGoogleProps> = ({ content }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedAccent, setSelectedAccent] = useState(accents[0]); // Default: US English
  const [selectedVoice, setSelectedVoice] = useState(accents[0].voices[0].name);

  const [isAccentDropdownOpen, setIsAccentDropdownOpen] = useState(false);
  const [isVoiceDropdownOpen, setIsVoiceDropdownOpen] = useState(false);

  const accentDropdownRef = useRef<HTMLDivElement>(null);
  const voiceDropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (accentDropdownRef.current && !accentDropdownRef.current.contains(event.target as Node)) &&
        (voiceDropdownRef.current && !voiceDropdownRef.current.contains(event.target as Node))
      ) {
        setIsAccentDropdownOpen(false);
        setIsVoiceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSpeech = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_API_KEY}`,
        {
          input: { text: content },
          voice: { languageCode: selectedAccent.code, name: selectedVoice },
          audioConfig: { audioEncoding: "MP3" },
        }
      );

      const audioContent = response.data.audioContent;
      setAudioUrl(`data:audio/mp3;base64,${audioContent}`);
    } catch (err) {
      console.error("Text-to-speech error:", err);
      setError("Failed to convert text to speech. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectAccent = (accentCode: string) => {
    const accent = accents.find((a) => a.code === accentCode);
    if (accent) {
      setSelectedAccent(accent);
      setSelectedVoice(accent.voices[0].name); // Reset to first voice of new accent
    }
    setIsAccentDropdownOpen(false);
  };

  const selectVoice = (voiceName: string) => {
    setSelectedVoice(voiceName);
    setIsVoiceDropdownOpen(false);
  };

  return (
    <div className="my-4 bg-primary-50 rounded-xl p-6">
      <h3 className="text-20-medium mb-4">Listen to Recipe</h3>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Accent Dropdown */}
        <div className="relative" ref={accentDropdownRef}>
          <button
            type="button"
            onClick={() => setIsAccentDropdownOpen(!isAccentDropdownOpen)}
            className="flex items-center gap-2 bg-white border-[2px] border-black rounded-lg py-2 px-4 text-16-medium"
          >
            <span>{selectedAccent.label}</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {isAccentDropdownOpen && (
            <div className="absolute z-50 mt-1 w-full bg-white border-[2px] border-black rounded-lg shadow-lg">
              {accents.map((accent) => (
                <button
                  key={accent.code}
                  onClick={() => selectAccent(accent.code)}
                  className={`w-full text-left px-4 py-2 text-16-medium hover:bg-primary-50 transition-colors ${
                    selectedAccent.code === accent.code ? "bg-primary-50 font-medium" : ""
                  }`}
                >
                  {accent.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Voice Dropdown */}
        <div className="relative" ref={voiceDropdownRef}>
          <button
            type="button"
            onClick={() => setIsVoiceDropdownOpen(!isVoiceDropdownOpen)}
            className="flex items-center gap-2 bg-white border-[2px] border-black rounded-lg py-2 px-4 text-16-medium"
          >
            <span>
              {selectedAccent.voices.find((v) => v.name === selectedVoice)?.label} (
              {selectedAccent.voices.find((v) => v.name === selectedVoice)?.gender})
            </span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {isVoiceDropdownOpen && (
            <div className="absolute z-50 mt-1 w-full bg-white border-[2px] border-black rounded-lg shadow-lg">
              {selectedAccent.voices.map((voice) => (
                <button
                  key={voice.name}
                  onClick={() => selectVoice(voice.name)}
                  className={`w-full text-left px-4 py-2 text-16-medium hover:bg-primary-50 transition-colors ${
                    selectedVoice === voice.name ? "bg-primary-50 font-medium" : ""
                  }`}
                >
                  {voice.label} ({voice.gender})
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSpeech}
          disabled={isLoading}
          className="startup-card_btn flex items-center gap-2 py-2 px-4"
        >
          <Volume2 className="h-5 w-5" />
          {isLoading ? "Loading..." : "Read Aloud"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {audioUrl && (
        <div className="mt-4 p-4 bg-white border-[2px] border-black rounded-xl">
          <audio controls src={audioUrl} autoPlay className="w-full" />
        </div>
      )}
    </div>
  );
};

export default TextToSpeechGoogle;
