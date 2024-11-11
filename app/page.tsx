'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { refineText } from '@/lib/openrouter'
import { useToast } from "@/components/ui/use-toast"
import { QuestionStep } from '@/components/survey/QuestionStep'
import { PreviewStep } from '@/components/survey/PreviewStep'
import { ContactStep } from '@/components/survey/ContactStep'

const questions = [
  { id: 'missionStatement', label: 'Mission Statement', placeholder: 'Why does your med spa exist? What is your mission or purpose?' },
  { id: 'idealPatient', label: 'Ideal Patient', placeholder: 'Who is your ideal patient? Describe their age, interests, goals, or lifestyle.' },
  { id: 'valueProposition', label: 'Value Proposition', placeholder: 'What do you offer your ideal patient? What unique value or experience do they gain from choosing you?' }
]

export default function MedSpaSurvey() {
  const [step, setStep] = useState(1)
  const [isRefining, setIsRefining] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    medSpaName: '',
    missionStatement: '',
    idealPatient: '',
    valueProposition: '',
    firstName: '',
    lastName: '',
    email: ''
  })

  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleRefine = async (field: string) => {
    setIsRefining(true)
    try {
      const question = questions.find(q => q.id === field)
      if (!question) return

      const refinedText = await refineText(formData[field as keyof typeof formData], question.placeholder)
      handleInputChange(field, refinedText)
      
      toast({
        title: "Text Refined",
        description: "Your response has been professionally enhanced.",
        duration: 3000
      })
    } catch (error) {
      toast({
        title: "Refinement Failed",
        description: "Unable to refine text. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsRefining(false)
    }
  }

  const handleSubmit = async () => {
    toast({
      title: "Success!",
      description: "Your brand messaging document has been sent to your email.",
    })
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Your Name</label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => handleInputChange('name', e.target.value)} 
                placeholder="Enter your name"
                className="transition-all focus:scale-[1.02]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="medSpaName" className="text-sm font-medium">Med Spa Name</label>
              <Input 
                id="medSpaName" 
                value={formData.medSpaName} 
                onChange={(e) => handleInputChange('medSpaName', e.target.value)} 
                placeholder="Enter your med spa name"
                className="transition-all focus:scale-[1.02]"
              />
            </div>
          </CardContent>
        )
      case 2:
      case 3:
      case 4:
        const question = questions[step - 2]
        return (
          <QuestionStep
            question={question}
            value={formData[question.id as keyof typeof formData]}
            onChange={(value) => handleInputChange(question.id, value)}
            onRefine={() => handleRefine(question.id)}
            isRefining={isRefining}
          />
        )
      case 5:
        return <PreviewStep formData={formData} />
      case 6:
        return <ContactStep formData={formData} onChange={handleInputChange} />
    }
  }

  const getStepProgress = () => {
    if (step < 2 || step > 4) return null
    return ((step - 1) / 3) * 100
  }

  const renderCardTitle = () => {
    switch(step) {
      case 1: return "Welcome to Your Med Spa Branding Journey"
      case 2: return "Define Your Mission"
      case 3: return "Identify Your Ideal Patient"
      case 4: return "Articulate Your Value Proposition"
      case 5: return "Review Your Brand Messaging"
      case 6: return "Get Your Personalized Brand Messaging"
    }
  }

  const renderCardDescription = () => {
    switch(step) {
      case 1: return "Let's start by getting to know you and your med spa."
      case 2: return "Your mission statement defines why your med spa exists and what you aim to achieve."
      case 3: return "Understanding your ideal patient helps tailor your services and marketing efforts."
      case 4: return "Your value proposition sets you apart from competitors and attracts your ideal patients."
      case 5: return "Review your brand messaging document. You can go back to make changes if needed."
      case 6: return "Enter your contact information to receive your personalized brand messaging document."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{renderCardTitle()}</CardTitle>
          <CardDescription className="text-base">{renderCardDescription()}</CardDescription>
        </CardHeader>
        {step >= 2 && step <= 4 && (
          <div className="px-6 pb-4">
            <Progress value={getStepProgress()} className="w-full h-2" />
            <p className="text-sm text-muted-foreground mt-2">Question {step - 1} of 3</p>
          </div>
        )}
        {renderStep()}
        <CardFooter className="flex justify-between p-6">
          {step > 1 && (
            <Button 
              onClick={() => setStep(step - 1)}
              variant="outline"
              className="transition-all hover:scale-105"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          )}
          <Button 
            onClick={() => step < 6 ? setStep(step + 1) : handleSubmit()}
            disabled={
              (step === 1 && (!formData.name || !formData.medSpaName)) ||
              (step === 6 && (!formData.firstName || !formData.lastName || !formData.email))
            }
            className={`transition-all hover:scale-105 ${step === 1 ? 'ml-auto' : ''}`}
          >
            {step === 6 ? 'Send Me' : step === 4 ? 'Preview' : 'Next'} 
            {step < 6 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}