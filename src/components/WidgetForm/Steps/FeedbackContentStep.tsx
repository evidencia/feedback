import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshortButton } from "../ScreenshortButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartResquested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartResquested, onFeedbackSent } : FeedbackContentStepProps) {
  const [screenshort, setScreenshort] = useState<string | null>(null)
  const [comment, setComment] = useState('')

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()
    console.log({screenshort, comment})

    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button onClick={onFeedbackRestartResquested} type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
          <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>
      
      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:outline-none focus-ring-1 resize-none  scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontencendo..."
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshortButton 
            screenshort ={screenshort}
            onScreenshortTook = {setScreenshort}
          />

          <button 
            type="submit"
            disabled ={comment.length === 0}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  )
}
