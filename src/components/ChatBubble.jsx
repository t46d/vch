// src/components/ChatBubble.jsx
import React from 'react';

/**
 * فقاعة رسالة بتصميم Cyberpunk.
 * @param {boolean} isMine - لتحديد ما إذا كانت الرسالة مرسلة من المستخدم الحالي.
 * @param {string} content - محتوى الرسالة.
 * @param {string} timestamp - وقت إرسال الرسالة.
 */
export default function ChatBubble({ isMine, content, timestamp }) {
    const containerClasses = isMine
        ? "flex justify-end"
        : "flex justify-start";
    
    const bubbleClasses = isMine
        ? "bg-cyan-600/30 border-cyan-500/50 shadow-neon-cyan/50 self-end" // تصميم رسالة المستخدم
        : "bg-pink-600/30 border-pink-500/50 shadow-neon-pink/50 self-start"; // تصميم رسالة الطرف الآخر

    return (
        <div className={containerClasses}>
            <div
                className={`max-w-xs lg:max-w-md p-4 rounded-xl border ${bubbleClasses}`}
                style={{
                    boxShadow: isMine
                        ? '0 0 15px rgba(0, 240, 255, 0.2)'
                        : '0 0 15px rgba(255, 0, 200, 0.2)'
                }}
            >
                <p className="text-gray-100 whitespace-pre-wrap">{content}</p>
                <span className={`text-xs mt-1 block ${isMine ? 'text-right text-cyan-200/70' : 'text-left text-pink-200/70'}`}>
                    {timestamp}
                </span>
            </div>
        </div>
    );
}
