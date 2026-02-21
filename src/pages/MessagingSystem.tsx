import { useState } from 'react';
import { useSchoolERP } from '../context/SchoolERPContext';
import { AdminLayout } from '../components/AdminLayout';
import { Send, MessageCircle, Users } from 'lucide-react';

const allUsers = [
  { id: 'ADMIN-001', name: 'Admin', type: 'admin' },
  { id: 'TEA-001', name: 'Mrs. Sharma (Teacher)', type: 'teacher' },
  { id: 'TEA-002', name: 'Mr. Patel (Teacher)', type: 'teacher' },
  { id: 'STU-001', name: 'Rajesh Kumar (Student)', type: 'student' },
  { id: 'STU-002', name: 'Priya Singh (Student)', type: 'student' },
];

export function MessagingSystem() {
  const { messages, sendMessage, getConversation, markMessageAsRead, getUnreadMessages } = useSchoolERP();
  const [selectedUser, setSelectedUser] = useState(allUsers[0]);
  const [messageText, setMessageText] = useState('');
  const currentUserId = 'ADMIN-001'; // Current logged in user

  const conversation = getConversation(currentUserId, selectedUser.id);
  const unreadMessages = getUnreadMessages(currentUserId);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage({
        senderId: currentUserId,
        senderName: 'Admin',
        recipientId: selectedUser.id,
        content: messageText,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'admin',
      });
      setMessageText('');
    }
  };

  return (
    <AdminLayout>
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <MessageCircle size={28} style={{ color: 'var(--primary)' }} />
        Messages & Communications
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ height: '600px' }}>
        {/* Users List */}
        <div className="p-4 rounded-2xl glass overflow-y-auto">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Users size={20} />
            Contacts
          </h3>
          <div className="space-y-2">
            {allUsers.map((user) => {
              const userUnread = unreadMessages.filter((m) => m.senderId === user.id).length;
              return (
                <button
                  key={user.id}
                  onClick={() => {
                    setSelectedUser(user);
                    conversation.forEach((msg) => {
                      if (msg.recipientId === currentUserId && !msg.read) {
                        markMessageAsRead(msg.id);
                      }
                    });
                  }}
                  className={`w-full text-left px-3 py-3 rounded-lg transition-all font-medium relative ${
                    selectedUser.id === user.id
                      ? 'glass border-[1.5px]'
                      : 'text-[#8B949E] hover:bg-white/5'
                  }`}
                  style={selectedUser.id === user.id ? { borderColor: 'var(--primary)', background: 'rgba(0, 102, 255, 0.1)', color: 'var(--primary)' } : {}}
                >
                  <div className="flex items-center justify-between">
                    <div className="truncate">{user.name}</div>
                    {userUnread > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#EF4444] text-white">
                        {userUnread}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#8B949E] mt-1">{user.type}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 rounded-2xl glass flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-bold">{selectedUser.name}</h3>
              <p className="text-xs text-[#8B949E] font-medium">{selectedUser.type}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversation.length > 0 ? (
              conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.senderId === currentUserId
                        ? 'glass border-[1.5px]'
                        : 'bg-white/10'
                    }`}
                    style={msg.senderId === currentUserId ? { borderColor: 'var(--primary)', background: 'rgba(0, 102, 255, 0.15)' } : {}}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs text-[#8B949E] mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-[#8B949E]">
                <MessageCircle size={40} className="mx-auto mb-4 opacity-50" />
                <p className="font-medium">No messages yet</p>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 text-white hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
      </div>
    </AdminLayout>
  );
}
