"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  summarizeTextAction,
  translateTextAction,
  textToSpeechAction,
} from "@/lib/actions";
import {
  BookText,
  Languages,
  Loader2,
  Pause,
  Sparkles,
  Volume2,
} from "lucide-react";
import { Label } from "@/components/ui/label";

type SummaryResult = { keyNotes: string[] };
type TranslationResult = { translatedText: string };

const voices = [
  { id: "Algenib", name: "Narrator 1" },
  { id: "Achernar", name: "Narrator 2" },
  { id: "Spica", name: "Narrator 3" },
  { id: "Sirius", name: "Narrator 4" },
];

const languages = [
    { id: "Spanish", name: "Spanish" },
    { id: "French", name: "French" },
    { id: "German", name: "German" },
    { id: "Japanese", name: "Japanese" },
    { id: "Russian", name: "Russian" },
    { id: "Mandarin Chinese", name: "Chinese" },
];

export function AssistiveReaderForm() {
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState("summarizer");

  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("Spanish");
  
  const [selectedVoice, setSelectedVoice] = useState(voices[0].id);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loadingAudioId, setLoadingAudioId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSummarize = async () => {
    if (!inputText) return;
    setIsSummarizing(true);
    setSummary(null);
    try {
      const res = await summarizeTextAction({ text: inputText });
      setSummary(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleTranslate = async () => {
    if (!inputText) return;
    setIsTranslating(true);
    setTranslation(null);
    try {
      const res = await translateTextAction({ text: inputText, targetLanguage });
      setTranslation(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTranslating(false);
    }
  };
  
  const handlePlayAudio = async (text: string, id: string) => {
    if (!text) return;
    if (playingId === id && audioRef.current) {
      audioRef.current.pause();
      setPlayingId(null);
      return;
    }
    setLoadingAudioId(id);
    setPlayingId(null);
    setAudioSrc(null);
    try {
      const audioData = await textToSpeechAction({ text, voice: selectedVoice });
      setAudioSrc(audioData);
      setPlayingId(id);
    } catch (error) {
      console.error("Failed to generate audio", error);
    } finally {
      setLoadingAudioId(null);
    }
  };
  
  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.play().catch((e) => console.error("Audio play failed", e));
    }
  }, [audioSrc]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Your Text</CardTitle>
          <CardDescription>
            Paste your text below to use the assistive tools.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste a long paragraph or article here..."
            className="min-h-[300px] text-base"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summarizer">Summarizer</TabsTrigger>
                <TabsTrigger value="audio-player">Audio Player</TabsTrigger>
                <TabsTrigger value="translator">Translator</TabsTrigger>
              </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="summarizer" className="space-y-4">
               <CardTitle>Key Notes Generator</CardTitle>
               <Button onClick={handleSummarize} disabled={isSummarizing || !inputText}>
                 {isSummarizing ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>) : (<><BookText className="mr-2 h-4 w-4" /> Generate Notes</>)}
               </Button>
               {isSummarizing && (
                <div className="space-y-2 pt-4">
                    <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-4/5 animate-pulse"></div>
                </div>
               )}
               {summary && (
                <div className="pt-4 space-y-2">
                    <h3 className="font-semibold">Key Notes:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {summary.keyNotes.map((note, index) => <li key={index}>{note}</li>)}
                    </ul>
                </div>
               )}
            </TabsContent>
            <TabsContent value="audio-player" className="space-y-4">
              <CardTitle>Text-to-Speech Controller</CardTitle>
              <div className="space-y-2">
                <Label htmlFor="voice-select">Voice</Label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger id="voice-select">
                        <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                        {voices.map((voice) => <SelectItem key={voice.id} value={voice.id}>{voice.name}</SelectItem>)}
                    </SelectContent>
                </Select>
              </div>
              <Button onClick={() => handlePlayAudio(inputText, 'main')} disabled={loadingAudioId === 'main' || !inputText}>
                {loadingAudioId === 'main' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (playingId === 'main' ? <Pause className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />)}
                {playingId === 'main' ? 'Pause' : 'Listen to Original'}
              </Button>
            </TabsContent>
            <TabsContent value="translator" className="space-y-4">
              <CardTitle>Multilingual Support</CardTitle>
               <div className="space-y-2">
                <Label htmlFor="lang-select">Translate to</Label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                    <SelectTrigger id="lang-select">
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                        {languages.map((lang) => <SelectItem key={lang.id} value={lang.id}>{lang.name}</SelectItem>)}
                    </SelectContent>
                </Select>
              </div>
               <Button onClick={handleTranslate} disabled={isTranslating || !inputText}>
                 {isTranslating ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Translating...</>) : (<><Languages className="mr-2 h-4 w-4" /> Translate</>)}
               </Button>
               {isTranslating && (
                <div className="space-y-2 pt-4">
                    <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
                    <div className="h-10 bg-muted rounded w-full animate-pulse"></div>
                </div>
               )}
               {translation && (
                <div className="pt-4 space-y-2">
                    <h3 className="font-semibold">Translated Text:</h3>
                    <p className="text-muted-foreground">{translation.translatedText}</p>
                     <Button variant="outline" size="sm" onClick={() => handlePlayAudio(translation.translatedText, 'translation')} disabled={loadingAudioId === 'translation'}>
                        {loadingAudioId === 'translation' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (playingId === 'translation' ? <Pause className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />)}
                        {playingId === 'translation' ? 'Pause' : 'Listen to Translation'}
                    </Button>
                </div>
               )}
            </TabsContent>
          </CardContent>
        </Tabs>
        {audioSrc && <audio ref={audioRef} src={audioSrc} onEnded={() => setPlayingId(null)} />}
      </Card>
    </div>
  );
}
