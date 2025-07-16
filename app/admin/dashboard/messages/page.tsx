"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Eye, MailOpen, Mail, Trash2 } from "lucide-react"

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  receivedAt: string
}

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<ContactMessage | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/contact-messages")
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      } else {
       
      }
    } catch (error) {
      console.error("Error fetching contact messages:", error)
      
    } finally {
      setLoading(false)
    }
  }

  const handleViewClick = (message: ContactMessage) => {
    setCurrentMessage(message)
    setDialogOpen(true)
    if (!message.read) {
      handleMarkRead(message.id, true)
    }
  }

  const handleMarkRead = async (id: string, readStatus: boolean) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/admin/contact-messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: readStatus }),
      })

      if (response.ok) {
       
        fetchMessages() // Re-fetch to update UI
      } else {
        const errorData = await response.json()
       
      }
    } catch (error) {
      console.error("Error marking message read status:", error)
    
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact message?")) return

    try {
      const response = await fetch("/api/admin/contact-messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
       
        fetchMessages()
      } else {
        const errorData = await response.json()
       
      }
    } catch (error) {
      console.error("Error deleting message:", error)
      
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="font-semibold text-lg md:text-2xl">Contact Messages</h1>
      <Card>
        <CardHeader>
          <CardTitle>Client Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No contact messages found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sender</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Received At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((msg) => (
                  <TableRow key={msg.id} className={msg.read ? "text-muted-foreground" : "font-semibold"}>
                    <TableCell>{msg.name}</TableCell>
                    <TableCell>{msg.email}</TableCell>
                    <TableCell>{msg.subject}</TableCell>
                    <TableCell>{msg.read ? "Read" : "Unread"}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(msg.receivedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleViewClick(msg)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View Message</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleMarkRead(msg.id, !msg.read)}
                          disabled={isSubmitting}
                        >
                          {msg.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                          <span className="sr-only">{msg.read ? "Mark as Unread" : "Mark as Read"}</span>
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(msg.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Message from {currentMessage?.name}</DialogTitle>
            <DialogDescription>Subject: {currentMessage?.subject}</DialogDescription>
          </DialogHeader>
          {currentMessage && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right">From:</Label>
                <span className="col-span-2">{currentMessage.email}</span>
              </div>
              <div className="grid grid-cols-3 items-start gap-4">
                <Label className="text-right pt-2">Message:</Label>
                <p className="col-span-2 text-sm text-muted-foreground">{currentMessage.message}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right">Received At:</Label>
                <span className="col-span-2">{new Date(currentMessage.receivedAt).toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right">Status:</Label>
                <span className="col-span-2">{currentMessage.read ? "Read" : "Unread"}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
