import React from 'react'
import ChatsPane from './ui/ChatsPane'
import MessageLayout from './ui/MessageLayout'
import ChatProvider from './ui/ChatProvider'
import { getUser } from '@/internal/lib/dal'

export default async function page() {
    const session = await getUser();
    return (
        <ChatProvider session={session}>
            <ChatsPane />
            <MessageLayout />
        </ChatProvider>
    )
}