import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ContactStepProps {
  formData: {
    firstName: string
    lastName: string
    email: string
  }
  onChange: (field: string, value: string) => void
}

export function ContactStep({ formData, onChange }: ContactStepProps) {
  return (
    <CardContent className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
          <Input 
            id="firstName" 
            value={formData.firstName} 
            onChange={(e) => onChange('firstName', e.target.value)} 
            placeholder="Enter your first name"
            required 
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
          <Input 
            id="lastName" 
            value={formData.lastName} 
            onChange={(e) => onChange('lastName', e.target.value)} 
            placeholder="Enter your last name"
            required 
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
        <Input 
          id="email" 
          type="email" 
          value={formData.email} 
          onChange={(e) => onChange('email', e.target.value)} 
          placeholder="Enter your email address"
          required 
        />
      </div>
    </CardContent>
  )
}