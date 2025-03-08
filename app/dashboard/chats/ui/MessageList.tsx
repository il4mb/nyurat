"use client";

import { MessageProps, MessageStatusProps, UserProps } from "@internal/types";
import { Avatar, Box, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useChat } from "./ChatProvider";
import MessageStatus from "./MessageStatus";

type Props = {
    messages: MessageProps[];
};

interface GroupedModel {
    sender: UserProps;
    messages: {
        content: string;
        time: number;
        status?: MessageStatusProps;
    }[];
}

export default function MessageList({ messages }: Props) {
    const { session } = useChat();
    const [grouped, setGrouped] = useState<GroupedModel[]>([]);

    useEffect(() => {
        if (!messages.length) return;

        const newGrouped: GroupedModel[] = [];

        messages.forEach((message) => {
            const lastGroup = newGrouped[newGrouped.length - 1];

            if (
                lastGroup &&
                lastGroup.sender._id === message.sender._id &&
                message.time > lastGroup.messages[lastGroup.messages.length - 1].time - 3600
            ) {
                // Add to existing group
                lastGroup.messages.push({
                    content: message.content,
                    time: message.time,
                    status: message.status
                });
            } else {
                // Create a new group
                newGrouped.push({
                    sender: message.sender,
                    messages: [{ content: message.content, time: message.time, status: message.status }],
                });
            }
        });

        setGrouped(newGrouped);
    }, [messages]);

    return (
        <>
            {grouped.map((group, index) => {
                const isMe = group.sender._id === session?._id;
                const align = group.sender._id === session?._id ? ["end", "right"] : ["start", "left"];
                return (
                    <Box key={index} sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: `flex-${align[0]}`,
                        gap: 1,
                        mx: 1,
                        mb: 2
                    }}>
                        <Box sx={{ display: "flex", flexDirection: `row${isMe ? "-reverse" : ""}`, gap: 1 }}>
                            <Box>
                                <Avatar src={group.sender.avatar} alt={group.sender.name} sx={{ width: 35, height: 35 }} />
                            </Box>
                            <Box sx={{ display: "flex", gap: 1, flexDirection: "column", alignItems: `${isMe ? "end" : "start"}` }}>
                                {group.messages.map((msg, msgIndex) => {
                                    return (
                                        <Box key={msgIndex}>
                                            <Box component={Card} sx={{ px: 2, py: 1, borderRadius: "50px" }}>
                                                {msg.content}
                                                {msg.status && (
                                                    <MessageStatus status={msg.status} />
                                                )}
                                            </Box>
                                            <Typography sx={{ fontSize: "10px" }}>
                                                {moment(msg.time).fromNow()}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Box>
                )
            })}
        </>
    );
}
