'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CardContent } from "@/components/ui/card"
import { Bot, Sparkles } from 'lucide-react'

interface QuestionStepProps {
  question: {
    id: string
    label: string
    placeholder: string
  }
  value: string
  onChange: (value: string) => void
  onRefine: () => void
  isRefining: boolean
}

export function QuestionStep({ question, value, onChange, onRefine, isRefining }: QuestionStepProps) {
  return (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <label htmlFor={question.id} className="text-sm font-medium">{question.label}</label>
        <div className="relative">
          <Textarea 
            id={question.id} 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder={question.placeholder}
            className="min-h-[150px] pr-12"
          />
          <Button 
            size="icon"
            variant="ghost" 
            className="absolute right-2 bottom-2 transition-all hover:scale-105" 
            onClick={onRefine}
            disabled={isRefining}
          >
            {isRefining ? (
              <Sparkles className="h-4 w-4 animate-spin" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
            <span className="sr-only">Refine {question.label.toLowerCase()}</span>
          </Button>
        </div>
      </div>
    </CardContent>
  )
}