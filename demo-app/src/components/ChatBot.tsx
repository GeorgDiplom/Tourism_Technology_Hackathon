"use client";

import { Button } from "./ui/button";
import { MessageCircle, Send } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Message = {
  sender: "bot" | "user";
  text: string;
};

const demoResponses = new Map<string, string>();
demoResponses.set(
  "i want to do something with my children",
  "Sure, I see you've set 2 children (ages 5 & 8). Cool activities in Salzburg for this would be: Hoppolino in Anif, the Toy Museum, or Haus der Natur (House of Nature). On what day and at what time would you like to do this?" // <-- Antwort 1
);
demoResponses.set(
  "i'd like to do something on tuesday from 1:00 pm, the toy museum sounds cool.",
  "Ah, I see that it's usually busier than normal at this time. It's usually less crowded from 3:00 PM. Would you like to choose a different activity?" // <-- Antwort 2
);

const defaultBotResponse = (inputText: string) => {
  return `I'm sorry, I don't have a specific answer for "${inputText}". Please stick to the demo script.`;
};

export default function ChatBot() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<Message[]>([{ sender: "bot", text: "Hello! How can I help you?" }]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = () => {
    if (value.trim() === "") return;

    const userMessage: Message = { sender: "user", text: value };

    const normalizedInput = value.trim().toLowerCase();

    setHistory((prev) => [...prev, userMessage]);
    setValue("");

    setIsLoading(true);
    setTimeout(() => {
      const specificResponse = demoResponses.get(normalizedInput);
      const botResponse: Message = {
        sender: "bot",
        text: specificResponse ? specificResponse : defaultBotResponse(userMessage.text),
      };

      setHistory((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 2500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="fixed right-5 bottom-5 size-16 cursor-pointer rounded-full">
          <MessageCircle className="size-10" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]
                    min-h-[50dvh]
                    flex flex-col
                   m-0 
                   p-0
                   top-auto left-auto bottom-5 right-5 
                   translate-x-0 translate-y-0 
                   data-[state=open]:slide-in-from-top-auto 
                   data-[state=open]:slide-in-from-left-auto 
                   data-[state=open]:slide-in-from-bottom-5 
                   data-[state=open]:slide-in-from-right-5 
                   data-[state=closed]:slide-out-to-top-auto 
                   data-[state=closed]:slide-out-to-left-auto
                   data-[state=closed]:slide-out-to-bottom-5
                   data-[state=closed]:slide-out-to-right-5"
      >
        <DialogHeader className="p-3 border-b">
          <DialogTitle>Find your Activity</DialogTitle>
          <DialogDescription>Ask me anything (except things that are not related to activities in Salzburg ☺️).</DialogDescription>
        </DialogHeader>

        <div className="grow p-3 flex flex-col space-y-2 overflow-y-auto">
          {history.map((item, index) => (
            <PrintChatItem message={item} key={index} />
          ))}
          {isLoading && <PrintChatResponsePlaceholder />}
        </div>

        <DialogFooter className="border-t flex items-center p-3 shrink-0">
          <input
            placeholder="What are you looking for?"
            className="w-full focus:outline-0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleChange()}
          />
          <Button className="ml-2" onClick={handleChange}>
            <Send />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PrintChatResponsePlaceholder() {
  return <div className="p-3 rounded-lg max-w-[80%] self-start border bg-white animate-pulse">...</div>;
}

function PrintChatItem({ message }: { message: Message }) {
  const isBot = message.sender === "bot";

  const classes = cn("p-3 rounded-lg max-w-[80%]", {
    "self-start border bg-white": isBot,
    "self-end bg-zinc-200": !isBot,
  });

  return <div className={classes}>{message.text}</div>;
}
