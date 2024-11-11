import { CardContent } from "@/components/ui/card"

interface PreviewStepProps {
  formData: {
    name: string
    medSpaName: string
    missionStatement: string
    idealPatient: string
    valueProposition: string
  }
}

export function PreviewStep({ formData }: PreviewStepProps) {
  const compileBrandMessaging = () => {
    return `
Med Spa Brand Messaging Document
Name: ${formData.name}
Med Spa: ${formData.medSpaName}

1. Mission Statement
${formData.missionStatement}

2. Ideal Patient
${formData.idealPatient}

3. Value Proposition
${formData.valueProposition}
    `
  }

  return (
    <CardContent className="space-y-4">
      <h3 className="text-lg font-semibold">Preview Your Brand Messaging Document</h3>
      <div className="bg-muted p-6 rounded-lg whitespace-pre-wrap font-mono text-sm">
        {compileBrandMessaging()}
      </div>
    </CardContent>
  )
}