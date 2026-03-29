import { useState } from 'react'

interface ProModalProps {
  onClose: () => void
}

export default function ProModal({ onClose }: ProModalProps) {
  const [activeTab, setActiveTab] = useState
