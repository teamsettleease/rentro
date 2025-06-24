"use client"

import { useState } from "react"
import { ShieldXIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface BanData {
  userId: number
  type: string
  reason: string
  duration: null | {
    value: string
    unit: string
    customDate: string
  }
  emailNotification: boolean
  banIpAddress: boolean
  internalNotes: string
  timestamp: string
}

interface BanUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: {
    id: number
    name: string
    email: string
  }
  onBanUser: (banData: BanData) => void
  onClose: () => void
}

export function BanUserDialog({ open, onOpenChange, user, onBanUser, onClose }: BanUserDialogProps) {
  const [banType, setBanType] = useState("suspend")
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [duration, setDuration] = useState("7")
  const [durationUnit, setDurationUnit] = useState("days")
  const [customDate, setCustomDate] = useState("")
  const [emailNotification, setEmailNotification] = useState(true)
  const [banIpAddress, setBanIpAddress] = useState(false)
  const [internalNotes, setInternalNotes] = useState("")

  const predefinedReasons = [
    "Violation of Terms of Service",
    "Inappropriate behavior",
    "Spam or promotional content",
    "Fraudulent activity",
    "Multiple policy violations",
    "Harassment of other users",
    "Fake or misleading information",
    "Payment disputes",
    "Custom reason",
  ]

  const handleBanUser = () => {
    const banData = {
      userId: user.id,
      type: banType,
      reason: reason === "Custom reason" ? customReason : reason,
      duration: banType === "temporary" ? { value: duration, unit: durationUnit, customDate } : null,
      emailNotification,
      banIpAddress,
      internalNotes,
      timestamp: new Date().toISOString(),
    }

    onBanUser(banData)
    onClose()

    // Reset form
    setBanType("suspend")
    setReason("")
    setCustomReason("")
    setDuration("7")
    setDurationUnit("days")
    setCustomDate("")
    setEmailNotification(true)
    setBanIpAddress(false)
    setInternalNotes("")
  }

  const handleClose = () => {
    onClose()
    // Reset form when closing
    setBanType("suspend")
    setReason("")
    setCustomReason("")
    setDuration("7")
    setDurationUnit("days")
    setCustomDate("")
    setEmailNotification(true)
    setBanIpAddress(false)
    setInternalNotes("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldXIcon className="h-5 w-5 text-red-600" />
            Ban User Account
          </DialogTitle>
          <DialogDescription>
            You are about to ban <strong>{user.name}</strong> ({user.email}). This action will restrict their access to
            the platform.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Ban Type */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Ban Type</Label>
            <RadioGroup value={banType} onValueChange={setBanType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="suspend" id="suspend" />
                <Label htmlFor="suspend">Suspend Account (Temporary - User can appeal)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disable" id="disable" />
                <Label htmlFor="disable">Disable Account (Indefinite - Admin review required)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="block" id="block" />
                <Label htmlFor="block">Block Account (Permanent - No access)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="temporary" id="temporary" />
                <Label htmlFor="temporary">Temporary Ban (Set duration)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Duration Settings for Temporary Ban */}
          {banType === "temporary" && (
            <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
              <Label className="text-base font-medium">Ban Duration</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="duration-unit">Unit</Label>
                  <Select value={durationUnit} onValueChange={setDurationUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="custom-date">Or set specific end date</Label>
                <Input
                  id="custom-date"
                  type="datetime-local"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Reason for Ban */}
          <div className="space-y-3">
            <Label htmlFor="reason" className="text-base font-medium">
              Reason for Ban
            </Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {predefinedReasons.map((reasonOption) => (
                  <SelectItem key={reasonOption} value={reasonOption}>
                    {reasonOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {reason === "Custom reason" && (
              <Textarea
                placeholder="Enter custom reason..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="mt-2"
              />
            )}
          </div>

          {/* Internal Notes */}
          <div className="space-y-3">
            <Label htmlFor="internal-notes" className="text-base font-medium">
              Internal Notes (Admin Only)
            </Label>
            <Textarea
              id="internal-notes"
              placeholder="Add any internal notes about this ban..."
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
            />
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Additional Options</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email-notification"
                  checked={emailNotification}
                  onCheckedChange={checked => setEmailNotification(checked === true)}
                />
                <Label htmlFor="email-notification">Send email notification to user</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ban-ip"
                  checked={banIpAddress}
                  onCheckedChange={checked => setBanIpAddress(checked === true)}
                />
                <Label htmlFor="ban-ip">Ban IP address (prevents account re-creation)</Label>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> This action will immediately restrict the user&#39;s access to the platform. Make
              sure you have reviewed the case thoroughly before proceeding.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleBanUser} disabled={!reason}>
            Confirm Ban
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
