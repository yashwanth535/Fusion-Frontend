import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Volume2, ChevronDown } from "lucide-react";


const GOOGLE_TTS_API_KEY = import.meta.env.VITE_GOOGLE_TTS_API_KEY;
const voices = [
  { name: "en-US-Wavenet-A", gender: "Female", label: "Female 1" },
  { name: "en-US-Wavenet-B", gender: "Male", label: "Male 1" },
  { name: "en-US-Wavenet-C", gender: "Female", label: "Female 2" },
  { name: "en-US-Wavenet-D", gender: "Male", label: "Male 2" },
];

interface TextToSpeechGoogleProps {
  content: string;
}

const TextToSpeechGoogle: React.FC<TextToSpeechGoogleProps> = ({ content }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState(voices[0].name);
  const [isVoiceDropdownOpen, setIsVoiceDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsVoiceDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
          voice: { languageCode: "en-US", name: selectedVoice },
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

  const toggleVoiceDropdown = () => {
    setIsVoiceDropdownOpen(!isVoiceDropdownOpen);
  };

  const selectVoice = (voiceName: string) => {
    setSelectedVoice(voiceName);
    setIsVoiceDropdownOpen(false);
  };

  const getSelectedVoiceLabel = () => {
    const voice = voices.find(v => v.name === selectedVoice);
    return voice ? `${voice.label} (${voice.gender})` : "Select Voice";
  };

  return (
    <div className="my-4 bg-primary-50 rounded-xl p-6">
      <h3 className="text-20-medium mb-4">Listen to Recipe</h3>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleVoiceDropdown}
            className="flex items-center gap-2 bg-white border-[2px] border-black rounded-lg py-2 px-4 text-16-medium"
          >
            <span>{getSelectedVoiceLabel()}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {isVoiceDropdownOpen && (
            <div className="absolute z-50 mt-1 w-full bg-white border-[2px] border-black rounded-lg shadow-lg">
              {voices.map((voice) => (
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
          <audio 
            controls 
            src={audioUrl} 
            autoPlay 
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default TextToSpeechGoogle; 