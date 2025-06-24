"use client"

import { useState } from "react"
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

interface DashboardSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DashboardSettingsDialog({ open, onOpenChange }: DashboardSettingsDialogProps) {
  const [settings, setSettings] = useState({
    theme: "system",
    autoRefresh: true,
    refreshInterval: "30",
    notifications: true,
    soundAlerts: false,
    emailDigest: true,
    compactView: false,
    showMetrics: true,
    showCharts: true,
    showRecentActivity: true,
    defaultPage: "dashboard",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const saveSettings = () => {
    // In a real app, you would save to backend/localStorage
    localStorage.setItem("dashboardSettings", JSON.stringify(settings))
    toast({
      title: "Settings Saved",
      description: "Your dashboard settings have been updated successfully.",
    })
    onOpenChange(false)
  }

  const resetSettings = () => {
    setSettings({
      theme: "system",
      autoRefresh: true,
      refreshInterval: "30",
      notifications: true,
      soundAlerts: false,
      emailDigest: true,
      compactView: false,
      showMetrics: true,
      showCharts: true,
      showRecentActivity: true,
      defaultPage: "dashboard",
      timezone: "UTC",
      dateFormat: "MM/DD/YYYY",
      currency: "USD",
    })
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dashboard Settings</DialogTitle>
          <DialogDescription>Customize your dashboard experience and preferences.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="theme">Theme</Label>
                <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <SunIcon className="h-4 w-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <MoonIcon className="h-4 w-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <MonitorIcon className="h-4 w-4" />
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="compact-view">Compact View</Label>
                <Switch
                  id="compact-view"
                  checked={settings.compactView}
                  onCheckedChange={(checked) => handleSettingChange("compactView", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data & Refresh Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data & Refresh</CardTitle>
              <CardDescription>Control how and when your data updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-refresh">Auto Refresh</Label>
                <Switch
                  id="auto-refresh"
                  checked={settings.autoRefresh}
                  onCheckedChange={(checked) => handleSettingChange("autoRefresh", checked)}
                />
              </div>

              {settings.autoRefresh && (
                <div className="flex items-center justify-between">
                  <Label htmlFor="refresh-interval">Refresh Interval</Label>
                  <Select
                    value={settings.refreshInterval}
                    onValueChange={(value) => handleSettingChange("refreshInterval", value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                      <SelectItem value="600">10 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notifications Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notifications</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Push Notifications</Label>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sound-alerts">Sound Alerts</Label>
                <Switch
                  id="sound-alerts"
                  checked={settings.soundAlerts}
                  onCheckedChange={(checked) => handleSettingChange("soundAlerts", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="email-digest">Email Digest</Label>
                <Switch
                  id="email-digest"
                  checked={settings.emailDigest}
                  onCheckedChange={(checked) => handleSettingChange("emailDigest", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Display Components</CardTitle>
              <CardDescription>Choose which components to show on your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-metrics">Show Metrics Cards</Label>
                <Switch
                  id="show-metrics"
                  checked={settings.showMetrics}
                  onCheckedChange={(checked) => handleSettingChange("showMetrics", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-charts">Show Charts</Label>
                <Switch
                  id="show-charts"
                  checked={settings.showCharts}
                  onCheckedChange={(checked) => handleSettingChange("showCharts", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-recent-activity">Show Recent Activity</Label>
                <Switch
                  id="show-recent-activity"
                  checked={settings.showRecentActivity}
                  onCheckedChange={(checked) => handleSettingChange("showRecentActivity", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Regional Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Regional Settings</CardTitle>
              <CardDescription>Set your timezone, date format, and currency preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time</SelectItem>
                    <SelectItem value="PST">Pacific Time</SelectItem>
                    <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                    <SelectItem value="CET">Central European Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="date-format">Date Format</Label>
                <Select value={settings.dateFormat} onValueChange={(value) => handleSettingChange("dateFormat", value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="currency">Currency</Label>
                <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="CAD">CAD (C$)</SelectItem>
                    <SelectItem value="AUD">AUD (A$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="flex justify-between">
          <Button variant="outline" onClick={resetSettings}>
            Reset to Defaults
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={saveSettings}>
              <CheckIcon className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
