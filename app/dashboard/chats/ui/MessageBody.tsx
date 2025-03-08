import { Box } from '@mui/material'
import React from 'react'
import MessageInput from './MessageInput'
import MessageList from './MessageList'
import { useMessage } from './MessageProvider'

type Props = {}

export default function MessageBody({ }: Props) {
  const { messages } = useMessage();

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <MessageList messages={messages} />
      </Box>
      <MessageInput />
    </Box>
  )
}