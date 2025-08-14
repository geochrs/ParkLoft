import classes from './AiAssistant.module.css';
import assistant from '../../assets/assistant.png';
import { useState } from 'react';
import getApiUrl from '../../utils/getApiUrl';

export function AiAssistant() {
  const apiUrl = getApiUrl();
  const assistantUrl = `${apiUrl}/api/chat`;

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi there 👋, let me know how I can assist you today!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isDisabled) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setInput('');
    setIsLoading(true);

    setMessages([...newMessages, { role: 'assistant', content: 'typing...' }]);

    let assistantReply;

    try {
      const response = await fetch(assistantUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong');

      assistantReply = data.response;

      if (
        assistantReply.includes('Please log in to get personalized assistance.')
      ) {
        setIsDisabled(true);
      }
    } catch (err) {
      assistantReply = err.message || 'Sorry, something went wrong.';
    } finally {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: assistantReply },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button className={classes.aiButton} onClick={handleOpen}>
          <svg
            width="35px"
            height="35px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 10H16.01M12 10H12.01M8 10H8.01M7 16V21L12 16H20V4H4V16H7Z"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <div className={`${classes.container} ${isOpen ? classes.open : ''}`}>
        <div className={classes.header}>
          <div className={classes.hostAvatar}>
            <img src={assistant} alt="Host Avatar" />
          </div>
          <div className={classes.hostTitle}>Hello from ParkLoft 👋</div>
          <div className={classes.closeButton} onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
            >
              <path
                d="M11.957 1.457L10.543.043 6 4.586 1.457.043.043 1.457 4.586 6 .043 10.543l1.414 1.414L6 7.414l4.543 4.543 1.414-1.414L7.414 6"
                fill="#FFF"
              ></path>
            </svg>
          </div>
        </div>
        <div className={classes.body}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${classes.messageRow} ${
                msg.role === 'user' ? classes.userMessageRow : ''
              }`}
            >
              {msg.role === 'assistant' && (
                <div className={classes.hostAvatar}>
                  <img src={assistant} alt="Host Avatar" />
                </div>
              )}

              <div
                className={`${classes.hostConversation} ${
                  msg.role === 'user'
                    ? classes.userMessage
                    : msg.content === 'typing...'
                    ? classes.typing
                    : ''
                }`}
              >
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className={classes.hostAvatar}>
                  <img src={assistant} alt="User Avatar" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={classes.footer}>
          <form
            onSubmit={handleSubmit}
            className={isDisabled ? classes.textareaDisabled : ''}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Leave a message..."
              disabled={isDisabled || isLoading}
            ></textarea>
            <button
              type="submit"
              className={`${classes.sendButton} ${
                isDisabled ? classes.sendButtonDisabled : ''
              }`}
              disabled={isDisabled || isLoading}
            >
              <svg
                width="30px"
                height="35px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 4L3 11L10 14M20 4L13 21L10 14M20 4L10 14"
                  stroke="#5469e7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
